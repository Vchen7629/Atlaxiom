export type AllCardsDisplayCompProps = {
    AllCardsDisplayCompProps: {
        listView: boolean;
        galleryView: boolean;
        allCardsListResults: string[];
        allCardsGalleryResults: string[];
        allCardsCurrentListResults: string[];
        allCardsCurrentGalleryResults: string[];
        allCardsData: string[];
    }
}

export type AllCardsSearchbarCompProps = {
    AllCardsSearchBarCompProps: {
        allCardsCurrentPage: number;
        allCardsTotalListPages: number;
        allCardsTotalGalleryPages: number;
        resultsPerListPage: number;
        resultsPerGalleryPage: number;
        allCardsData: string[];
        setAllCardsData: React.Dispatch<React.SetStateAction<string[]>>;
        allCardsName: string;
        setAllCardsName: React.Dispatch<React.SetStateAction<string>>;
        allCardsListResults: string[];
        setAllCardsListResults: React.Dispatch<React.SetStateAction<string[]>>;
        allCardsGalleryResults: string[];
        setAllCardsGalleryResults: React.Dispatch<React.SetStateAction<string[]>>;
        error: string;
        setError: React.Dispatch<React.SetStateAction<string>>;
        allCardsCurrentListResults: string[];
        setAllCardsCurrentListResults: React.Dispatch<React.SetStateAction<string[]>>;
        allCardsCurrentGalleryResults: string[];
        setAllCardsCurrentGalleryResults: React.Dispatch<React.SetStateAction<string[]>>;
        maxResults: number;
        listView: boolean;
        galleryView: boolean;
        allCardsView: boolean;
        setAllCardsCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}