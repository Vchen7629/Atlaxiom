import { ApiCardData, SearchResCardData } from "./datastructuretypes";

export type SearchBar = {
    searchbarprops: {
        cardData: ApiCardData[];
        setCardData: React.Dispatch<React.SetStateAction<ApiCardData[]>>
        cardName: string;
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        setSelectedCardData: React.Dispatch<React.SetStateAction<SearchResCardData | null>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>
        setTotalListNamesArray: React.Dispatch<React.SetStateAction<string[]>>
        maxMainSuggestions: number
        setTotalGalleryNamesArray: React.Dispatch<React.SetStateAction<any[]>>
    }
}
