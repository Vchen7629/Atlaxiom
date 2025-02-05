import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MobileFilterButtonPlaceholder } from "../components/mobilesearchpageplaceholder";
import { PcFilterButtonPlaceholder } from "../components/pcsearchpageplaceholder";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

export function CardSearchFilterSubPage() {

    return (
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Card Search Filters</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">The Card Search Filter Component allows you to Filter Search Results based on various card identifiers</span>
            <div className="flex flex-col h-fit space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">How to open the search filter component</span>
                <div className="flex flex-col h-fit space-y-[3vh]"> 
                    <span className="text-lg font-normal text-gray-400">
                        The Search Filter sidebar is hidden as default, to open it you can click the filter button: 
                        <span className="justify-center ml-2 px-4 py-3 rounded-xl bg-gray-600 text-white"> Filter Card</span>
                    </span>
                    <span className="text-lg font-normal text-gray-400"> 
                        This will display the search filter sidebar and the filter button will turn gold/blue 
                        <span className="justify-center ml-2 px-4 py-3 rounded-xl bg-[hsl(var(--background3))] text-white"> Filter Card</span>
                    </span>
                </div>
            </div>
            <div className="flex flex-col w-full space-y-[2vw]">
                <span className="text-3xl text-[hsl(var(--text))]">Where to find the Search Filter Button</span>
                <span className="text-lg font-normal text-gray-400"> The Search Filter is found next to the searchbar:</span>
                <div className="flex items-center text-xl text-[hsl(var(--text))]">
                    <span className="w-[6vw] mr-4">On PC:</span><PcFilterButtonPlaceholder />
                </div>
                <div className="flex items-center text-xl text-[hsl(var(--text))]">
                    <span className="w-[6vw] mr-4">On Mobile:</span><MobileFilterButtonPlaceholder />
                </div>
            </div>
            <div className="flex flex-col w-full space-y-[2vw]">
                <span className="text-3xl text-[hsl(var(--text))]">Filters</span>
                <span className="text-lg font-normal text-gray-400"> The Search Results can be filtered with the following criteria:</span>
                <div className="grid grid-cols-[20%_80%] w-[70%] h-fit border-2 border-gray-600">
                    <section className="flex flex-col space-y-1 h-full border-r-2 border-transparent">
                        <span className="flex text-lg w-full py-1 justify-center bg-[hsl(var(--background3))]">Options</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Monster Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Spell Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Trap Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Attribute</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Level / Rank</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Pendulum Scale</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Link Rating</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Attack</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Defense</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Set</span>
                    </section>
                    <section className="flex flex-col space-y-1  h-full">
                        <span className="flex text-lg w-full py-1 justify-center bg-[hsl(var(--background3))]">Options</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Monster Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Spell Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Trap Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Attribute</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Level / Rank value, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Pendulum scale, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Link rating, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Attack value, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Defense value, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Set the Card was released in</span>
                    </section>
                </div>
                <div className="flex flex-col w-full space-y-[1vw]">
                    <span className="text-3xl text-[hsl(var(--text))]">Clearing Filters</span>
                    <div className="flex text-lg font-normal items-center text-gray-400 space-x-2">
                        <span>If you want to start a new search, you can click the clear filters button: </span>
                        <div className="flex items-center justify-center rounded-lg p-3 round-lg text-white bg-gray-600"><FontAwesomeIcon icon={faArrowRotateRight} className="fa-xs"/></div>
                    </div>
                    <span className="flex text-lg font-normal items-center  text-gray-400 ">to clear all the selected filters and start a new search</span>
                </div>
            </div>
        </main>
    )
}