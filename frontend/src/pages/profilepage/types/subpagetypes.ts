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
        }, 
        currentGalleryPageResults: {
            currentListPageResults: OwnedDecksApiRes[];
            length: number
            map: any;
        };
    }
}

export type handleDeckClick = {
    _id: string;
}

export type DeckError = {
    message: string
}

export type FilteredDecks = {
    _id: string;
    deck_name: string;
    lastUpdated: string;
    deck_desc: string
}

export type EditAccount = {
    user: {
        username: string;
        email: string
    };
    refetch: any;
}