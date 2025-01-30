import { DeckApiResponse } from "@/app/api-slices/types/decktypes";

type OwnedDeck = {
    createdOn: string;
    deck: string; 
}

type OwnedCard = {
    addedOn: string;
    card: string;
}

export type deckData = DeckApiResponse & {
    createdOn: string;
}

export type UserEntity = {
    ownedDecks: OwnedDeck[];
    ownedCards: OwnedCard[];
}

export type UserData = {
    entities: Record<string, UserEntity>;
}

export type ChartData = {
    day: string;
    decks: number;
    cards: number;
}

export type Deck = DeckApiResponse & {
    createdOn: string;
    deckName?: string;
}

export type userId = {
    auth: {
        userId: string
    }
}

export type SelectedYear = {
    selectedYear: string
}

export type Year = {
    yearprops: {
        years: string[];
        selectedYear: string;
        setSelectedYear: React.Dispatch<React.SetStateAction<string>>
    }
}