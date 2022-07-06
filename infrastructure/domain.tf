resource "aws_route53_record" "domain" {
  zone_id = "Z0907933CTRFTQ00Q03X"
  name    = "fg.ogin.io"
  type    = "A"

  alias {
    name                   = aws_alb.lb.dns_name
    zone_id                = aws_alb.lb.zone_id
    evaluate_target_health = true
  }
}
