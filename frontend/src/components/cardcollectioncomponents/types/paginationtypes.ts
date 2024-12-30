

export type OwnedCard = {
    entities?: {
        defaultId: {
            ownedCards: {
                _id: string;
                addedOn: string;
                archetype?: string;
                card_name: string;
                image_url: string;
                ownedamount: number,
                type?: string,
                race?: string,
                attribute?: string,
                level?: number,
                linkval?: number,
                scale?: number,
                atk?: number,
                def?: number,
                desc: string,
                set_name?: string,
                rarity?: string,
                set_code?: string,
                price: number,
            }
        }
    }
}



export type Pagination = {
    paginationprops: {
        listView: boolean;
        galleryView: boolean;
        searchTerm: string;
        ownedCards: OwnedCard[];
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        suggestionsPerListPage: number;
        suggestionsPerGalleryPage: number;
        setCurrentListPageResults: React.Dispatch<React.SetStateAction<OwnedCard[]>>;
        setCurrentGalleryPageResults: React.Dispatch<React.SetStateAction<OwnedCard[]>>;
        cardTypeFilter: string;
        subTypeFilter: string;
        attributeFilter: string;
        archeTypeFilter: string;
        levelFilter: number | null;
        setFilter: string;
        rarityFilter: string;
        totalListPages: number;
        totalGalleryPages: number;
        updateTotalPages: React.Dispatch<React.SetStateAction<number>>;
    }
}

export type pageselector = {
    pageselectorprops: {
        listView: boolean;
        galleryView: boolean;
        currentListPage: number;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        currentGalleryPage: number;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        totalListPages: number;
        totalGalleryPages: number;
    }
}