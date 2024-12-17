export type Card = {
    name: string;
    desc: string;
    card_images: { 
        image_url: string;
        image_url_cropped?: string;
    }[];
    card_prices: {
        amazon_price?: number;
        cardmarket_price?: number;
        coolstuffinc_price?: number;
        ebay_price?: number;
        tcgplayer_price: number;
    }[];
    card_sets: {
        set_code?: string;
        set_name?: string;
        set_price?: number;
        set_rarity?: string;
        set_rarity_code?: string;
    }[];
    frameType?: string;
    type?: string;
    race?: string;
    archetype?: string;
    set_name?: string;
    rarity?: string;
    id?: string | number;
    ownedamount?: number;
    ygoprodeck_url?: string;
}

export type UserId = {
    userId: string;
}

export type Result = {
    _id: string;
    image_url: string;
    card_name: string;
}

export type AllCardsDisplayCompProps = {
    AllCardsDisplayCompProps: {
        listView: boolean;
        galleryView: boolean;
        allCardsListResults: Card[];
        allCardsGalleryResults: Card[];
        allCardsCurrentListResults: Card[];
        allCardsCurrentGalleryResults: Card[];
        allCardsData: Card[];
    }
}

export type CollectionDisplayCompProps = {
    CollectionDisplayCompProps: {
        listView: boolean;
        galleryView: boolean;
        collectionListResults: Result[];
        collectionCurrentListResults: Result[];
        collectionGalleryResults: Result[];
        collectionCurrentGalleryResults: Result[];
    }
}

export type GridListViewComponentProps = {
    filterProps: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        //setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        listView: boolean;
        galleryView: boolean;
    }
}
