import { Card } from "./datatypes";

export type GridListViewComponentProps = {
    filterProps: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        listView: boolean;
        galleryView: boolean;
        setAllCardsCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        setCollectionCardsCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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

export type CardToDelete = {
    id?: string;
    _id?: string;
    name?: string;
    card_name?: string;
}


export type UpdatedCard = Card & {
    _id: string | undefined;
    id: string | undefined;
    name: string | undefined;
    card_name: string | undefined;
    desc: string | undefined;
    cardInDeckOwnedAmount?: number;
    image_url?: string
}