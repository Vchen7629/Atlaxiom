import { OwnedCard } from "./dataStructures";

export type Card = {
    id?: string
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
        currentListPageResults: OwnedCard[];
        isLoading: boolean;
    }
}

export type filteredGalleryCards = {
    displaygalleryprops: {
        currentGalleryPageResults: OwnedCard[];
        expandStatus: boolean;
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