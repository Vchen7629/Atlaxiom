variable "aws-access-key" {
    description = "iam user access key"
    type        = string
    sensitive   = true
}

variable "aws-secret-access-key" {
    description = "iam user secret access key"
    type        = string
    sensitive   = true
}

variable "lambda-function-name" {
    description = "name for lambda function"
    type        = string
    default     = "atlaxiom-login-api"
}

variable "lambda-runtime" {
    description = "runtime for lambda function"
    type        = string
    default     = "nodejs22.x"
}

variable "lambda-entry-point" {
    description = "entry point for lambda to run from"
    type        = string
    default     = "lambda.handler"
}

variable "mongodb-uri" {
    description = "uri conn string for connecting to mongodb"
    type        = string
    sensitive   = true
}

variable "apigateway-name" {
    description = "api gateway api name"
    type        = string
    default     = "atlaxiom-login-api"
}