export type DeleteDeck = {
    deck: any;
    refetch: () => void;
    refetchUser?: () => void;
    userId: string;
}

export type FavoriteDeck = {
    deck: any;
    refetch: () => void;
    userId: string;
    setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<any[]>>
    setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<string[]>>
}