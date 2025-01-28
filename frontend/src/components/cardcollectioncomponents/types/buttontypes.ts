export type IncreaseCard = {
    userId: string;
    card: any;
    refetch: any;
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

export type toastErrorMessage = {
    status: number;
    response?: {
        data: {
            message: string
        }
    }
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