variable "s3-bucket-name" {
  description   = "s3 bucket name"
  type          = string
  default       = "atlaxiom-frontend"
}

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

variable "domain-name" {
  description = "Domain name for the ACM certificate"
  type        = string
  default     = "www.atlaxiom.com"
}

variable "base-domain-name" {
  description = "Domain name with no www for the ACM certificate"
  type        = string
  default     = "atlaxiom.com"
}

variable "cloudflare-zone-id" {
  description = "Cloudflare Zone ID for DNS validation"
  type = string
  sensitive = true
}

variable "cloudflare-api-token" {
  description = "Cloudflare API Token with DNS edit permissions"
  type        = string
  sensitive   = true
}