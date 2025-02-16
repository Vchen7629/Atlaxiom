import { ApiCardData } from "@/components/searchpagecomponents/types/datastructuretypes";
import { CardSet } from "../../../components/searchpagecomponents/types/searchresultcomptypes";

export type SearchResult = {
    searchresultprops: {
        cardSets: CardSet[]
        setCardSets: React.Dispatch<React.SetStateAction<CardSet[]>>
    }
}



export type SearchUserId = {
    auth: {
        userId: string
    }
}

export type ListViewSearchSuggestions = {
    listView: {
        cardData: ApiCardData[];
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        
    }
}