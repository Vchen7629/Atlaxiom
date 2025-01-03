import { GalleryViewComp } from "../types/searchbarcomponentstypes";
import { SearchResCardData } from "../types/datastructuretypes";


const GalleryViewSearchSuggestionsComponent = ({ galleryviewprops }: GalleryViewComp) => {
    const {
        searchTerm,
        currentPageGalleryNamesArray,
        setClickedOnCard,
        setSelectedCardData,
        setErrorMessage,
    } = galleryviewprops

    const handleSuggestionClick = (card: SearchResCardData) => {
            setSelectedCardData(card);
            setClickedOnCard(true);
            setErrorMessage("");
    };

    return (
        <main className="w-full h-full">
            {currentPageGalleryNamesArray.length > 0 ? (
                <div
                    className="grid grid-cols-10 gap-4 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                >
                    {currentPageGalleryNamesArray.map((card: any, index) => (
                        <div key={index} className="flex h-full w-full" onClick={() => handleSuggestionClick(card)}>
                            <img
                                src={card?.card_images[0].image_url}
                                //alt={suggestion}
                                className="h-full object-contain"
                            />
                        </div>
                    ))}         
                </div>
            ) : searchTerm === "" ? (
                <>
                </>
            ) : (
                <>
                </>
            )}
        </main>
    )
}   

export default GalleryViewSearchSuggestionsComponent