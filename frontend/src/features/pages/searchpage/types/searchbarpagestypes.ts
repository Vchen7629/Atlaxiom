import { SearchResCardData } from "./datastructuretypes"

export type SearchResult = {
    selectedCardData: SearchResCardData;
    cardSets: any
}

export type SearchAuth = {
    auth: {
        token: string
    }
}

export type SearchUserId = {
    auth: {
        userId: string
    }
}

export type ListViewSearchSuggestions = {
    listView: {
        cardData: any[];
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        
    }
}