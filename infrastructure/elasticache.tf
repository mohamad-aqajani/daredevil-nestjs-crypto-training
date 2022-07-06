resource "aws_elasticache_subnet_group" "redis" {
  name       = join("-", [module.future_gate_label.id, "cache-subnet"])
  subnet_ids = [
    aws_default_subnet.default_subnet_a.id,
    aws_default_subnet.default_subnet_b.id,
    aws_default_subnet.default_subnet_c.id
  ]
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = join("-", [module.future_gate_label.id, "redis-cluster"])
  engine               = "redis"
  node_type            = "cache.t2.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis.id]
}

resource "aws_security_group" "redis" {
  name = join("-", [module.future_gate_label.id, "elasticache-cluster"])
  ingress {
    security_groups = [aws_security_group.service_security_group.id]
    from_port = 6379
    to_port = 6379
    protocol = "tcp"
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
