import React from "react";
import { ApiCardData, SearchResCardData } from "./datastructuretypes";
import { CardSet } from "./searchresultcomptypes";

export type ListViewComp = {
    listviewprops: {
        cardData: ApiCardData[];
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        currentPageListNamesArray: string[];
        setTotalListNamesArray: React.Dispatch<React.SetStateAction<string[]>>;
        setSelectedCardData: React.Dispatch<React.SetStateAction<SearchResCardData | null>>;
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
        totalPages: number;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        cardSets: CardSet[];
        setCardSets: React.Dispatch<React.SetStateAction<CardSet[]>>;
    }
}

export type GalleryViewComp = {
    galleryviewprops: {
        cardData: ApiCardData[];
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        currentPageGalleryNamesArray: string[];
        setTotalGalleryNamesArray: React.Dispatch<React.SetStateAction<string[]>>;
        setSelectedCardData: React.Dispatch<React.SetStateAction<SearchResCardData | null>>;
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
        totalGalleryPages: number;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        cardSets: CardSet[];
        setCardSets: React.Dispatch<React.SetStateAction<CardSet[]>>;
    }
}