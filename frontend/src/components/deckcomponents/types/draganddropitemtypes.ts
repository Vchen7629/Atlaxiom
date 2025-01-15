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
}

export type CollectionListResult = {
    _id: string;
    image_url: string;
    card_name: string;
    desc: string;
}

export type SearchGalleryResult = {
    id: string;
    card_images?: {
        0?: {
            image_url: string
        }
    }
}

export type SearchListResult = {
    id: string;
    card_name: string;
    name: string;
    desc: string;
    card_images?: {
        0?: {
            image_url: string
        }
    }
}