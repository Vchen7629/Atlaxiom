export type FAQSidebar = {
    MenuProps: {
        setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>
        setDarkLightModePage: React.Dispatch<React.SetStateAction<boolean>>
        setCreationOverviewPage: React.Dispatch<React.SetStateAction<boolean>>
        setHowToCreateAccountPage: React.Dispatch<React.SetStateAction<boolean>>
        setCardSearchPageFilter: React.Dispatch<React.SetStateAction<boolean>>
        setCardSearchPageOverview: React.Dispatch<React.SetStateAction<boolean>>
        setCardSearchSelectedCardPage: React.Dispatch<React.SetStateAction<boolean>>
        setCardSearchPageGalleryList: React.Dispatch<React.SetStateAction<boolean>>
        setCollectionOverview: React.Dispatch<React.SetStateAction<boolean>>
        setCollectionFilter: React.Dispatch<React.SetStateAction<boolean>>
        setCollectionAddNewCard: React.Dispatch<React.SetStateAction<boolean>>
        setCollectionGalleryList: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type PageType = 
    | 'welcome'
    | 'darkLightMode'
    | 'creationOverview'
    | 'howToCreateAccount'
    | 'cardSearchOverview'
    | 'cardSearchFilter'
    | 'cardSearchSelectedCard'
    | 'cardSearchGalleryList'
    | 'collectionOverview'
    | 'collectionFilter'
    | 'collectionAddNewCard'
    | 'collectionGalleryList';

export type PageAction = {
    type: 'SET_PAGE';
    payload: PageType;
}

export type PageState = {
    welcomePage: boolean;
    darkLightModePage: boolean;
    creationOverviewPage: boolean;
    howToCreateAccountPage: boolean;
    cardSearchPageOverview: boolean;
    cardSearchPageFilter: boolean;
    cardSearchSelectedCardPage: boolean;
    cardSearchPageGalleryList: boolean;
    collectionOverview: boolean;
    collectionFilter: boolean;
    collectionAddNewCard: boolean;
    collectionGalleryList: boolean;
}