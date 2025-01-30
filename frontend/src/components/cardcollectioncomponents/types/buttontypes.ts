export type IncreaseCard = {
    userId: string;
    card: any;
    refetch: () => void;
}

export type DecreaseCard = {
    userId: string;
    card: {
        card_name: string
    };
    refetch: () => void;
}

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

export type toastErrorTwoMessage = {
    status: number;
    message: string;
}

export type UserId = {
    userId: string
}

export type mappedCard = {
    id: string,
    name: string,
    card_images: {
        [0]?: {
            image_url: string
        }
    }
}