variable "remote_state_main_bucket" {
  type        = string
  description = "The bucket name for the main shared remote state"
}

variable "remote_state_main_key" {
  type        = string
  description = "The key name for the main shared remote state"
}

variable "environment" {
  type        = string
  description = "Environment name to use for labelling"
}

variable "namespace" {
  type        = string
  description = "Namespace for labelling"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply"
  default     = {}
}

variable "image_tag" {
  type        = string
  description = "Docker image tag"
  default     = "latest"
}

variable "db_config" {
  type = object({
    name     = string,
    username = string,
    password = string
  })
  default     = null
  description = "Configuration for the database"
}

variable "docker_app_env" {
  type        = map(string)
  description = "Environment variables for the application container(s)"
}
