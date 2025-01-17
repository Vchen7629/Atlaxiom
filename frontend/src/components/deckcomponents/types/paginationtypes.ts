export type Pagination = {
    paginationprops: {
        filteredDecks: string[];
        listView: boolean;
        galleryView: boolean;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        suggestionsPerListPage: number;
        suggestionsPerGalleryPage: number;
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<string[]>>;
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<string[]>>;
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
        setListErr: React.Dispatch<React.SetStateAction<string>>;
        setGalleryErr: React.Dispatch<React.SetStateAction<string>>;
    }
}