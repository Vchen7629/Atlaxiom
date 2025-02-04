export type FAQSidebar = {
    MenuProps: {
        setWelcomePage: React.Dispatch<React.SetStateAction<boolean>>
        setDarkLightModePage: React.Dispatch<React.SetStateAction<boolean>>
        setCreationOverviewPage: React.Dispatch<React.SetStateAction<boolean>>
        setHowToCreateAccountPage: React.Dispatch<React.SetStateAction<boolean>>
        setCardSearchPageFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}