import { Card } from "./data";

export type SubGridListViewComponentProps = {
    filterProps: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        listView: boolean;
        galleryView: boolean;
    }
}

export type CollectionGalleryResult = {
    _id: string;
    image_url: string
    card_name: string
}

export type CollectionListResult = {
    _id: string;
    image_url: string;
    card_name: string;
    desc: string;
}

export type SearchGalleryResult = Card & {
    id: string | undefined;
    card_images?: {
        0?: {
            image_url: string
        }
    }
    name: string | undefined
}

export type SearchListResult = Card & {
    id: string | undefined;
    card_name: string | undefined;
    name: string | undefined;
    desc: string | undefined;
    card_images?: {
        0?: {
            image_url: string
        }
    }
}