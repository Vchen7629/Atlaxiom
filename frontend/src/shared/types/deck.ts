import { DeckApiResponse } from "@/app/api-slices/types/decktypes";

export type Deck = {
    _id: string;
    favorite?: boolean;
    deck_name: string;
    deckName: string;
    lastUpdated: string;
    deck_desc: string;
}

export type deckDisplayProps = {
    DeckDisplayProps: {
        listView: boolean,
        galleryView: boolean,
        deckApiData: DeckApiResponse[];
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>>
    }
}