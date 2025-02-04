import { MobileHeaderSignUpPlaceholder } from "../components/mobileheaderplaceholder";
import { PcHeaderSignUpPlaceholder } from "../components/pcheaderplaceholder";

export function HowToCreateAccountSubPage() {

    return (
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">How to create a user account</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">New Users can create their user account using username, email and password</span>
            <span className="w-[80%] text-lg font-normal text-blue-400">
                Work in progress: In the future, new users can sign in using their google account via google oauth without having to create an account using username / password
            </span>
            <div className="flex flex-col h-fit space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">Where to find the Button</span>
                <div className="flex flex-col h-fit space-y-[3vh]"> 
                    <span className="text-lg font-normal text-gray-400">You can find the button in the top right section of the screen on the header bar on PC:</span>
                    <PcHeaderSignUpPlaceholder/>
                    <div className="flex items-center space-x-2 text-center text-lg font-normal text-gray-400">
                        <span>You can find the button in the dropdown menu by clicking on the </span>
                        <span className="text-3xl text-[hsl(var(--background3))]">☰</span>
                        <span>icon in the top right of the screen on mobile</span>
                    </div>
                    <MobileHeaderSignUpPlaceholder />
                </div>
            </div>
            <div className="flex flex-col space-y-[2vh] w-[80%]">
                <span className="text-3xl text-[hsl(var(--text))]">Creating Your Account</span>
                <span className="text-lg font-normal text-gray-400">To Create a User Account you need to provide username, email, and password</span>
                <div className="ml-[2vw] flex space-x-2">
                    <span className="text-lg font-normal text-[hsl(var(--text))] w-[10%]">Username:</span>
                    <span className="text-lg font-normal text-gray-400">Provide a valid username, at least 3 letters, this is used for login and can be changed later through the profile page</span>
                </div>
                <div className="ml-[2vw] flex space-x-2">
                    <span className="text-lg font-normal text-[hsl(var(--text))] w-[10%]">Email:</span>
                    <span className="text-lg font-normal text-gray-400">Provide the email of the account you will be using. You can change it later using the profile page</span>
                </div>
                <div className="ml-[2vw] flex space-x-2">
                    <span className="text-lg font-normal text-[hsl(var(--text))] w-[10%]">Password:</span>
                    <span className="text-lg font-normal text-gray-400">Provide a valid password, at least 2 letters, this is used for login and can be changed later through the profile page</span>
                </div>
            </div>
        </main>
    )
}