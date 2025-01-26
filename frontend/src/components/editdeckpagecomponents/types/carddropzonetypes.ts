import { Card, OwnedCard } from "./datatypes";

export type ExtraDeckProps = {
    extradeckprops: {
        deck: any;
        extraDeckCards: Card[];
        setExtraDeckCards: React.Dispatch<React.SetStateAction<Card[]>>;
        hoveredCard: any;
        setModifyExtraDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        setCardsToDeleteExtraDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
    }
}

export type MainDeckProps = {
    maindeckprops: {
        deck: any;
        monsterCards: Card[];
        setMonsterCards: React.Dispatch<React.SetStateAction<Card[]>>
        spellCards: Card[];
        setSpellCards: React.Dispatch<React.SetStateAction<Card[]>>
        trapCards: Card[];
        setTrapCards: React.Dispatch<React.SetStateAction<Card[]>>
        hoveredCard: any | null;
        setModifyMainDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        setCardsToDeleteMainDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        allCardsView: boolean
        setAllCardsView: React.Dispatch<React.SetStateAction<boolean>>
        collectionCardsView: boolean
        setCollectionCardsView: React.Dispatch<React.SetStateAction<boolean>>
        userId: string;
        allCardsListResults: Card[];
        setAllCardsListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        collectionCardData: OwnedCard[];
        setCollectionCardData: React.Dispatch<React.SetStateAction<OwnedCard[]>>
    }
}

export type SideDeckProps = {
    sidedeckprops: {
        deck: any;
        sideDeckCards: Card[];
        setSideDeckCards: React.Dispatch<React.SetStateAction<Card[]>>;
        hoveredCard: any;
        setModifySideDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        setCardsToDeleteSideDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
    }
}