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
    desc: string;
}

export type GalleryResult = {
    _id: string;
    image_url: string;
    card_name: string;
}