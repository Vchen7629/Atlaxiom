import { DeckApiResponse } from "@/app/api-slices/types/decktypes"

export type UserId = {
    auth: {
        userId: string
    }
}

export type Username = {
    auth: {
        username: string
    }
}

export type DeckProps = {
    deckprops: {
        usersData?: {
            totalOwnedDecks: number;
        } | null
        isLoading: boolean
        listView: boolean;
        galleryView: boolean;
        refetch: () => void;
        refetchdecks: () => void;
        filteredDecks: DeckApiResponse[];
        currentPageListDecksArray: DeckApiResponse[]
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>> 
        currentPageGalleryDecksArray: DeckApiResponse[]
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<DeckApiResponse[]>> 
    }
}

export type handleDeckClick = {
    _id: string;
}


export type FilteredDecks = {
    _id: string;
    deck_name: string;
    lastUpdated: string;
    deck_desc: string;
    favorite?: boolean
}

export type EditAccount = {
    usersData?: {
        username: string;
        email: string
    } | null;
    refetch: () => void;
}

export type Statistics = {
    statisticsprops: {
        yearView: boolean;
        monthView: boolean
    }
}