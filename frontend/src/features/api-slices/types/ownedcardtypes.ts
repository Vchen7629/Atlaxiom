export type GetOwnedCardsResponse = {
    id: string;
    ownedCards: OwnedCards[];
}

export type OwnedCards = {
    _id: string;
    addedOn: string;
    archetype?: string;
    card_name: string;
    image_url: string;
    ownedamount: number,
    type?: string,
    race?: string,
    attribute?: string,
    level?: number,
    linkval?: number,
    scale?: number,
    atk?: number,
    def?: number,
    desc: string,
    set_name?: string,
    rarity?: string,
    set_code?: string,
    price: number,
}

