import FAQ from "../buttons/FAQ"
import Banlist from "../buttons/banlist"
import Home from "../buttons/home"
import Cardsearch from "../buttons/searchbar"
import AboutUs from "../buttons/Aboutus"
import ContactUs from "../buttons/Contactus"
import Login from "../buttons/login"
import Signup from "../buttons/signup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { InstagramLogoIcon } from "@radix-ui/react-icons"

const Footer = () => {

    const content = (
        <footer className="z-50">
            <div className="bg-blackone flex flex-col w-full h-[20vh] items-center justify-between pb-2 text-lg pt-8"> 
                <div className="flex w-[90%] h-1/2 mb-2 items-center justify-between">
                    <div className="flex justify-between">
                        <div className="font-bold text-goldenrod text-[40px]">Atlaxiom</div>
                    </div>
                    <div className="flex w-[30%] justify-between">
                        <AboutUs/>
                        <ContactUs/>
                        <Home/>
                        <FAQ/>
                    </div>
                    <div className="flex flex-col items-center justify-center w-[15%]">
                        Funny Shit
                    </div>
                </div> 

                <div className="text-sm text-gray-400 w-3/4">
                    The literal and graphical information presented on this site about Yu-Gi-Oh!, 
                including card images, the attribute, level/rank and type symbols, and card text, 
                is copyright 4K Media Inc, a subsidiary of Konami Digital Entertainment, Inc. This 
                website is not produced by, endorsed by, supported by, or affiliated with 4k Media or 
                Konami Digital Entertainment.
                </div>
            </div>
           
        </footer>
    )

    return content
}

export default Footer