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
