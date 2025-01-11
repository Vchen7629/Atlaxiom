import { Card, OwnedCard } from "./datatypes";

export type Sidebar = {
    sidebarprops: {
        userId: string;
        allCardsView: boolean;
        setAllCardsView: React.Dispatch<React.SetStateAction<boolean>>
        allCardsListResults: Card[];
        setAllCardsListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        collectionCardsView: boolean;
        setCollectionCardsView: React.Dispatch<React.SetStateAction<boolean>>;
        collectionCardData: OwnedCard[];
        setCollectionCardData: React.Dispatch<React.SetStateAction<OwnedCard[]>>
    }

}

export type Result = {
    _id: string;
    image_url: string;
    card_name: string;
    desc?: string;
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
