import { UpdatedCard } from "./buttontypes";
import { Card, OwnedCard } from "./datatypes";

export type ExtraDeckProps = {
    extradeckprops: {
        deck: {
            total_cards_extra_deck: number;
        };
        extraDeckCards: UpdatedCard[];
        setExtraDeckCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        hoveredCard: Card | null
        setModifyExtraDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        setCardsToDeleteExtraDeckPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
    }
}

export type MainDeckProps = {
    maindeckprops: {
        deck: {
            total_cards_main_deck: number;
        };
        monsterCards: UpdatedCard[];
        setMonsterCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>
        spellCards: UpdatedCard[];
        setSpellCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>
        trapCards: UpdatedCard[];
        setTrapCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>
        hoveredCard: Card | null
        setModifyMainDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        setCardsToDeleteMainDeckPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        allCardsView: boolean
        setAllCardsView: React.Dispatch<React.SetStateAction<boolean>>
        collectionCardsView: boolean
        setCollectionCardsView: React.Dispatch<React.SetStateAction<boolean>>
        userId: string;
        allCardsListResults: Card[];
        setAllCardsListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        collectionCardData?: OwnedCard[];
        setCollectionCardData?: React.Dispatch<React.SetStateAction<OwnedCard[]>>
    }
}

export type SideDeckProps = {
    sidedeckprops: {
        deck: {
            total_cards_side_deck: number;
        };
        sideDeckCards: UpdatedCard[];
        setSideDeckCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        hoveredCard: Card | null
        setModifySideDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        setCardsToDeleteSideDeckPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
    }
}

export type deckCards = {
    id?: string;
    _id?: string;
    cardInDeckOwnedAmount?: number;
    card_images?: {
        [0]?: {
            image_url?: string
        }
    }
    image_url?: string;
    name?: string;
    card_name?: string;
}