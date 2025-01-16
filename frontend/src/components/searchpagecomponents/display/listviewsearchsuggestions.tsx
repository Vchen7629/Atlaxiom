import { SearchResCardData } from "../types/datastructuretypes";
import { ListViewComp } from "../types/searchbarcomponentstypes";


const ListViewSearchSuggestionsComponent = ({ listviewprops }: ListViewComp) => {
    const {
        searchTerm,
        setSelectedCardData,
        setClickedOnCard,
        currentPageListNamesArray,
        setErrorMessage,
    } = listviewprops   

    const handleSuggestionClick = (card: SearchResCardData) => {
        setSelectedCardData(card);
        setClickedOnCard(true);
        setErrorMessage("");
    };

      return (
        <main className="w-full">
            <div>
                {currentPageListNamesArray.length > 0 ? (
                    currentPageListNamesArray.map((card: any, index) => (
                        <div key={index} onClick={() => handleSuggestionClick(card)}>
                            <div className="flex h-[20vh] mb-2 bg-transparentt">
                                <img
                                    src={card?.card_images[0].image_url}
                                    //alt={suggestion}
                                    className="w-auto"
                                />
                                <div className="flex h-[20vh] overflow-y-auto w-full min-h-full flex-col border-2 border-transparent hover:border-gray-500">
                                    <section className="relative flex justify-between w-full h-[20%]">
                                        <div className="flex text-center items-center pl-[3%] w-[60%] text-goldenrod font-black text-2xl">{card.name}</div>
                                        <div className="flex justify-evenly items-center font-bold w-[40%]">
                                            <div className="text-white text-xl">{card?.type}</div>
                                            <div className="text-white text-xl">{card?.race}</div>
                                            <div className="text-white text-xl">{card?.attribute}</div>
                                        </div>
                                    </section>
                                    <div className="flex flex-col h-[80%]">
                                        <section className={`flex-grow overflow-y-auto text-sm max-h-full text-ellipsis px-[3%] text-gray-400 font-black text-md pt-[5px]`}>
                                            {card?.desc}
                                        </section>
                                        {(card?.atk || card?.def || card?.level || card?.scale || card?.linkval) && (     
                                                <section className="w-full h-fit flex space-x-12 pl-[3%]">
                                                        {card?.atk && (
                                                            <div className="flex text-gray-300 font-black text-lg">
                                                                <p className="mr-2">Atk:</p>{card?.atk}
                                                            </div>
                                                        )}
                                                        {card?.def && (
                                                            <div className="flex text-gray-300 font-black text-lg">
                                                                <p className="mr-2">Def:</p>{card?.def}
                                                            </div>
                                                        )}
                                                        {card?.level && (
                                                            <div className="flex text-gray-300 font-black text-lg">
                                                                <p className="mr-2">Level:</p>{card?.level}
                                                            </div>
                                                        )}
                                                        {card?.scale && (
                                                            <div className="flex text-gray-300 font-black text-lg">
                                                                <p className="mr-2">Pendulum Scale:</p>{card?.scale}
                                                            </div>
                                                        )}
                                                        {card?.linkval && (
                                                            <div className="flex text-gray-300 font-black text-lg">
                                                                <p className="mr-2">Link Value:</p>{card?.linkval}
                                                            </div>
                                                        )}
                                                </section>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : searchTerm === "" ? (
                    <main className="w-full h-[70vh] flex justify-center items-center">
                        <span className="text-3xl font-bold">Enter a Card name to begin searching</span>
                    </main>
                ) : (
                    <main className="w-full h-[70vh] flex justify-center items-center">
                        <span className="text-3xl font-bold">No cards matching your Filters</span>
                    </main>
                )}
            </div>
        </main>
    )
}

export default ListViewSearchSuggestionsComponent