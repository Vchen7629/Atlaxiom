import Home from "./footerbuttons/home.tsx"
import AboutUs from "./footerbuttons/Aboutus.tsx"
import FAQ from "./footerbuttons/FAQ.tsx"
import PrivacyPolicy from "./footerbuttons/PrivacyPolicy.tsx"

const Footer = () => {

    const content = (
        <footer className="z-50">
            <div className="bg-blackone flex flex-col w-full min-h-[20vh] items-center space-y-[1vh] lg:space-y-[3vh] pb-2 text-lg pt-8"> 
                <div className="flex w-[90%] h-1/2 mb-2 items-center justify-between">
                    <div className="flex justify-between">
                        <div className="font-bold text-goldenrod sm:text-sm md:text-[40px]">Atlaxiom</div>
                    </div>
                    <div className="relative w-[40%] hidden sm:block md:flex justify-between">
                        <AboutUs/>
                        <PrivacyPolicy/>
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