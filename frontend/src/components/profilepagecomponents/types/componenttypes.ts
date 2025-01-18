export type DeckSearchBarComp = {
    setDeckName: React.Dispatch<React.SetStateAction<string>>;
    deckName: string;
}

export type GridListViewComp = {
    gridlistviewprops: {
        listView: boolean;
        galleryView: boolean;
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

export type NavBarComp = {
    navbarprops: {
        deckActive: boolean;
        setDeckActive: React.Dispatch<React.SetStateAction<boolean>>;
        statisticsActive: boolean;
        setStatisticsActive: React.Dispatch<React.SetStateAction<boolean>>;
        editActive: boolean;
        setEditActive: React.Dispatch<React.SetStateAction<boolean>>;
        setSelectedNavItem: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type ProfileHeader = {
    usersData: {
        username: string;
        totalOwnedCards: number;
        totalOwnedDecks: number;
        creation: string
    }
}