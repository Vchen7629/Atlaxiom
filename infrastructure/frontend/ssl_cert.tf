# This requests acm certifcate for the domain
resource "aws_acm_certificate" "frontend_cert" {
  provider = aws.use1
  domain_name       = var.base-domain-name
  subject_alternative_names = [var.domain-name]
  validation_method = "DNS"

  tags = {
    ManagedBy = "Terraform"
  }
}

# Since im using cloudflare i need to add a txt record
resource "cloudflare_dns_record" "acm_validation" {
  for_each = {
    for dvo in aws_acm_certificate.frontend_cert.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
  

  zone_id = var.cloudflare-zone-id
  name    = each.value.name
  type    = each.value.type
  content = each.value.value
  ttl     = 300
  proxied = false
}

# Point www.atlaxiom.com to CloudFront
resource "cloudflare_dns_record" "frontend_cname" {
  zone_id = var.cloudflare-zone-id
  name    = "www"
  type    = "CNAME"
  content = aws_cloudfront_distribution.frontend_cdn.domain_name
  ttl     = 1
  proxied = true # or false if you want to bypass Cloudflare
}

# Point atlaxiom.com to CloudFront
resource "cloudflare_dns_record" "frontend_base_cname" {
  zone_id = var.cloudflare-zone-id
  name    = var.base-domain-name
  type    = "CNAME"
  content = aws_cloudfront_distribution.frontend_cdn.domain_name
  ttl     = 1
  proxied = true # or false if you want to bypass Cloudflare
}


# This validates the www.atlaxiom.com certificate using the txt record created above
resource "aws_acm_certificate_validation" "frontend_cert_validation" {
  provider = aws.use1
  certificate_arn         = aws_acm_certificate.frontend_cert.arn
  validation_record_fqdns = [
    for record in values(cloudflare_dns_record.acm_validation) : record.name
  ]
  depends_on = [cloudflare_dns_record.acm_validation]
}
