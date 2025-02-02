import { ApiCardData } from "@/components/searchpagecomponents/types/datastructuretypes";
import { mappedCard } from "./buttontypes";

export type Pagination = {
    paginationprops: {
        filteredCards: ApiCardData[];
        currentPage: number;
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        cardsPerPage: number;
        totalPages: number;
        setCurrentCards: React.Dispatch<React.SetStateAction<mappedCard[]>>;
        UpdateTotalPages: (filteredCardsLength: number) => void;
    }
}

export type pageselector = {
    pageselectorprops: {
        currentPage: number;
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        totalPages: number;
        setPage: React.Dispatch<React.SetStateAction<number>>;
    }
}

export type selectedcard = {
    selectedcardprops: {
        cardName: string
        userId: string
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