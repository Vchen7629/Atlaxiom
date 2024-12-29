export type Card = {
    filteredCards: string[];
    card_name: string;
    ownedamount?: number;
    image_url?: string;
    set_code?: string;
    set_name?: string;
    rarity?: string;
    price?: number;
}

export type filteredListCards = {
    displaylistprops: {
        currentListPageResults: any;
    }
}

export type filteredGalleryCards = {
    displaygalleryprops: {
        currentGalleryPageResults: any;
    }
}

export type SelectedCard = {
    card_name?: string;
    image_url?: string;
    set_code?: string;
    type?: string;
    race?: string;
    archetype?: string;
    attribute?: string;
    level?: number;
    desc?: string;
    atk?: number;
    def?: number;
    set_name?: string;
    rarity?: string;
    ownedamount?: number;
    price?: number;
}