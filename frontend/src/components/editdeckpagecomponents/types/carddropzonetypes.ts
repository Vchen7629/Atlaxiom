import { GetOwnedCardsResponse } from "@/app/api-slices/types/ownedcardtypes";
import { UpdatedCard } from "./buttontypes";
import { Card } from "./datatypes";
import { DeckApiResponse } from "@/app/api-slices/types/decktypes";

export type ExtraDeckProps = {
    extradeckprops: {
        deckData?:  DeckApiResponse & { total_cards_extra_deck?: number } | null | undefined;
        extraDeckCards: UpdatedCard[];
        setExtraDeckCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        hoveredCard: Card | GetOwnedCardsResponse | undefined
        setModifyExtraDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        setCardsToDeleteExtraDeckPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
    }
}

export type MainDeckProps = {
    maindeckprops: {
        deckData?:  DeckApiResponse & { total_cards_main_deck?: number } | null | undefined;
        monsterCards: UpdatedCard[];
        setMonsterCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>
        spellCards: UpdatedCard[];
        setSpellCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>
        trapCards: UpdatedCard[];
        setTrapCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>
        hoveredCard: Card | GetOwnedCardsResponse | undefined
        setModifyMainDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        setCardsToDeleteMainDeckPlaceHolder: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        allCardsView: boolean
        setAllCardsView: React.Dispatch<React.SetStateAction<boolean>>
        collectionCardsView: boolean
        setCollectionCardsView: React.Dispatch<React.SetStateAction<boolean>>
        userId: string;
        allCardsListResults: Card[];
        setAllCardsListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        collectionCardData?: GetOwnedCardsResponse[];
        setCollectionCardData?: React.Dispatch<React.SetStateAction<GetOwnedCardsResponse[]>>
    }
}

export type SideDeckProps = {
    sidedeckprops: {
        deckData?:  DeckApiResponse & { total_cards_side_deck?: number } | null | undefined;
        sideDeckCards: UpdatedCard[];
        setSideDeckCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
        hoveredCard: Card | GetOwnedCardsResponse | undefined
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