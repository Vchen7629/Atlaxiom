import Home from "./QuickLinkButtons/home.tsx"
import FAQ from "./supportbuttons/FAQ.tsx"
import PrivacyPolicy from "./LegalButtons/PrivacyPolicy.tsx"
import ContactUs from "./supportbuttons/Contactus.tsx"
import CardSearch from "./QuickLinkButtons/CardSearch.tsx"
import Github from "./SocialButtons/Github.tsx"
import Login from "./QuickLinkButtons/Login.tsx"
import Signup from "./QuickLinkButtons/Signup.tsx"

const Footer = () => {
    
    const content = (
        <footer className="z-50 bg-blackone flex w-full space-x-[5vw] min-h-[25vh] pb-2 text-lg pt-[5vh] px-[10vw]">
            <div className="flex flex-col w-[25vw] h-fit space-y-[1.5vh]">
                <span className="font-bold text-goldenrod text-4xl">Atlaxiom</span>
                <span className="text-sm">Atlaxiom is a all-in-one Yu-Gi-Oh! Database, Deck Builder and Collection Manager web app!</span>
                <div className="flex w-full space-x-2 items-center">
                    <span className="text-white text-md">To Get Started</span>
                    <Login/>
                    <span>or</span>
                    <Signup/>
                </div>
            </div>
            <div className="flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Quick Links</span>
                <Home/>
                <CardSearch/>
            </div>
            <div className="flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Support</span>
                <FAQ/>
                <ContactUs />
            </div>
            <div className="flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Social</span>
                <Github/>
                <ContactUs />
            </div>
            <div className="flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Legal</span>
                <PrivacyPolicy/>
            </div>
        </footer>
    )

    return content
}

export default Footer