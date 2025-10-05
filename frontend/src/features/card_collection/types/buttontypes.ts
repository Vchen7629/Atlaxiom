import { GetOwnedCardsResponse } from "@/app/api-slices/types/ownedcardtypes";
import { Card } from "./ownedcarddetailstypes";


export type IncreaseCard = {
    card: Card;
    refetch: () => Promise<{ data?: GetOwnedCardsResponse[] }>;
}

export type DecreaseCard = {
    card: {
        card_name: string
    };
    refetch: () => Promise<{ data?: GetOwnedCardsResponse[] }>;
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
    race: string;
    atk?: number;
    def?: number
}