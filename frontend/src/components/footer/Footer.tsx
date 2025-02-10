import Home from "@/navigation/footerbuttons/QuickLinkButtons/home.tsx"
import FAQ from "@/navigation/footerbuttons//supportbuttons/FAQ.tsx"
import PrivacyPolicy from "@/navigation/footerbuttons//LegalButtons/PrivacyPolicy.tsx"
import ContactUs from "@/navigation/footerbuttons/supportbuttons/Contactus.tsx"
import CardSearch from "@/navigation/footerbuttons/QuickLinkButtons/CardSearch.tsx"
import Github from "@/navigation/footerbuttons//SocialButtons/Github.tsx"
import Login from "@/navigation/footerbuttons/QuickLinkButtons/Login.tsx"
import Signup from "@/navigation/footerbuttons/QuickLinkButtons/Signup.tsx"

const Footer = () => {
    
    const content = (
        <footer className="z-50 bg-blackone flex flex-col lg:flex-row w-full space-x-[5vw] min-h-[25vh] pb-2 text-lg pt-[5vh] px-[10vw]">
            <div className="flex flex-col w-full text-center lg:text-start lg:w-[25vw] h-fit space-y-[1.5vh]">
                <span className="font-bold text-goldenrod text-4xl">Atlaxiom</span>
                <span className="text-sm">Atlaxiom is a all-in-one Yu-Gi-Oh! Database, Deck Builder and Collection Manager web app!</span>
                <div className="flex w-full space-x-2 items-center justify-center lg:justify-normal">
                    <span className="text-white text-md">To Get Started</span>
                    <Login/>
                    <span>or</span>
                    <Signup/>
                </div>
            </div>
            <div className="hidden lg:flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Quick Links</span>
                <Home/>
                <CardSearch/>
            </div>
            <div className="hidden lg:flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Support</span>
                <FAQ/>
                <ContactUs />
            </div>
            <div className="hidden lg:flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Social</span>
                <Github/>
                <ContactUs />
            </div>
            <div className="hidden lg:flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Legal</span>
                <PrivacyPolicy/>
            </div>
            <div className="flex lg:hidden w-full mt-[5vh] space-x-[5vw]">
                <div className="flex flex-col w-[35vw] h-fit space-y-[1.5vh]">
                    <span className="text-xl font-bold text-white">Quick Links</span>
                    <Home/>
                    <CardSearch/>
                </div>
                <div className="flex  flex-col w-[35vw] h-fit space-y-[1.5vh]">
                    <span className="text-xl font-bold text-white">Support</span>
                    <FAQ/>
                    <ContactUs />
                </div>  
            </div>
            <div className="flex lg:hidden w-full mt-[5vh] space-x-[5vw]">
                <div className="flex flex-col w-[35vw] h-fit space-y-[1.5vh]">
                    <span className="text-xl font-bold text-white">Social</span>
                    <Github/>
                    <ContactUs />
                </div>
                <div className="flex flex-col w-[35vw] h-fit space-y-[1.5vh]">
                    <span className="text-xl font-bold text-white">Legal</span>
                    <PrivacyPolicy/>
                </div>
            </div>
        </footer>
    )

    return content
}

export default Footer