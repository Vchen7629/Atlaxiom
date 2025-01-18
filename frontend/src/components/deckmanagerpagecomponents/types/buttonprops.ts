export type DeleteDeck = {
    deck: any;
    refetch: any;
    userId: string;
}

export type FavoriteDeck = {
    deck: any;
    refetch: any;
    userId: string;
    setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<any[]>>
    setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<string[]>>
}