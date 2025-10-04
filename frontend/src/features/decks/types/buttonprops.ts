import { DeckApiResponse } from "@/app/api-slices/types/decktypes";
import { handleDeckClick } from "./homepagecomponentprops";

export type DeleteDeck = {
    deck: handleDeckClick;
    refetchUser?: () => void;
    userId: string;
}

export type FavoriteDeck = {
    deck: handleDeckClick;
    setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
    setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
}

export type GalleryDeck = {
    _id: string;
    favorite?: boolean;
    deck_name?: string
}

export type pageselector = {
    pageselectorprops: {
        currentPage: number
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>
        totalPages: number
        setPage: React.Dispatch<React.SetStateAction<number>>
    }
}