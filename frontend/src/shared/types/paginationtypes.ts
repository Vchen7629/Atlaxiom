import { ApiCardData, SearchResCardData } from "../../features/search/types/dataStructures";

export type Pagination = {
    paginationprops: {
        filteredCards: ApiCardData[];
        listView: boolean;
        galleryView: boolean;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        suggestionsPerListPage: number;
        suggestionsPerGalleryPage: number;
        setCurrentPageListNamesArray: React.Dispatch<React.SetStateAction<SearchResCardData[]>>;
        setCurrentPageGalleryNamesArray: React.Dispatch<React.SetStateAction<SearchResCardData[]>>;
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