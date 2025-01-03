import React from "react";
import { SearchResCardData } from "./datastructuretypes";

export type ListViewComp = {
    listviewprops: {
        searchTerm: string;
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        currentPageListNamesArray: string[];
        setSelectedCardData: React.Dispatch<React.SetStateAction<SearchResCardData | null>>;
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type GalleryViewComp = {
    galleryviewprops: {
        searchTerm: string;
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        currentPageGalleryNamesArray: string[];
        setSelectedCardData: React.Dispatch<React.SetStateAction<SearchResCardData | null>>;
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}