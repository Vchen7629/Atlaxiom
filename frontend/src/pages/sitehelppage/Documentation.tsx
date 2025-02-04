import { FAQPageMenuSideBar } from "@/components/documentationcomponents/dropdownmenu.tsx"
import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { Toaster } from "sonner"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { CardSearchFilterSubPage } from "@/components/documentationcomponents/CardSearchOptionSubpages/cardsearchsubpage.tsx"
import { WelcomeSubPage } from "@/components/documentationcomponents/WelcomeOptionSubpages/welcomesubpage.tsx"
import { DarkLightModeSubPage } from "@/components/documentationcomponents/DarkLightModeOptionSubpage/darklightmodesubpage.tsx"
import { CreatingUserAccountOverviewSubPage } from "@/components/documentationcomponents/CreatingUserAccountSubpages/creationoverviewsubpage.tsx"
import { HowToCreateAccountSubPage } from "@/components/documentationcomponents/CreatingUserAccountSubpages/howtocreateaccountsubpage.tsx"

const SiteHelpPage = () => {
    const [welcomePage, setWelcomePage] = useState(true);
    const [darkLightModePage, setDarkLightModePage] = useState(false);
    const [creationOverviewPage, setCreationOverviewPage] = useState(false);
    const [howToCreateAccountPage, setHowToCreateAccountPage] = useState(false);
    const [cardSearchPageFilter, setCardSearchPageFilter] = useState(false);
    /*const [collectionPageView, setCollectionPageView] = useState(false);
    const [deckBuildPageView, setDeckBuildPageView] = useState(false);
    const [editProfileView, setEditProfileView] = useState(true);
    const [darkLightModeView, setDarkLightModeView] = useState(true);*/

    const MenuProps = {
        setWelcomePage,
        setDarkLightModePage,
        setCreationOverviewPage,
        setHowToCreateAccountPage,
        setCardSearchPageFilter,
    }

    const content = (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex relative min-h-[95vh] py-[15vh] w-full px-[10vw] bg-[hsl(var(--background1))]  overflow-hidden ">
                <section className="flex flex-col space-y-[2vh] w-full lg:w-[20%] h-[95vh]">
                    <div className="flex w-[100vw] lg:w-full space-x-[1vw] items-center font-bold">
                        <FontAwesomeIcon icon={faQuestionCircle} className="fa-2xl text-[hsl(var(--background3))]"/>
                        <span className="text-3xl text-[hsl(var(--text))]">Site Help</span>
                        <div className="flex lg:hidden text-[hsl(var(--text))]">Dropdown</div>
                    </div>
                    <div className="hidden lg:flex"><FAQPageMenuSideBar MenuProps={MenuProps}/></div>
                </section>
                <section className="flex w-[75%] ml-[5%] h-full justify-center items-center text-3xl text-black font-bold">
                    {welcomePage ? (
                        <WelcomeSubPage/>
                    ) : darkLightModePage ? (
                        <DarkLightModeSubPage />
                    ) : creationOverviewPage ? (
                        <CreatingUserAccountOverviewSubPage/>
                    ) : howToCreateAccountPage ? (
                        <HowToCreateAccountSubPage />
                    ) : cardSearchPageFilter ? (
                        <CardSearchFilterSubPage />
                    ) : (
                        <></>
                    )}
                </section>
            </div>
            <Footer/>
        </main>
    )

    return content
}

export default SiteHelpPage