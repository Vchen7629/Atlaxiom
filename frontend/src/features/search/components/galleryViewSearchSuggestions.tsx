import { GalleryViewComp } from "../types/searchbarcomponentstypes";
import { SearchResCardData } from "../types/dataStructures";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { waveform } from 'ldrs';
import { UserIdState } from "@/features/decks/types/deckPage";

const GalleryViewSearchSuggestionsComponent = ({ galleryviewprops }: GalleryViewComp) => {
    const {
        loading, 
        searchTerm,
        currentPageGalleryNamesArray,
        setErrorMessage,
    } = galleryviewprops

    const navigate = useNavigate();
    const [, setSelectedCardData] = useState<SearchResCardData | null>(null);
    const authenticated = useSelector((state: UserIdState) => state.auth.userId !== null);
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
        <main className="w-full h-full">
            {showLoading ? (
                    <div className="flex flex-col h-[70vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                        <span>Loading</span>
                        <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                    </div>
            ) : currentPageGalleryNamesArray.length > 0 ? (
                <div
                    className="grid grid-cols-4 sm-grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                >
                    {currentPageGalleryNamesArray.map((card: SearchResCardData) => (
                        <div 
                            key={card.id} 
                            className="relative flex h-full w-full group" 
                            onClick={handleClick(card)}
                            role="button"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleClick(card);
                                    }
                                }}
                            tabIndex={0}
                            aria-label={`Select card ${card.name}`}
                        >
                            <img src={card?.card_images[0].image_url} alt={card.name} className="h-full object-contain group-hover:blur-xs"/>
                            <div 
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                {card.name}
                            </div>
                        </div>
                    ))}         
                </div>
            ) : searchTerm === "" ? (
                <main className="w-full h-[70vh] flex justify-center items-center">
                    <span className="text-3xl font-bold">Enter a Card name to begin searching</span>
                </main>
            ) : !loading && (
                <main className="w-full h-[70vh] flex justify-center items-center">
                    <span className="text-3xl font-bold">No cards matching your Filters</span>
                </main>
            )}
        </main>
    )
}   

export default GalleryViewSearchSuggestionsComponent