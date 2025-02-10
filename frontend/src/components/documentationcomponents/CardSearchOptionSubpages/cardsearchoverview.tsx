import CardSearch from "@/navigation/footerbuttons/QuickLinkButtons/CardSearch";
import { MobileHeaderSearchbarPlaceholder } from "../components/mobileheaderplaceholder";
import { PcHeaderSearchbarPlaceholder } from "../components/pcheaderplaceholder";

export function CardSearchOverviewSubPage() {

    return (
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Overview</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">The Card Search Page allows you to search yugioh cards using the card name and several filters</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">Logged in users can select cards from the search result and add them to their collection</span>
            <div className="flex flex-col h-fit space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">How to access the page</span>
                <div className="flex flex-col h-fit space-y-[3vh]"> 
                    <span className="text-lg font-normal text-gray-400">You can find the button in the top right section of the screen on the header bar on PC:</span>
                    <PcHeaderSearchbarPlaceholder/>
                    <div className="flex items-center space-x-2 text-center text-lg font-normal text-gray-400">
                        <span>You can find the button in the dropdown menu by clicking on the </span>
                        <span className="text-3xl text-[hsl(var(--background3))]">☰</span>
                        <span>icon in the top right of the screen on mobile</span>
                    </div>
                    <MobileHeaderSearchbarPlaceholder />   
                </div>
            </div>
            <div className="flex w-full items-center space-x-[2vw] text-center">
                <span className="text-3xl text-[hsl(var(--text))]">Quick - Link:</span>
                <span className="text-3xl ml-2"><CardSearch /></span>
            </div>
        </main>
    )
}