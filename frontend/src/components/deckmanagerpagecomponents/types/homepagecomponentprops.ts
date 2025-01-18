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
        decksToDisplay: string[]
        listView: boolean;
        galleryView: boolean;
        userId: string;
        refetch: any;
        currentPageListDecksArray: any[];
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<any[]>>
        currentPageGalleryDecksArray: string[];
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<string[]>>
    }
}

export type handleDeckClick = {
    _id: string;
}

export type Deck = {
    _id: string;
    favorite?: boolean;
    deck_name: string;
    deckName: string;
    lastUpdated: string;
    deck_desc: string;
}

export type DeckError = {
    message?: string;
}