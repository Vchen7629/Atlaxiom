import { GalleryViewComp } from "../types/searchbarcomponentstypes";


const GalleryViewSearchSuggestionsComponent = ({ galleryviewprops }: GalleryViewComp) => {
    const {
        cardData,
        setCardName,
        setClickedOnCard,
        currentPageGalleryNamesArray,
        setTotalGalleryNamesArray,
        setSelectedCardData,
        setErrorMessage,
        totalGalleryPages,
        currentGalleryPage,
        setGalleryCurrentPage,
        setCardSets,
        cardSets
    } = galleryviewprops

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    const handleSuggestionClick = (card: string) => {
        setCardName(card);
        setClickedOnCard(true);
        setErrorMessage("");
        setTotalGalleryNamesArray([]);
        setSelectedCardData(null);
        fetchSelectedCardData(card);
    };

    const handlePageChange = (page: number) => {
        setGalleryCurrentPage(page);
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
            {totalGalleryPages > 1 && (
                <div className="flex w-full justify-center ">
                    <div className="w-[20%] mt-[30px] p-1.25 flex justify-center  text-goldenrod text-center text-xl">
                        <button className="bg-goldenrod text-white w-[30px] mr-[5%] rounded-lg hover:text-red-600" disabled={currentGalleryPage === 1} onClick={() => handlePageChange(currentGalleryPage - 1)}>
                            {'<'}
                        </button>
                        <span>{`Page ${currentGalleryPage} of ${totalGalleryPages}`}</span>
                        <button className="bg-goldenrod text-white w-[30px] ml-[5%] rounded-lg hover:text-red-600" disabled={currentGalleryPage === totalGalleryPages} onClick={() => handlePageChange(currentGalleryPage + 1)}>
                            {'>'}
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}   

export default GalleryViewSearchSuggestionsComponent