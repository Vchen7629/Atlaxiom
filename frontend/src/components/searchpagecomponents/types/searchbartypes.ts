import { ApiCardData, SearchResCardData } from "./datastructuretypes";

export type SearchBar = {
    searchbarprops: {
        cardData: ApiCardData[];
        setCardData: React.Dispatch<React.SetStateAction<ApiCardData[]>>
        cardName: string;
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        setSelectedCardData: React.Dispatch<React.SetStateAction<SearchResCardData | null>>
        suggestionsPerPage: number;
        suggestionsPerGalleryPage: number;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCurrentPageListNamesArray: React.Dispatch<React.SetStateAction<string[]>>
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>
        totalListNamesArray: string[];
        totalGalleryNamesArray: string[];
        setTotalListNamesArray: React.Dispatch<React.SetStateAction<string[]>>
        setCurrentPageGalleryNamesArray: React.Dispatch<React.SetStateAction<string[]>>
        maxMainSuggestions: number
        setTotalGalleryNamesArray: React.Dispatch<React.SetStateAction<any[]>>
        monsterType: string;
        spellType: string;
        trapType: string;
        attributeType: string;
        levelFilter: number | null;
        lessThanEqual: boolean;
        equal: boolean;
        greaterThanEqual: boolean;
        pendFilter: number | null;
        pendLessThanEqual: boolean;
        pendEqual: boolean;
        pendGreaterThanEqual: boolean;
        linkFilter: number | null;
        linkLessThanEqual: boolean;
        linkEqual: boolean;
        linkGreaterThanEqual: boolean;
        atkFilter: number | null;
        atkLessThanEqual: boolean;
        atkEqual: boolean;
        atkGreaterThanEqual: boolean;
        defFilter: number | null;
        defLessThanEqual: boolean;
        defEqual: boolean;
        defGreaterThanEqual: boolean;
    }
}

export type GridListViewComponentProps = {
    gridlistviewprops: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>;
        listView: boolean;
        galleryView: boolean;
    }
}