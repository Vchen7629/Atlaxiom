export type SearchBar = {
    searchbarprops: {
        cardData: any[];
        setCardData: React.Dispatch<React.SetStateAction<[]>>
        cardName: string;
        setCardName: React.Dispatch<React.SetStateAction<string>>
        setClickedOnCard: React.Dispatch<React.SetStateAction<boolean>>
        setSelectedCardData: React.Dispatch<React.SetStateAction<[] | null>>
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setErrorMessage: React.Dispatch<React.SetStateAction<string>>
        setMainSuggestions: React.Dispatch<React.SetStateAction<any[]>>
        maxMainSuggestions: number
        setGallerySuggestions: React.Dispatch<React.SetStateAction<any[]>>
        setSelectedSuggestion: React.Dispatch<React.SetStateAction<[] | null>>
    }
}
