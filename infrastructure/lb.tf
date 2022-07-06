resource "aws_alb" "lb" {
  name               = join("-", [module.future_gate_label.id, "lb"])
  load_balancer_type = "application"
  subnets            = [
    aws_default_subnet.default_subnet_a.id,
    aws_default_subnet.default_subnet_b.id,
    aws_default_subnet.default_subnet_c.id
  ]
  security_groups = [aws_security_group.lb.id]
  tags            = module.future_gate_label.tags
}

resource "aws_security_group" "lb" {
  ingress {
    from_port   = 80 # Allowing traffic in from port 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic in from all sources
  }

  egress {
    from_port   = 0 # Allowing any incoming port
    to_port     = 0 # Allowing any outgoing port
    protocol    = "-1" # Allowing any outgoing protocol
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}


resource "aws_lb_target_group" "lb" {
  name        = join("-", [module.future_gate_label.id, "api"])
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_default_vpc.default_vpc.id
  health_check {
    matcher = "200,301,302"
    path    = "/api"
  }
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_alb.lb.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.lb.arn
  }
}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "eu-central-1a"
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "eu-central-1b"
}

resource "aws_default_subnet" "default_subnet_c" {
  availability_zone = "eu-central-1c"
}
