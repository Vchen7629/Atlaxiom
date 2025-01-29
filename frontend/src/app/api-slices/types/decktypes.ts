import { Deck } from "@/components/deckmanagerpagecomponents/types/homepagecomponentprops";
import { UpdatedCard } from "@/components/editdeckpagecomponents/types/buttontypes";

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
    }
}[]