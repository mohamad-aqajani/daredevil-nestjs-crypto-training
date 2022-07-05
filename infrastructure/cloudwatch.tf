resource "aws_cloudwatch_log_group" "future_gate_log_group" {
  name = "future-gate-log-group"

  tags = {
    Environment = "prd"
  }
}

resource "aws_cloudwatch_log_stream" "future_gate_log_stream" {
  name           = "future-gate-log-stream"
  log_group_name = aws_cloudwatch_log_group.future_gate_log_group.name
}
