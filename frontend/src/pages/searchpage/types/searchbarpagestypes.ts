import { CardSet } from "../../../components/searchpagecomponents/types/searchresultcomptypes";

export type SearchResult = {
    searchresultprops: {
        cardSets: CardSet[]
        setCardSets: React.Dispatch<React.SetStateAction<CardSet[]>>
    }
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