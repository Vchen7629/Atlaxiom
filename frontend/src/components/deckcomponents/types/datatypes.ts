export type Card = {
    name: string;
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
    }[];
    card_sets: {
        set_code?: string;
        set_name?: string;
        set_price?: number;
        set_rarity?: string;
        set_rarity_code?: string;
    }[];
    frameType?: string;
    type?: string;
    race?: string;
    archetype: string | null;
    set_name: string;
    rarity: string;
    id?: string | number;
    ownedamount?: number;
    ygoprodeck_url?: string;
}

export type OwnedCard = {
    _id: string;
    card_name: string;
    image_url: string;
    desc: string;
    
}

export type NormalizedCard = Card & {
    user_id?: {
        userId: string
    }
    addedOn: string;
    archetype: string | null;
    cardInDeckOwnedAmount: number;
    name: string;
    card_name: string;
    desc: string;
    card_images?: { 
        0?: {
            image_url: string
        }
    };
    image_url: string;
    card_prices?: {
        0?: {
            price: number;
        }
    };
    price: number;
    race: string;
    card_sets?: {
        0?: {
            set_rarity: string
            set_code: string;
            set_name: string;
        }
    };
    rarity: string;
    set_name: string;
    set_code: string;
    type: string
}