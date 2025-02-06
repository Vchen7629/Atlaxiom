import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PcCollectionAddCardButtonPlaceholder } from "../components/pccollectionpageplaceholder";
import { MobileCollectionAddCardButtonPlaceholder } from "../components/mobilecollectionpageplaceholder";
import { AddCardPlaceholder } from "../components/addcardplaceholder";

export function AddNewCardSubPage() {

    return (
        // skipcq: JS-0415
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Adding a New Card to your Collection</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">You can add a new card to your collection through a variety of ways</span>
            <div className="flex flex-col h-fit space-y-[2vh]">
                <span className="text-3xl text-[hsl(var(--text))]">Adding a new card through the collection page</span>
                <div className="flex flex-col h-fit space-y-[3vh]"> 
                    <div className="flex items-center">
                        <span className="text-lg font-normal text-gray-400">You can add a new card to your collection via the add card button: </span>
                        <div className="flex justify-center items-center space-x-2 ml-2 px-3 w-28 py-2 rounded-md bg-blue-500">
                            <FontAwesomeIcon icon={faPlusCircle} className="fa-xs text-white"/>
                            <span className="text-xs text-[hsl(var(--text))]"> Add Card</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-[3vh] w-full h-[35vh] ">
                        <span className="text-xl font-normal text-[hsl(var(--text))]">The button is found around the search bar: </span>
                        <div className="flex items-center text-xl text-[hsl(var(--text))]">
                            <span className="w-[6vw] mr-4">On PC:</span><PcCollectionAddCardButtonPlaceholder />
                        </div>
                        <div className="flex items-center text-xl text-[hsl(var(--text))]">
                            <span className="w-[6vw] mr-4">On Mobile:</span><MobileCollectionAddCardButtonPlaceholder />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-[3vh] w-full">
                        <span className="text-lg font-normal text-gray-400">Clicking on this button will display a component that allows for filtering by card name </span>
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-normal text-gray-400">Clicking on the add card button: </span>
                            <div className="flex items-center text-center justify-between bg-[hsl(var(--background3))] w-[90px] h-8 px-2 text-sm rounded-xl">
                                <FontAwesomeIcon icon={faPlus} className="fa-lg text-[hsl(var(--text))]"/>
                                <span className="fa-sm text-[hsl(var(--text))]">Add Card</span>
                            </div>
                            <span className="text-lg font-normal text-gray-400">Will Select the Card and display the card details</span>
                        </div>
                        <span className="text-lg font-normal text-gray-400">and a list of card sets the card belongs to</span>
                    </div>
                    <div className="flex flex-col space-y-[3vh] w-full h-[48vh] ">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-normal text-[hsl(var(--text))]">Just Click the </span>
                            <div className="px-2 py-1 text-sm bg-[hsl(var(--background3))] rounded-lg">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <span className="text-xl font-normal text-[hsl(var(--text))]">icon next to the card from the card set you want to add</span>
                        </div>
                        <AddCardPlaceholder />
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-[2vh] w-[80%]">
                <span className="text-3xl text-[hsl(var(--text))]">Adding a new card through the search page</span>
                
            </div>

        </main>
    )
}