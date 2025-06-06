import { useEffect, useState } from "react";
import { SearchResCardData } from "../types/datastructuretypes";
import { ListViewComp } from "../types/searchbarcomponentstypes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { waveform } from 'ldrs';
import { UserIdState } from "@/pages/my-decks/deckpagetypes";

const ListViewSearchSuggestionsComponent = ({ listviewprops }: ListViewComp) => {
    const {
        loading,
        searchTerm,
        currentPageListNamesArray,
        setErrorMessage,
    } = listviewprops

    const [, setSelectedCardData] = useState<SearchResCardData | null>(null);
    const authenticated = useSelector((state: UserIdState) => state.auth.userId !== null);
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(true);

    waveform.register();
    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 250);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [loading]);

    const handleSuggestionClick = (card: SearchResCardData) => {
        setSelectedCardData(card);
        setErrorMessage("");
        if (authenticated) {
            navigate('/searchresultloggedin', { state: { selectedCardData: card }})
        } else {
            navigate('/searchresult', { state: { selectedCardData: card }})
        }   
    };

    const handleClick = (card: SearchResCardData) => {
        return () => handleSuggestionClick(card)
    }

    return (
        <main className="flex items-center justify-center w-full">
            <div className="">
                {showLoading ? (
                    <div className="flex flex-col h-[70vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                        <span>Loading</span>
                        <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                    </div>
                ) : currentPageListNamesArray.length > 0 ? (
                    currentPageListNamesArray.map((card: SearchResCardData) => (
                        <div 
                            key={card.id} 
                            onClick={handleClick(card)} 
                            className="ml-[2.5%] w-[95%] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--background3))] rounded-2xl mb-[2vh] bg-[hsl(var(--contrast))] shadow-lg pl-4  hover:scale-105 transition-transform duration-200"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleClick(card)();
                                }
                                }}
                            tabIndex={0}
                            role="button"
                            aria-label={`Select card ${card.name}`}
                        >
                            <div className="flex items-center w-full h-[20vh] mb-2 bg-transparentt">
                                
                                <img src={card?.card_images[0].image_url} alt={card.name} className="w-auto h-[80%]"/>
                                <div className="flex h-[20vh] overflow-y-auto w-full min-h-full flex-col">
                                    <section className="relative flex justify-between w-full h-[20%]">
                                        <span className="flex text-center items-center pl-[3%] w-[55%] text-[hsl(var(--background3))] font-black text-[11px] lg:text-2xl">{card.name}</span>
                                        <div className="flex justify-between items-center lg:font-bold w-[45%]">
                                            <span className="text-[hsl(var(--text))] w-[40%] text-[8px] lg:text-xl">{card?.type}</span>
                                            <span className="text-[hsl(var(--text))] w-[30%] text-[10px] lg:text-xl">{card?.race}</span>
                                            <span className="text-[hsl(var(--text))] w-[30%] text-[10px] lg:text-xl">{card?.attribute}</span>
                                        </div>
                                    </section>
                                    <div className="flex flex-col h-[80%]">
                                        <section className="flex-grow overflow-y-auto max-h-full px-[3%] pt-[5px]">
                                            <span className="text-[10px] lg:text-sm text-ellipsis text-[hsl(var(--text))] font-semibold lg:font-black">{card?.desc}</span>
                                        </section>
                                        {(card?.atk || card?.atk === 0 || card?.def || card?.def === 0 || card?.level || card?.scale || card?.linkval) && (     
                                            <section className="w-full h-fit flex space-x-2 lg:space-x-12 pl-[3%]">
                                                {(card?.atk || card?.atk === 0)&& (
                                                    <div className="flex font-bold text-[10px] lg:text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Atk:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.atk}</span>
                                                    </div>
                                                )}
                                                {(card?.def || card?.def === 0) && (
                                                    <div className="flex font-bold text-[10px] lg:text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Def:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.def}</span>
                                                    </div>
                                                )}
                                                {card?.level && (
                                                    <div className="flex font-bold text-[10px] lg:text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Level:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.level}</span>
                                                    </div>
                                                )}
                                                {card?.scale && (
                                                    <div className="flex font-bold text-[10px] lg:text-lg">
                                                        <span className="mr-2 text-[hsl(var(--background3))]">Pendulum Scale:</span>
                                                        <span className="text-[hsl(var(--text))]">{card?.scale}</span>
                                                    </div>
                                                )}
                                                {card?.linkval && (
                                                    <div className="flex font-bold text-[10px] lg:text-lg">
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
                ) : !loading && (
                    <main className="w-full h-[70vh] flex justify-center items-center">
                        <span className="text-3xl text-[hsl(var(--text))] font-bold">No cards matching your Filters</span>
                     </main>
                )}
            </div>
        </main>
    )
}

export default ListViewSearchSuggestionsComponent