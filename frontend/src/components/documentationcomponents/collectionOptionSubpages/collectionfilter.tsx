import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faFilter } from "@fortawesome/free-solid-svg-icons";
import { PcCollectionFilterButtonPlaceholder } from "../components/pccollectionpageplaceholder";
import { MobileCollectionFilterButtonPlaceholder } from "../components/mobilecollectionpageplaceholder";

export function CollectionFilterSubPage() {

    return (
        // skipcq: JS-0415
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Collection Filters</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">The Card Search Filter Component allows you to Filter Search Results based on various card identifiers</span>
            <div className="flex flex-col h-fit space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">How to open the search filter component</span>
                <div className="flex flex-col h-fit space-y-[3vh]"> 
                    <span className="flex items-center text-lg font-normal text-gray-400">
                        The Collection Filter sidebar is hidden as default, to open it you can click the filter button: 
                        <div className="flex justify-center items-center space-x-2 ml-2 px-4 py-3 rounded-xl bg-gray-700">
                            <FontAwesomeIcon icon={faFilter} />
                            <span className="text-sm text-white"> Filter</span>
                        </div>
                    </span>
                    <span className="flex items-center text-lg font-normal text-gray-400"> 
                        This will display the collection filter sidebar and the filter button will turn gold/blue 
                        <div className="flex justify-center items-center space-x-2 ml-2 px-4 py-3 rounded-xl bg-[hsl(var(--background3))]">
                            <FontAwesomeIcon icon={faFilter} className="text-[hsl(var(--text))]"/>
                            <span className="text-sm text-white"> Filter</span>
                        </div>
                    </span>
                </div>
            </div>
            <div className="flex flex-col w-full space-y-[2vw]">
                <span className="text-3xl text-[hsl(var(--text))]">Where to find the Collection Filter Button</span>
                <span className="text-lg font-normal text-gray-400"> The Collection Filter is found next to the searchbar:</span>
                <div className="flex items-center text-xl text-[hsl(var(--text))]">
                    <span className="w-[6vw] mr-4">On PC:</span><PcCollectionFilterButtonPlaceholder />
                </div>
                <div className="flex items-center text-xl text-[hsl(var(--text))]">
                    <span className="w-[6vw] mr-4">On Mobile:</span><MobileCollectionFilterButtonPlaceholder/>
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
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Card Attribute</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Card Level</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Pendulum Scale</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Link Rating</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Attack</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 items-center justify-center bg-gray-400">Defense</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Card Rarity</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 items-center justify-center bg-gray-400">Card Set</span>
                    </section>
                    <section className="flex flex-col space-y-1  h-full">
                        <span className="flex text-lg w-full py-1 justify-center bg-[hsl(var(--background3))]">Options</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Monster Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Spell Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Trap Type</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by the Attribute</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Level value, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Pendulum scale, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Link rating, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Attack value, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[6vh] w-full pl-2 justify-center bg-gray-400">Sort by the Defense value, can be set to display cards less than, equal to, or greater than the value</span>
                        <span className="flex text-lg h-[4vh] w-full pl-2 justify-left items-center bg-gray-400">Sort by Rarity for the Card</span>
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