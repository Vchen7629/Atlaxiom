export type LambdaResponse = {
    message: string;
    error?: string;
    data?: {
        message?: string
    }
}

export type ContactLambdaRequest = {
    username: string,
    email: string,
    subject: string,
    body: string
}

export type PasswordResetReqLambdaRequest = {
    email: string,
}

export type VerifyTokenLambdaRequest = {
    token: string,
}

export type PasswordResetLambdaRequest = {
    token: string,
    newPassword: string
}

