

const ListViewSearchSuggestionsComponent = ({ listviewprops }) => {
    const {
        cardData,
        setCardName,
        setClickedOnCard,
        currentMainSuggestions,
        setMainSuggestions,
        selectedSuggestion,
        setSelectedCardData,
        setErrorMessage,
        totalPages,
        currentPage,
        setCurrentPage,
        setCardSets,
        cardSets
    } = listviewprops   

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';


    const handleSuggestionClick = (suggestion) => {
        setCardName(suggestion);
        setClickedOnCard(true);
        setErrorMessage(null);
        setMainSuggestions([]);
        setSelectedCardData(null);
        fetchSelectedCardData(suggestion);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
    const fetchSelectedCardData = async (suggestion) => {
        try {
          const response = await fetch(`${apiUrl}?name=${encodeURIComponent(suggestion)}`);
          const data = await response.json();
    
          if (response.ok) {
            setSelectedCardData(data.data[0]);
            setCardSets(data.data[0].card_sets || []);
            console.log("testing Card Set Data", cardSets)
          } else {
            console.error('Error fetching card data:', data.message);
          }
        } catch  {
          console.error('Error fetching card data:', error);
        }
        
      }

    console.log("LIst pAge results", currentMainSuggestions)
    const filteredCards = currentMainSuggestions.filter((card) => {
        if (!card || !card.card_name) return false;
        //const matchesSearchTerm = ();

        return matchesSearchTerm
    });

    return (
        <main className="w-[95%]">
            <div>
                {currentMainSuggestions.map((suggestion) => (
                    <div
                        key={suggestion}
                        className={`${selectedSuggestion === suggestion ? 'selected' : ''}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        <div className="flex max-h-[14vh] bg-transparentt">
                            <img
                                src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url}
                                alt={suggestion}
                                className="w-[6.5%] min-w-[%]"
                            />
                            <div className="flex w-full min-h-full flex-col border-2 border-transparent hover:border-gray-500">
                                <div className="relative flex justify-between w-full">
                                    <div className="flex text-center items-center pl-[3%] w-1/2 text-goldenrod font-black text-2xl">{suggestion}</div>
                                    <div className="flex justify-evenly items-center font-bold w-[25vw]">
                                        <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.type}</div>
                                        <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.race}</div>
                                        <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.attribute}</div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-between ">
                                    <div className="w-full font-black text-gray-400 text-md max-h-[7vh] overflow-auto pl-[3%]">{cardData.find((card) => card.name === suggestion)?.desc}</div>
                                        <div className="w-[30%] flex justify-between pl-[3%]">
                                        {cardData.find((card) => card.name === suggestion)?.atk && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Atk:</p>{cardData.find((card) => card.name === suggestion)?.atk}
                                            </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.def && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Def:</p>{cardData.find((card) => card.name === suggestion)?.def}
                                            </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.level && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Level:</p>{cardData.find((card) => card.name === suggestion)?.level}
                                            </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.scale && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Pendulum Scale:</p>{cardData.find((card) => card.name === suggestion)?.scale}
                                            </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.linkval && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Link Value:</p>{cardData.find((card) => card.name === suggestion)?.linkval}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex w-full justify-center ">
                    <div className="w-[20%] mt-[30px] p-1.25 flex justify-center  text-goldenrod text-center text-xl">
                        <button className="bg-goldenrod text-white w-[30px] mr-[5%] rounded-lg hover:text-red-600" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            {'<'}
                        </button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button className="bg-goldenrod text-white w-[30px] ml-[5%] rounded-lg hover:text-red-600" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                            {'>'}
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default ListViewSearchSuggestionsComponent