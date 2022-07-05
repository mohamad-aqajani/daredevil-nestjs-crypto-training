data "terraform_remote_state" "main" {
  backend   = "s3"
  workspace = var.environment

  config = {
    bucket = var.remote_state_main_bucket
    key    = var.remote_state_main_key
    region = "eu-central-1"
  }
}

resource "aws_s3_bucket" "remote_state_main_bucket" {
  bucket = var.remote_state_main_bucket
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket = "future-gate-remote-state"
    key    = "future-gate-remote-state-key"
    region = "eu-central-1"
  }
}

module "future_gate_label" {
  source = "git::https://github.com/cloudposse/terraform-null-label.git?ref=tags/0.23.0"

  name        = "future-gate"
  environment = var.environment
  namespace   = var.namespace
  tags        = var.tags
}

resource "aws_default_vpc" "default_vpc" {}
