import { Card } from "./sidebarcomponenttypes";



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