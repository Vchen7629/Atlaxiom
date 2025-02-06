import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PcHeaderCollectionPlaceholder } from "../components/pcheaderplaceholder";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { MobileHeaderCollectionPlaceholder } from "../components/mobileheaderplaceholder";

export function CollectionOverviewSubPage() {

    return (
        // skipcq: JS-0415
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Overview</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">The Collection page allows you to track and filter your card collection</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">Logged in users can select cards from the search result and add them to their collection</span>
            <div className="flex flex-col h-fit space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">How to access the page</span>
                <span className="w-[80%] text-lg font-normal text-gray-400">Users need to be logged in to access the Collection Page</span>
                <div className="flex flex-col h-fit space-y-[3vh]"> 
                    <span className="text-lg font-normal text-gray-400">You can find the button in the top left section of the screen on the header bar on PC:</span>
                    <PcHeaderCollectionPlaceholder/>
                    <div className="flex items-center space-x-2 text-center text-lg font-normal text-gray-400">
                        <span>You can also find the button in the dropdown menu by clicking on the </span>
                        <div className="flex text-sm h-8 w-28 px-2 bg-[hsl(var(--profile))] border-2 border-[hsl(var(--background3))] justify-between items-center text-[hsl(var(--profile))] rounded-3xl">
                            <FontAwesomeIcon icon={faUser} className="text-[hsl(var(--background3))]"/>
                            <span className="ml-2 text-[hsl(var(--text))]">User </span>
                            <FontAwesomeIcon icon={faCaretDown} className="text-[hsl(var(--background3))]"/>
                        </div>
                        <span>icon</span>
                    </div>
                    <span className="text-lg font-normal text-gray-400">on the top right of the screen for mobile and PC</span>
                    <MobileHeaderCollectionPlaceholder/>
                </div>
            </div>
        </main>
    )
}