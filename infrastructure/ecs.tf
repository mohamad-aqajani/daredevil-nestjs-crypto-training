locals {
  app_env = merge(var.docker_app_env, {})
}

module "app_container_definition" {
  source           = "git::https://github.com/cloudposse/terraform-aws-ecs-container-definition.git?ref=tags/0.56.0"
  container_name   = "future-gate-task"
  container_image  = aws_ecr_repository.future_gate_ecr_repo.repository_url
  container_cpu    = 256
  container_memory = 512
  essential        = true
  port_mappings    = [
    {
      containerPort = 3000
      hostPort      = 3000
      protocol      = "tcp"
    }
  ]
  log_configuration = {
    logDriver = "awslogs"
    options   = {
      "awslogs-group"         = aws_cloudwatch_log_group.future_gate_log_group.name
      "awslogs-region"        = "eu-central-1"
      "awslogs-stream-prefix" = "app"
    }
  }
  environment = [
  for k, v in local.app_env : {
    name  = k
    value = v
  }
  ]
}

resource "aws_ecs_cluster" "future_gate_cluster" {
  name = "future-gate-cluster"
}

resource "aws_ecs_task_definition" "future_gate_task" {
  family                   = "future-gate-task"
  container_definitions    = "[${module.app_container_definition.json_map_encoded}]"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.future_gate_task_role.arn
}


resource "aws_ecs_service" "future_gate_service" {
  name            = "future-gate-service"
  cluster         = aws_ecs_cluster.future_gate_cluster.id
  task_definition = aws_ecs_task_definition.future_gate_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.lb.arn
    container_name   = aws_ecs_task_definition.future_gate_task.family
    container_port   = 3000
  }

  network_configuration {
    subnets = [
      aws_default_subnet.default_subnet_a.id,
      aws_default_subnet.default_subnet_b.id,
      aws_default_subnet.default_subnet_c.id
    ]
    assign_public_ip = true
    security_groups  = [aws_security_group.service_security_group.id]
  }
}

resource "aws_security_group" "service_security_group" {
  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    # Only allowing traffic in from the load balancer security group
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    from_port   = 0 # Allowing any incoming port
    to_port     = 0 # Allowing any outgoing port
    protocol    = "-1" # Allowing any outgoing protocol
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}

resource "aws_iam_role" "future_gate_task_role" {
  name               = join("-", [module.future_gate_label.id, "task"])
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.future_gate_task_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
