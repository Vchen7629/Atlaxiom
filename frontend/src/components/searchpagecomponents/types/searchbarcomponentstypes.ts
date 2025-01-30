import { SearchResCardData } from "./datastructuretypes";

export type ListViewComp = {
    listviewprops: {
        searchTerm: string;
        currentPageListNamesArray: SearchResCardData[];
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type GalleryViewComp = {
    galleryviewprops: {
        searchTerm: string;
        currentPageGalleryNamesArray: SearchResCardData[];
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}