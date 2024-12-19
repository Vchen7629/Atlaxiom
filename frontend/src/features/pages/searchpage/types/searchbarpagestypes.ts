export type SearchResult = {
    selectedCardData: {
        name: string;
        card_images: {
            image_url: string
        }[]
        desc?: string;
        type?: string;
        archetype?: string;
        race?: string;
        scale?: number;
        linkval?: number;
        atk?: number;
        def?: number;

    };
    cardSets: any
}

export type SearchAuth = {
    auth: {
        token: string
    }
}

export type SearchUserId = {
    auth: {
        userId: string
    }
}

export type ListViewSearchSuggestions = {
    listView: {
        cardData: any[];
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        
    }
}