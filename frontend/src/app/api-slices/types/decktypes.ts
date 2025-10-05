import { Deck } from "@/features/decks/types/homepagecomponentprops";
import { UpdatedCard } from "@/features/decks/types/buttontypes";

export type Arg = {
    id: string
}

export type DeckApiResponse = Deck & {
    id: string;
    ownedDecks: {
        _id: string;
        user_id: string;
        deck_name: string;
        deck_desc: string;
        favorite: boolean;
        createdOn: string;
        lastUpdated: string;
        main_deck_cards: UpdatedCard[]; 
        side_deck_cards: UpdatedCard[]; 
        extra_deck_cards: UpdatedCard[];
        total_cards_main_deck: number;
        total_cards_side_deck: number;
        total_cards_extra_deck: number;
        __v: number;
    }[];
    createdOn: string
}


export type DeckOutput = {
    deck: {
        _id: string;
        deck_name: string
    } 
}

export type invalidatesTags = {
    id: string
}

export type providesTags = {
    id?: string
}

export type ModifyCardInDeckInput = {
    DeckData: { 
        deckId: string, 
        cardUpdates: { 
            card_name: string, 
            modifyAmount: number 
        }[] 
    }
}

export type DeleteCardFromDeckInput = {
    DeckData: { 
        deckId: string, 
        cardUpdates: { 
            card_name: string 
        }[] 
    } 
}