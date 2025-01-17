import React from "react";

export type ListViewComp = {
    listviewprops: {
        searchTerm: string;
        currentPageListNamesArray: string[];
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type GalleryViewComp = {
    galleryviewprops: {
        searchTerm: string;
        currentPageGalleryNamesArray: string[];
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}