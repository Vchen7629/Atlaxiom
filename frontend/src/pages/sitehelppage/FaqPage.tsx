import { FAQPageMenuSideBar } from "@/components/sitehelppagecomponents/dropdownmenu.tsx"
import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { Toaster } from "sonner"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestion, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"

const SiteHelpPage = () => {
    const [cardSearchView, setCardSearchView] = useState(true);
    const [collectionPageView, setCollectionPageView] = useState(false);
    const [deckBuildPageView, setDeckBuildPageView] = useState(false);
    const [editProfileView, setEditProfileView] = useState(true);
    const [darkLightModeView, setDarkLightModeView] = useState(true);

    const content = (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex relative h-[95vh] py-[15vh] rounded-lg w-full px-[10vw] bg-[hsl(var(--background1))]  overflow-hidden ">
                <section className="flex flex-col space-y-[2vh] w-[20%] h-[95vh]">
                    <div className="flex w-full justify-center space-x-[1vw] items-center font-bold">
                        <FontAwesomeIcon icon={faQuestionCircle} className="fa-2xl text-gray-400"/>
                        <span className="text-3xl">Site Help</span>
                    </div>
                    <FAQPageMenuSideBar/>
                </section>
            </div>
            <Footer/>
        </main>
    )

    return content
}

export default SiteHelpPage