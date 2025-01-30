export type Card = {
    name: string;
    card_name: string | undefined;
    desc: string;
    card_images: { 
        image_url: string;
        image_url_cropped?: string;
    }[];
    card_prices: {
        amazon_price?: number;
        cardmarket_price?: number;
        coolstuffinc_price?: number;
        ebay_price?: number;
        tcgplayer_price: number;
        price: number;
    }[];
    card_sets: {
        set_code?: string;
        set_name?: string;
        set_price?: number;
        set_rarity?: string;
        set_rarity_code?: string;
    }[];
    set_code: string;
    frameType?: string;
    type?: string;
    race?: string;
    archetype: string | null;
    set_name: string;
    rarity: string;
    id: string | undefined;
    _id: string | undefined;
    ownedamount?: number;
    ygoprodeck_url?: string;
    cardInDeckOwnedAmount?: number
    image_url?: string;
    price?: number
}

export type NormalizedCard = Card & {
    cardInDeckOwnedAmount: number
}

export type OwnedCard = {
    _id: string;
    card_name: string;
    image_url: string;
    desc: string;
    type?: string
}

