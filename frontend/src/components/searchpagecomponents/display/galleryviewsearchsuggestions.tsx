import { GalleryViewComp } from "../types/searchbarcomponentstypes";


const GalleryViewSearchSuggestionsComponent = ({ galleryviewprops }: GalleryViewComp) => {
    const {
        cardData,
        setSearchTerm,
        setClickedOnCard,
        currentPageGalleryNamesArray,
        setTotalGalleryNamesArray,
        setSelectedCardData,
        setErrorMessage,
        cardSets, setCardSets
    } = galleryviewprops

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    const handleSuggestionClick = (card: string) => {
        setSearchTerm(card);
        setClickedOnCard(true);
        setErrorMessage("");
        setTotalGalleryNamesArray([]);
        setSelectedCardData(null);
        fetchSelectedCardData(card);
    };

    const fetchSelectedCardData = async (card: string) => {
        try {
          const response = await fetch(`${apiUrl}?name=${encodeURIComponent(card)}`);
          const data = await response.json();
          console.log('Fetched data:', data);
    
          if (response.ok) {
            setSelectedCardData(data.data[0]);
            setCardSets(data.data[0].card_sets || []);
            console.log("testing Card Set Data", cardSets)
          } else {
            console.error('Error fetching card data:', data.message);
          }
        } catch  {
          console.error('Error fetching card data:', Error);
        }
    }

    return (
        <main className="w-full h-full">
            <div
                className="grid grid-cols-10 gap-4 w-full h-full p-4 justify-items-start items-start"  
                style={{ gridAutoRows: 'auto', alignContent: 'start' }}
            >
                {currentPageGalleryNamesArray.map((card) => (
                    <div key={card} className="flex h-full w-full" onClick={() => handleSuggestionClick(card)}>
                        <img
                            src={cardData.find((cards) => cards.name === card)?.card_images[0].image_url}
                            //alt={suggestion}
                            className="h-full object-contain"
                        />
                    </div>
                ))}         
            </div>
        </main>
    )
}   

export default GalleryViewSearchSuggestionsComponent