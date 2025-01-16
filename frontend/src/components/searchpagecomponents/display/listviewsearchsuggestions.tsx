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
                                        <span className="flex text-center items-center pl-[3%] w-[60%] text-[hsl(var(--background3))] font-black text-2xl">{card.name}</span>
                                        <div className="flex justify-evenly items-center font-bold w-[40%]">
                                            <span className="text-[hsl(var(--text))] text-xl">{card?.type}</span>
                                            <span className="text-[hsl(var(--text))] text-xl">{card?.race}</span>
                                            <span className="text-[hsl(var(--text))] text-xl">{card?.attribute}</span>
                                        </div>
                                    </section>
                                    <div className="flex flex-col h-[80%]">
                                        <section className={`flex-grow overflow-y-auto max-h-full px-[3%] pt-[5px]`}>
                                            <span className="text-sm text-ellipsis text-[hsl(var(--text))] font-black">{card?.desc}</span>
                                        </section>
                                        {(card?.atk || card?.atk === 0 || card?.def || card?.def === 0 || card?.level || card?.scale || card?.linkval) && (     
                                            <section className="w-full h-fit flex space-x-12 pl-[3%]">
                                                {(card?.atk || card?.atk === 0)&& (
                                                    <div className="flex font-bold text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Atk:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.atk}</span>
                                                    </div>
                                                )}
                                                {(card?.def || card?.def === 0) && (
                                                    <div className="flex font-bold text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Def:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.def}</span>
                                                    </div>
                                                )}
                                                {card?.level && (
                                                    <div className="flex font-bold text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Level:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.level}</span>
                                                    </div>
                                                )}
                                                {card?.scale && (
                                                    <div className="flex font-bold text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Pendulum Scale:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.scale}</span>
                                                    </div>
                                                )}
                                                {card?.linkval && (
                                                    <div className="flex font-bold text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Link Value:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.linkval}</span>
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
                        <span className="text-3xl text-[hsl(var(--text))] font-bold">Enter a Card name to begin searching</span>
                    </main>
                ) : (
                    <main className="w-full h-[70vh] flex justify-center items-center">
                        <span className="text-3xl text-[hsl(var(--text))] font-bold">No cards matching your Filters</span>
                    </main>
                )}
            </div>
        </main>
    )
}

export default ListViewSearchSuggestionsComponent