import { Card } from "./datatypes";

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
        mainDeckCards: Card[];
        setMainDeckCards: React.Dispatch<React.SetStateAction<Card[]>>;
        monsterCards: Card[];
        setMonsterCards: React.Dispatch<React.SetStateAction<Card[]>>
        spellCards: Card[];
        setSpellCards: React.Dispatch<React.SetStateAction<Card[]>>
        trapCards: Card[];
        setTrapCards: React.Dispatch<React.SetStateAction<Card[]>>
        hoveredCard: any | null;
        setModifyMainDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        setCardsToDeleteMainDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
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

export type SaveDeckButton = {
    savebuttonprops: {
        userId: string;
        refetch: any;
        deck: any;
        cardsToAddMainDeckPlaceHolder: Card[];
        setCardsToAddMainDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>
        cardsToDeleteMainDeckPlaceHolder: Card[];
        setCardsToDeleteMainDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        modifyMainDeckCardAmountPlaceHolder: Card[];
        setModifyMainDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        cardsToAddExtraDeckPlaceHolder: Card[];
        setCardsToAddExtraDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        cardsToDeleteExtraDeckPlaceHolder: Card[];
        setCardsToDeleteExtraDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        modifyExtraDeckCardAmountPlaceHolder: Card[];
        setModifyExtraDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        cardsToAddSideDeckPlaceHolder: Card[];
        setCardsToAddSideDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        cardsToDeleteSideDeckPlaceHolder: Card[];
        setCardsToDeleteSideDeckPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
        modifySideDeckCardAmountPlaceHolder: Card[];
        setModifySideDeckCardAmountPlaceHolder: React.Dispatch<React.SetStateAction<Card[]>>;
    }
}