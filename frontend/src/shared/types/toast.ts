export type toastSuccessMessage = {
    name: string
} | undefined

export type toastSuccessTwoMessage = {
    name: string;
    set: string;
} | undefined

export type toastErrorMessage = {
    status: number;
    response?: {
        data: {
            message: string
        }
        message?: string
    }
    data?: {
        message: string
    }
}