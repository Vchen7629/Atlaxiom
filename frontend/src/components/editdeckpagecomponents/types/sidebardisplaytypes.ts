import { UpdatedCard } from "./buttontypes";
import { Card } from "./datatypes";
import { GalleryResult, Result } from "./sidebarcomponenttypes";

export type AllCardsDisplayCompProps = {
    AllCardsDisplayCompProps: {
        isLoading?: boolean;
        listView: boolean;
        galleryView: boolean;
        allCardsListResults: Card[];
        allCardsGalleryResults: Card[];
        allCardsCurrentListResults: UpdatedCard[];
        allCardsCurrentGalleryResults: UpdatedCard[];
        setMonsterCards?: any
    }
}

export type CollectionDisplayCompProps = {
    CollectionDisplayCompProps: {
        isLoading?: boolean;
        listView: boolean;
        galleryView: boolean;
        collectionListResults: Result[];
        collectionCurrentListResults: Result[];
        collectionGalleryResults: GalleryResult[];
        collectionCurrentGalleryResults: GalleryResult[];
    }
}