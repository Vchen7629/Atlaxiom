import { SelectedCardData } from "./datastructuretypes";

export type CardSet = {
    id?: string
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_price: number;
}

export type ComponentCardSetPopupProps = {
    addcardprops: {
        selectedCardData: SelectedCardData | null;
        userId: string;
        cardSets: CardSet[];
        setCardSets: React.Dispatch<React.SetStateAction<CardSet[]>>
    }
}

export type token = {
    auth: {
        token?: string
    }
}