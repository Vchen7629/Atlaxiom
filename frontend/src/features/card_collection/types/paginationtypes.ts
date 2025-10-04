import { ApiCardData } from "@/features/search/types/dataStructures";
import { OwnedCard } from "../../../features/card_collection/types/dataStructures";
import { Card } from "./ownedcarddetailstypes";
import { mappedCard } from "./buttontypes";

export type PaginationTwo = {
    paginationprops: {
        filteredCards: ApiCardData[];
        currentPage: number;
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        cardsPerPage: number;
        totalPages: number;
        currentCards: mappedCard[];
        setCurrentCards: React.Dispatch<React.SetStateAction<mappedCard[]>>;
        UpdateTotalPages: (filteredCardsLength: number) => void;
    }
}

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