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

export type Deck = {
    deck_name: string
}

export type DeckProps = {
    deckprops: {
        deckName: string;
        listView: boolean;
        galleryView: boolean;
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