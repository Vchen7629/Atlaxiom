import { MobileHeaderPlaceholder } from "./mobileheaderplaceholder";
import { PcHeaderPlaceholder } from "./pcheaderplaceholder";

export function DarkLightModeSubPage() {

    return (
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Using Dark / Light Mode</span>
            <span className="ml- text-lg font-normal text-gray-400">On Atlaxiom you have the option to change between the Dark and Light mode theme for your viewing experience</span>
            <div className="flex flex-col space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">Where to find the Button</span>
                <div className="flex flex-col space-y-[3vh]"> 
                    <span className="text-lg font-normal text-gray-400">You can find the button in the top right section of the screen on the header bar if you are on PC:</span>
                    <PcHeaderPlaceholder />
                    <span className="text-lg font-normal text-gray-400">You can find the button in the top left section of the screen on the header bar if you are on Mobile:</span>
                    <MobileHeaderPlaceholder />
                </div>
            </div>
            <div className="flex flex-col space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">How to Change between Dark and Light Mode</span>
                <span className="text-lg font-normal text-gray-400">To Change between Dark and Light Mode, Click on the Button and select a mode from the dropdown</span>
                <div className="ml-[2vw] flex space-x-2">
                    <span className="text-lg font-normal text-[hsl(var(--text))]">Light Mode:</span>
                    <span className="text-lg font-normal text-gray-400">Select to Change the site theme into a white / gray / blue theme</span>
                </div>
                <div className="ml-[2vw] flex space-x-2">
                    <span className="text-lg font-normal text-[hsl(var(--text))]">Dark Mode:</span>
                    <span className="text-lg font-normal text-gray-400">Select to Change the site theme into a black / gold / dark gray theme</span>
                </div>
                <div className="ml-[2vw] flex space-x-2">
                    <span className="text-lg font-normal text-[hsl(var(--text))]">System:</span>
                    <span className="text-lg font-normal text-gray-400">Select to Change the site theme into your system settings</span>
                </div>
            </div>
        </main>
    )
}