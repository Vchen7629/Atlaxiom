import { handleDeckClick } from "../deckmanagerpagecomponents/types/homepagecomponentprops";

export type DeleteDeck = {
    deck: handleDeckClick;
    refetch: () => void;
    refetchUser?: () => void;
    userId: string;
}

export type FavoriteDeck = {
    deck: handleDeckClick;
    refetch: () => void;
    userId: string;
    setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<any[]>>
    setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<GalleryDeck[]>>
}

export type GalleryDeck = {
    _id: string;
    favorite?: boolean;
}