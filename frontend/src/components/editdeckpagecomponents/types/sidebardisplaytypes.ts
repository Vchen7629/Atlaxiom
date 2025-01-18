import { Card } from "./datatypes";
import { GalleryResult, Result } from "./sidebarcomponenttypes";

export type AllCardsDisplayCompProps = {
    AllCardsDisplayCompProps: {
        listView: boolean;
        galleryView: boolean;
        allCardsListResults: Card[];
        allCardsGalleryResults: Card[];
        allCardsCurrentListResults: Card[];
        allCardsCurrentGalleryResults: Card[];
    }
}

export type CollectionDisplayCompProps = {
    CollectionDisplayCompProps: {
        listView: boolean;
        galleryView: boolean;
        collectionListResults: Result[];
        collectionCurrentListResults: Result[];
        collectionGalleryResults: GalleryResult[];
        collectionCurrentGalleryResults: GalleryResult[];
    }
}