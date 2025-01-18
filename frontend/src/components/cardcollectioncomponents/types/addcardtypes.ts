import { ApiCardData } from "@/components/searchpagecomponents/types/datastructuretypes";
import { OwnedCard } from "./dataStructures";

export type Pagination = {
    paginationprops: {
        filteredCards: ApiCardData[];
        currentPage: number;
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        cardsPerPage: number;
        totalPages: number;
        currentCards: OwnedCard[];
        setCurrentCards: React.Dispatch<React.SetStateAction<OwnedCard[]>>;
        UpdateTotalPages: (filteredCardsLength: number) => void;
    }
}

export type pageselector = {
    pageselectorprops: {
        currentPage: number;
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        totalPages: number;
        setPage: React.Dispatch<React.SetStateAction<number>>;
        setErr: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type selectedcard = {
    selectedcardprops: {
        setSelectedCard: React.Dispatch<React.SetStateAction<boolean>>
        cardName: string
        userId: any
    }
}

export type Error = {
    status: number;
    response: {
        data: {
            message: string
        }
    }
}