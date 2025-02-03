import { DeckApiResponse } from "@/app/api-slices/types/decktypes";
import { handleDeckClick } from "../deckmanagerpagecomponents/types/homepagecomponentprops";

export type DeleteDeck = {
    deck: handleDeckClick;
    refetch: () => void
    refetchUser?: () => void;
    userId: string;
}

export type FavoriteDeck = {
    deck: handleDeckClick;
    refetch: () => void
    userId: string;
    setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
    setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
}

export type GalleryDeck = {
    _id: string;
    favorite?: boolean;
    deck_name?: string
}