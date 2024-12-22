import { SelectedCardData } from "./datastructuretypes";

export type CardSet = {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_price: number;
}

export type ComponentCardSetPopupProps = {
    selectedCardData: SelectedCardData;
    userId: string;
    cardSets: CardSet[];
}

export type token = {
    auth: {
        token?: string
    }
}