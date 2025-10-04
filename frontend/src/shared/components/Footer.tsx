import Github from "@/shared/navigation/Github"
import Login from "@/shared/navigation/login"
import NavButton from "../navigation/footerButton"
import Signup from "../navigation/signup"

const Footer = () => {
    
    const content = (
        <footer className="z-50 bg-blackone flex flex-col lg:flex-row w-full space-x-[5vw] min-h-[25vh] pb-2 text-lg pt-[5vh] px-[10vw]">
            <div className="flex flex-col w-full text-center lg:text-start lg:w-[25vw] h-fit space-y-[1.5vh]">
                <span className="font-bold text-goldenrod text-4xl">Atlaxiom</span>
                <span className="text-sm">Atlaxiom is a all-in-one Yu-Gi-Oh! Database, Deck Builder and Collection Manager web app!</span>
                <div className="flex w-full space-x-2 items-center justify-center lg:justify-normal">
                    <span className="text-white text-md">To Get Started</span>
                    <Login
                        footer={true}
                        header={false}
                    />
                    <span>or</span>
                    <Signup
                        footer={true}
                        header={false}
                    />
                </div>
            </div>
            <div className="hidden lg:flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Quick Links</span>
                <NavButton 
                    route="/"
                    logged_in_route="/loggedin"
                    button_text="home"
                />
                <NavButton 
                    route="/search"
                    logged_in_route="/searchloggedin"
                    button_text="Card Search"
                />
            </div>
            <div className="hidden lg:flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Support</span>
                <NavButton 
                    route="/contact"
                    logged_in_route="/contactloggedin"
                    button_text="Contact"
                />
            </div>
            <div className="hidden lg:flex flex-col w-[15vw] h-fit space-y-[1.5vh]">
                <span className="text-xl font-bold text-white">Social</span>
                <Github/>
            </div>
            <div className="flex lg:hidden w-full mt-[5vh] space-x-[5vw]">
                <div className="flex flex-col w-[35vw] h-fit space-y-[1.5vh]">
                    <span className="text-xl font-bold text-white">Quick Links</span>
                    <NavButton 
                        route="/"
                        logged_in_route="/loggedin"
                        button_text="home"
                    />
                    <NavButton 
                        route="/search"
                        logged_in_route="/searchloggedin"
                        button_text="Card Search"
                    />
                </div>
                <div className="flex  flex-col w-[35vw] h-fit space-y-[1.5vh]">
                    <span className="text-xl font-bold text-white">Support</span>
                    <NavButton 
                        route="/contact"
                        logged_in_route="/contactloggedin"
                        button_text="Contact"
                    />
                </div>  
            </div>
            <div className="flex lg:hidden w-full mt-[5vh] space-x-[5vw]">
                <div className="flex flex-col w-[35vw] h-fit space-y-[1.5vh]">
                    <span className="text-xl font-bold text-white">Socials</span>
                    <Github/>
                    <NavButton 
                        route="/contact"
                        logged_in_route="/contactloggedin"
                        button_text="Contact"
                    />
                </div>
            </div>
        </footer>
    )

    return content
}

export default Footer