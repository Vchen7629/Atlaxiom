import { GalleryDeck } from "@/components/deckbuttons/buttonprops";
import { Deck } from "./homepagecomponentprops";

export type Pagination = {
    paginationprops: {
        filteredDecks: Deck[];
        listView: boolean;
        galleryView: boolean;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        suggestionsPerListPage: number;
        suggestionsPerGalleryPage: number;
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<Deck[]>>;
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<GalleryDeck[]>>;
        totalListPages: number;
        totalGalleryPages: number;
        updateTotalListPages: (filteredCardsLength: number) => void;
        updateTotalGalleryPages: (filteredCardsLength: number) => void;
    }
}


export type pageselector = {
    pageselectorprops: {
        listView: boolean;
        galleryView: boolean;
        setListPage: React.Dispatch<React.SetStateAction<number>>;
        setGalleryPage: React.Dispatch<React.SetStateAction<number>>;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        totalListPages: number;
        totalGalleryPages: number;
    }
}