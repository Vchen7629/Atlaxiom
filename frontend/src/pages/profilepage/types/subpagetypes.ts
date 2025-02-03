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
        refetchdecks: any;
        filteredDecks: any;
        currentPageListDecksArray: any
        setCurrentPageListDecksArray: React.Dispatch<React.SetStateAction<any>> 
        currentPageGalleryDecksArray: any
        setCurrentPageGalleryDecksArray: React.Dispatch<React.SetStateAction<any>> 
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