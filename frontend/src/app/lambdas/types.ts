export type ContactLambdaResponse = {
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