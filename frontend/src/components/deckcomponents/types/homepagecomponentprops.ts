export type NewDeckButton = {
    userId: string;
}

export type ErrorResponse = {
    status: number;
    data?: {
        message?: string
    }
}

export type GridListViewComponentProps = {
    filterProps: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>;
        //setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        listView: boolean;
        galleryView: boolean;
    }
}

export type DeckDisplayComponent = {
    deckdisplayprops:{ 
        listView: boolean;
        galleryView: boolean;
        userId: string;
        refetch: any;
        currentPageListDecksArray: any[];
        currentPageGalleryDecksArray: string[];
    }
}

export type handleDeckClick = {
    _id: string;
}

export type Deck = {
    _id: string;
    deck_name: string;
    deckName: string;
    lastUpdated: string;
    deck_desc: string;
}

export type DeckError = {
    message?: string;
}