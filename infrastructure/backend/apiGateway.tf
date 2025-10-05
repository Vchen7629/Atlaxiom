resource "aws_apigatewayv2_api" "atlaxiom_login_api" {
    name            = var.apigateway-name
    protocol_type   = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
    api_id              = aws_apigatewayv2_api.atlaxiom_login_api.id
    integration_type    = "AWS_PROXY"
    integration_uri     = aws_lambda_function.login_api.invoke_arn
    depends_on = [aws_lambda_function.login_api]
}

resource "aws_apigatewayv2_route" "root_route" {
    api_id      = aws_apigatewayv2_api.atlaxiom_login_api.id
    route_key   = "ANY /{proxy+}"
    target      = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
    depends_on = [aws_lambda_function.login_api]
}

resource "aws_apigatewayv2_stage" "default_stage" {
    api_id      = aws_apigatewayv2_api.atlaxiom_login_api.id
    name        = "$default"
    auto_deploy = true

    default_route_settings {
        throttling_rate_limit  = 10   # max 10 requests/sec
        throttling_burst_limit = 20
    }
}