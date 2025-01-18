import { OwnedDecksApiRes } from "./datastructuretypes"

export type UserId = {
    auth: {
        userId: string
    }
}

export type Username = {
    auth: {
        username: string
    }
}

export type DeckProps = {
    user: {
        totalOwnedDecks: number;
    };
    deckprops: {
        listView: boolean;
        galleryView: boolean;
        refetchdecks: any;
        filteredDecks: any;
        currentListPageResults: {
            currentListPageResults: OwnedDecksApiRes[];
            length: number
            map: any;
        }
        setCurrentListPageResults: React.Dispatch<React.SetStateAction<any>> 
        currentGalleryPageResults: {
            currentListPageResults: OwnedDecksApiRes[];
            length: number
            map: any;
        };
        setCurrentGalleryPageResults: React.Dispatch<React.SetStateAction<any>> 
    }
}

export type handleDeckClick = {
    _id: string;
}


export type FilteredDecks = {
    _id: string;
    deck_name: string;
    lastUpdated: string;
    deck_desc: string;
    favorite?: boolean
}

export type EditAccount = {
    user: {
        username: string;
        email: string
    };
    refetch: any;
}

export type Statistics = {
    statisticsprops: {
        yearView: boolean;
        monthView: boolean
    }
}