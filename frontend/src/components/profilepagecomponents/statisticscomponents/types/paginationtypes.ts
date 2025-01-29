import { DeckApiResponse } from "@/app/api-slices/types/decktypes";

export type Deck = {
    deck_name: string
}

export type DeckProps = {
    user: {
        totalOwnedDecks: number;
    };
    deckprops: {
        listView: boolean;
        galleryView: boolean;
        refetchdecks: any;
        filteredDecks: any;
    }
}


export type Pagination = {
    paginationprops: {
        filteredDecks: DeckApiResponse[];
        listView: boolean;
        galleryView: boolean;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        suggestionsPerListPage: number;
        suggestionsPerGalleryPage: number;
        setCurrentListPageResults: React.Dispatch<React.SetStateAction<string[]>>
        setCurrentGalleryPageResults:  React.Dispatch<React.SetStateAction<string[]>>
        totalListPages: number;
        totalGalleryPages: number;
        updateTotalListPages: (filteredCardsLength: number) => void;
        updateTotalGalleryPages: (filteredCardsLength: number) => void;
    }
}