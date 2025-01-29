import { DeckApiResponse } from "@/app/api-slices/types/decktypes";
import { GalleryDeck } from "@/components/deckbuttons/buttonprops";

export type NewDeckButton = {
    userId: string;
}

export type ErrorResponse = {
    status: number;
    data?: {
        message?: string
    }
}

export type GridListViewComponentProps = {
    filterProps: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        listView: boolean;
        galleryView: boolean;
    }
}

export type DeckDisplayComponent = {
    deckdisplayprops:{ 
        decksToDisplay: DeckApiResponse[]
        listView: boolean;
        galleryView: boolean;
        userId: string;
        refetch: any;
        currentPageListDecksArray: Deck[];
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<Deck[]>>
        currentPageGalleryDecksArray: GalleryDeck[];
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<GalleryDeck[]>>
    }
}

export type handleDeckClick = {
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
