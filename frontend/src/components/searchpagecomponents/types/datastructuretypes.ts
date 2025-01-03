

export type ApiCardData = {
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
    racehumanReadableCardType?: string;
    race?: string;
    attribute?: string;
    archetype?: string;
    level?: number;
    scale?: number;
    linkval?: number;
    atk?: number;
    def?: number;
    rarity?: string;
    id: string | number;
    ygoprodeck_url?: string;
}

export type SearchResCardData = {
    name: string;
    card_images: {
        image_url: string
    }[]
    desc?: string;
    type?: string;
    archetype?: string;
    race?: string;
    scale?: number;
    linkval?: number;
    atk?: number;
    def?: number;

}

export type SelectedCardData = {
    name: string;
    type?: string;
    race?: string;
    attribute?: string;
    archetype?: string;
    level?: number;
    linkval?: number;
    scale?: number;
    atk?: number;
    def?: number;
    desc?: string;
    pend_desc?: string;
    monster_desc?: string;
    card_images?: { 
        image_url: string 
    }[];
    card_sets?: {
        set_code: string;
        set_name: string;
        set_price: number;
        set_rarity: string; 
        set_rarity_code: string
    }[];
}