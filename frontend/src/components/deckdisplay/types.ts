import { DeckApiResponse } from "@/app/api-slices/types/decktypes";

export type DeckDisplayComponent = {
    deckdisplayprops:{ 
        isLoading: boolean;
        decksToDisplay: DeckApiResponse[]
        listView: boolean;
        galleryView: boolean;
        userId: string;
        refetch: () => void;
        refetchUser?: () => void;
        currentPageListDecksArray: DeckApiResponse[];
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
        currentPageGalleryDecksArray: DeckApiResponse[];
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
    }
}

export type DeckClick = {
    _id: string;
    deck_name: string;
}

export type Deck = {
    _id: string;
    favorite?: boolean;
    deck_name: string;
    deckName: string;
    lastUpdated: string;
    deck_desc: string;
}

export type MappedList = {
    MappedListProps: {
        userId: string;
        refetch: () => void;
        refetchUser?: () => void;
        currentPageListDecksArray: DeckApiResponse[];
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
    }
}

export type MappedGallery = {
    MappedGalleryProps: {
        userId: string;
        refetch: () => void;
        refetchUser?: () => void;
        currentPageGalleryDecksArray: DeckApiResponse[];
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
    }
}