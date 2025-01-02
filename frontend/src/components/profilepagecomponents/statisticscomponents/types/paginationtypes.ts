export type Deck = {
    deck_name: string
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
    }
}