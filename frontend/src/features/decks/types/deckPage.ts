import { Card } from "../../card_collection/types/ownedcardpagetypes";

export type UserIdState = {
    auth: {
        userId: string;
    }
}

export type DeckTypes = {
    main_deck_cards?: Card[];
    extra_deck_cards?: Card[];
    side_deck_cards?: Card[];
}