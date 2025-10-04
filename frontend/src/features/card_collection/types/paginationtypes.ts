import { OwnedCard } from "../../../features/card_collection/types/dataStructures";
import { Card } from "./ownedcarddetailstypes";

export type Pagination = {
    paginationprops: {
        filteredCards: Card[];
        listView: boolean;
        galleryView: boolean;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        suggestionsPerListPage: number;
        suggestionsPerGalleryPage: number;
        setCurrentListPageResults: React.Dispatch<React.SetStateAction<OwnedCard[]>>;
        setCurrentGalleryPageResults: React.Dispatch<React.SetStateAction<OwnedCard[]>>;
        totalListPages: number;
        totalGalleryPages: number;
        updateTotalPages: (filteredCardsLength: number) => void;
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