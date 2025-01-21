export type token = {
    auth: {
        token: string
    }
}

export type username = {
    auth: {
        username: string
    }
}

export type userId = {
    auth: {
        userId: string
    }
}

export type Refresh = {
    accessToken: string;
    userId: string;
    username: string
}