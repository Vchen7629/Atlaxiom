import { GalleryResult, Result } from "./sidebarComponents";
import { Card, OwnedCard } from "./data";
import { GetOwnedCardsResponse } from "@/app/api-slices/types/ownedcardtypes";

export type AllCardsSearchbarCompProps = {
    AllCardsSearchBarCompProps: {
        allCardsCurrentPage: number;
        allCardsTotalListPages: number;
        allCardsTotalGalleryPages: number;
        resultsPerListPage: number;
        resultsPerGalleryPage: number;
        allCardsData: Card[];
        setAllCardsData: React.Dispatch<React.SetStateAction<Card[]>>;
        allCardsName: string;
        setAllCardsName: React.Dispatch<React.SetStateAction<string>>;
        allCardsListResults: Card[];
        setAllCardsListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        allCardsGalleryResults: Card[];
        setAllCardsGalleryResults: React.Dispatch<React.SetStateAction<Card[]>>;
        setError: React.Dispatch<React.SetStateAction<string | null>>;
        setAllCardsCurrentListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        setAllCardsCurrentGalleryResults: React.Dispatch<React.SetStateAction<Card[]>>;
        maxResults: number;
        listView: boolean;
        galleryView: boolean;
        allCardsView: boolean;
        setAllCardsCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}

export type MobileAllCardsSearchbarCompProps = {
    AllCardsSearchBarCompProps: {
        allCardsCurrentPage: number;
        allCardsTotalListPages: number;
        allCardsTotalGalleryPages: number;
        resultsPerListPage: number;
        resultsPerGalleryPage: number;
        allMonsterCards: Card[];
        setAllMonsterCards: React.Dispatch<React.SetStateAction<Card[]>>;
        allCardsName: string;
        setAllCardsName: React.Dispatch<React.SetStateAction<string>>;
        allCardsListResults: Card[];
        setAllCardsListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        allCardsGalleryResults: Card[];
        setAllCardsGalleryResults: React.Dispatch<React.SetStateAction<Card[]>>;
        setError: React.Dispatch<React.SetStateAction<string | null>>;
        setAllCardsCurrentListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        setAllCardsCurrentGalleryResults: React.Dispatch<React.SetStateAction<Card[]>>;
        maxResults: number;
        listView: boolean;
        galleryView: boolean;
        allCardsView: boolean;
        setAllCardsCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}



export type CollectionSearchbarCompProps = {
    CollectionSearchBarCompProps: {
        userId: string;
        collectionCurrentPage: number;
        collectionTotalListPage: number;
        collectionTotalGalleryPage: number;
        resultsPerListPage: number;
        resultsPerGalleryPage: number;
        collectionCardData: GetOwnedCardsResponse[];
        setCollectionCardData: React.Dispatch<React.SetStateAction<GetOwnedCardsResponse[]>>;
        collectionCardsName: string;
        setCollectionCardsName: React.Dispatch<React.SetStateAction<string>>;
        collectionListResults: GetOwnedCardsResponse[];
        setCollectionListResults: React.Dispatch<React.SetStateAction<GetOwnedCardsResponse[]>>;
        collectionGalleryResults: GalleryResult[];
        setCollectionGalleryResults: React.Dispatch<React.SetStateAction<GalleryResult[]>>;
        setCollectionCurrentListResults: React.Dispatch<React.SetStateAction<GetOwnedCardsResponse[]>>;
        setCollectionCurrentGalleryResults: React.Dispatch<React.SetStateAction<GalleryResult[]>>;
        maxResults: number;
        listView: boolean;
        galleryView: boolean;
        collectionCardsView: boolean;
        setCollectionCardsCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}

export type MobileCollectionSearchbarCompProps = {
    CollectionSearchBarCompProps: {
        cardData: GetOwnedCardsResponse[] | undefined;
        collectionCurrentPage: number;
        collectionTotalListPage: number;
        collectionTotalGalleryPage: number;
        resultsPerListPage: number;
        resultsPerGalleryPage: number;
        collectionMonsterCards: OwnedCard[];
        setCollectionMonsterCards: React.Dispatch<React.SetStateAction<OwnedCard[]>>
        collectionCardsName: string;
        setCollectionCardsName: React.Dispatch<React.SetStateAction<string>>;
        collectionListResults: Result[];
        setCollectionListResults: React.Dispatch<React.SetStateAction<Result[]>>;
        collectionGalleryResults: GalleryResult[];
        setCollectionGalleryResults: React.Dispatch<React.SetStateAction<GalleryResult[]>>;
        setCollectionCurrentListResults: React.Dispatch<React.SetStateAction<Result[]>>;
        setCollectionCurrentGalleryResults: React.Dispatch<React.SetStateAction<GalleryResult[]>>;
        maxResults: number;
        listView: boolean;
        galleryView: boolean;
        collectionCardsView: boolean;
        setCollectionCardsCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}