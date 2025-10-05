export type email = {
    auth: {
        email: string
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

export type LoginCredentials = {
    username: string;   
    password: string;
}

export type LoginResponse = {
    message: string;
    authenticated: boolean
}

export type RefreshResponse = {
    message: string;
    sessionValid: boolean
}
