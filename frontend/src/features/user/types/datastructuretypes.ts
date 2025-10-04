export type OwnedDecksApiRes = {
    createdOn: string; 
    deck_desc: string;
    deck_name: string;
    main_deck_cards: string[];
    extra_deck_cards: string[]; 
    side_deck_cards: string[];
    lastUpdated: string;
    total_cards_deck: number;
    total_cards_main_deck: number;
    total_cards_extra_deck: number;
    total_cards_side_deck: number
    user_id: string;
}