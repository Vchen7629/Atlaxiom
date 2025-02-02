import { SearchResCardData } from "./datastructuretypes";

export type ListViewComp = {
    listviewprops: {
        loading: boolean;
        searchTerm: string;
        currentPageListNamesArray: SearchResCardData[];
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type GalleryViewComp = {
    galleryviewprops: {
        loading: boolean;
        searchTerm: string;
        currentPageGalleryNamesArray: SearchResCardData[];
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    }
}