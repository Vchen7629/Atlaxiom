import { GalleryViewComp } from "../types/searchbarcomponentstypes";
import { SearchResCardData } from "../types/datastructuretypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SearchAuth } from "@/pages/searchpage/types/searchbarpagestypes";


const GalleryViewSearchSuggestionsComponent = ({ galleryviewprops }: GalleryViewComp) => {
    const {
        searchTerm,
        currentPageGalleryNamesArray,
        setErrorMessage,
    } = galleryviewprops

    const navigate = useNavigate();
    const [, setSelectedCardData] = useState<SearchResCardData | null>(null);
    const authenticated = useSelector((state: SearchAuth) => state.auth.token !== null);
    
    const handleSuggestionClick = (card: SearchResCardData) => {
        setSelectedCardData(card);
        setErrorMessage("");
        if (authenticated) {
            navigate('/searchresultloggedin', { state: { selectedCardData: card }})
        } else {
            navigate('/searchresult', { state: { selectedCardData: card }})
        }   
    };

    return (
        <main className="w-full h-full">
            {currentPageGalleryNamesArray.length > 0 ? (
                <div
                    className="grid grid-cols-4 sm-grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                >
                    {currentPageGalleryNamesArray.map((card: any, index) => (
                        <div key={index} className="relative flex h-full w-full group" onClick={() => handleSuggestionClick(card)}>
                            <img src={card?.card_images[0].image_url} className="h-full object-contain group-hover:blur-xs"/>
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
            ) : (
                <main className="w-full h-[70vh] flex justify-center items-center">
                    <span className="text-3xl font-bold">No cards matching your Filters</span>
                </main>
            )}
        </main>
    )
}   

export default GalleryViewSearchSuggestionsComponent