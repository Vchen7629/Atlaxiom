import { FAQPageMenuSideBar } from "@/components/documentationcomponents/dropdownmenu.tsx"
import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { Toaster } from "sonner"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { WelcomeSubPage } from "@/components/documentationcomponents/WelcomeOptionSubpages/welcomesubpage.tsx"
import { DarkLightModeSubPage } from "@/components/documentationcomponents/DarkLightModeOptionSubpage/darklightmodesubpage.tsx"
import { CreatingUserAccountOverviewSubPage } from "@/components/documentationcomponents/CreatingUserAccountSubpages/creationoverviewsubpage.tsx"
import { HowToCreateAccountSubPage } from "@/components/documentationcomponents/CreatingUserAccountSubpages/howtocreateaccountsubpage.tsx"
import { CardSearchOverviewSubPage } from "@/components/documentationcomponents/CardSearchOptionSubpages/cardsearchoverview.tsx"
import { CardSearchFilterSubPage } from "@/components/documentationcomponents/CardSearchOptionSubpages/cardsearchfilters.tsx"
import { WorkInProgressPlaceholder } from "@/components/documentationcomponents/components/workinprogressplaceholder.tsx"
import { GalleryListViewSubPage} from "@/components/documentationcomponents/CardSearchOptionSubpages/gallery_listview.tsx"
import { GalleryListViewCollectionSubPage } from "@/components/documentationcomponents/collectionOptionSubpages/gallery_listview.tsx"
import { CollectionOverviewSubPage } from "@/components/documentationcomponents/collectionOptionSubpages/collectionoverview.tsx"
import { CollectionFilterSubPage } from "@/components/documentationcomponents/collectionOptionSubpages/collectionfilter.tsx"
import { AddNewCardSubPage } from "@/components/documentationcomponents/collectionOptionSubpages/addingnewcard.tsx"

const SiteHelpPage = () => {
    const location = useLocation();
    const [welcomePage, setWelcomePage] = useState(location.state?.welcomepage ?? true);
    const [darkLightModePage, setDarkLightModePage] = useState(false);
    const [creationOverviewPage, setCreationOverviewPage] = useState(false);
    const [howToCreateAccountPage, setHowToCreateAccountPage] = useState(false);
    const [cardSearchPageOverview, setCardSearchPageOverview] = useState(location.state?.searchOverview ?? false);
    const [cardSearchPageFilter, setCardSearchPageFilter] = useState(false);
    const [cardSearchSelectedCardPage, setCardSearchSelectedCardPage] = useState(false);
    const [cardSearchPageGalleryList, setCardSearchPageGalleryList] = useState(false);
    const [collectionOverview, setCollectionOverview] = useState(location.state?.collectionOverview ?? false);
    const [collectionFilter, setCollectionFilter] = useState(false);
    const [collectionAddNewCard, setCollectionAddNewCard] = useState(false);
    const [collectionGalleryList, setCollectionGalleryList] = useState(false);
    /*const [collectionPageView, setCollectionPageView] = useState(false);
    const [deckBuildPageView, setDeckBuildPageView] = useState(false);
    const [editProfileView, setEditProfileView] = useState(true);
    const [darkLightModeView, setDarkLightModeView] = useState(true);*/

    const MenuProps = {
        setWelcomePage,
        setDarkLightModePage,
        setCreationOverviewPage,
        setHowToCreateAccountPage,
        setCardSearchPageOverview,
        setCardSearchPageFilter,
        setCardSearchSelectedCardPage,
        setCardSearchPageGalleryList,
        setCollectionOverview,
        setCollectionFilter,
        setCollectionAddNewCard,
        setCollectionGalleryList
    }

    function SidebarHeader() {
        return (
            <section className="flex flex-col space-y-[2vh] w-full lg:w-[20%] h-[95vh]">
                <div className="flex w-[100vw] lg:w-full space-x-[1vw] items-center font-bold">
                    <FontAwesomeIcon icon={faQuestionCircle} className="fa-2xl text-[hsl(var(--background3))]"/>
                    <span className="text-3xl text-[hsl(var(--text))]">Site Help</span>
                    <div className="flex lg:hidden text-[hsl(var(--text))]">Dropdown</div>
                </div>
                <div className="hidden lg:flex"><FAQPageMenuSideBar MenuProps={MenuProps}/></div>
            </section>
        )
    }

    return (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex relative min-h-[95vh] py-[15vh] w-full px-[10vw] bg-[hsl(var(--background1))]  overflow-hidden ">
                <SidebarHeader />
                <section className="flex w-[75%] ml-[5%] h-full justify-center items-center text-3xl text-black font-bold">
                    {welcomePage ? (
                        <WelcomeSubPage/>
                    ) : darkLightModePage ? (
                        <DarkLightModeSubPage />
                    ) : creationOverviewPage ? (
                        <CreatingUserAccountOverviewSubPage/>
                    ) : howToCreateAccountPage ? (
                        <HowToCreateAccountSubPage />
                    ) : cardSearchPageOverview ? (
                        <CardSearchOverviewSubPage />
                    ) : cardSearchPageFilter ? (
                        <CardSearchFilterSubPage />
                    ) : cardSearchSelectedCardPage ? (
                        <WorkInProgressPlaceholder/>
                    ) : cardSearchPageGalleryList ? (
                        <GalleryListViewSubPage />
                    ) : collectionOverview ? (
                        <CollectionOverviewSubPage />
                    ) : collectionFilter ? (
                        <CollectionFilterSubPage />
                    ) : collectionAddNewCard ? (
                        <AddNewCardSubPage />
                    ) : collectionGalleryList && (
                        <GalleryListViewCollectionSubPage />
                    )}
                </section>
            </div>
            <Footer/>
        </main>
    )
}

export default SiteHelpPage