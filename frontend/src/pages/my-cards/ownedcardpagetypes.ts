import { OwnedCard } from "@/components/cardcollectioncomponents/types/paginationtypes";

export type Card = {
    filteredCards: OwnedCard[];
    card_name: string;
    type?: string;
    race?: string;
    attribute?: string;
    archetype?: string;
    level?: number;
    set_name?: string;
    rarity?: string;
    id?: string;
    ownedamount?: number;
}