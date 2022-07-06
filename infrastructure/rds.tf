resource "aws_db_subnet_group" "db" {
  name       = join("-", [module.future_gate_label.id, "db"])
  subnet_ids = [
    aws_default_subnet.default_subnet_a.id,
    aws_default_subnet.default_subnet_b.id,
    aws_default_subnet.default_subnet_c.id
  ]
}

resource "aws_db_instance" "db" {
  identifier             = join("-", [module.future_gate_label.id, "db"])
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "14.1"
  name                   = var.db_config.name
  username               = var.db_config.username
  password               = var.db_config.password
  db_subnet_group_name   = aws_db_subnet_group.db.name
  vpc_security_group_ids = [aws_security_group.db.id]
  publicly_accessible    = true
}

resource "aws_security_group" "db" {
  name = join("-", [module.future_gate_label.id, "db"])
  ingress {
    security_groups = [aws_security_group.service_security_group.id]
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
