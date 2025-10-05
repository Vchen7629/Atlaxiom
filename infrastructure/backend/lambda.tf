// creating role for executing lambda
resource "aws_iam_role" "lambda_exec_role" {
  name = "atlaxiom_loginapi_lambda_exec"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

// allow lambda to write logs to cloudwatch
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "login_api" {
    function_name = var.lambda-function-name
    role          = aws_iam_role.lambda_exec_role.arn
    handler       = var.lambda-entry-point
    runtime       = var.lambda-runtime
    filename      = "placeholder.zip"
    source_code_hash = filebase64sha256("placeholder.zip")
    timeout       = 5
    memory_size   = 256
    environment {
        variables = {
            MONGODB_URI = var.mongodb-uri
        }
    }
}

// permissions that allows api gateway to trigger lambda
resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.login_api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.atlaxiom_login_api.execution_arn}/*/*"
}

