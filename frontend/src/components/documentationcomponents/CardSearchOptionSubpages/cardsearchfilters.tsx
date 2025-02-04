import { PcHeaderSearchbarPlaceholder } from "../components/pcheaderplaceholder";

export function CardSearchFilterSubPage() {

    return (
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Card Search Filters</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">The Card Search Filter Component allows you to Filter Search Results based on various card identifiers</span>
            <div className="flex flex-col h-fit space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">How to access the page</span>
                <div className="flex flex-col h-fit space-y-[3vh]"> 
                    <span className="text-lg font-normal text-gray-400">You can find the button in the top right section of the screen on the header bar on PC:</span>
                    <PcHeaderSearchbarPlaceholder/>  
                </div>
            </div>
            <div className="flex flex-col w-full space-y-[2vw]">
                <span className="text-3xl text-[hsl(var(--text))]">Filter Options</span>
            </div>
        </main>
    )
}