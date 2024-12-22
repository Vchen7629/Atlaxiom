import { ListViewComp } from "../types/searchbarcomponentstypes";

const ListViewSearchSuggestionsComponent = ({ listviewprops }: ListViewComp) => {
    const {
        cardData,
        setCardName,
        setClickedOnCard,
        currentPageListNamesArray,
        setTotalListNamesArray,
        setSelectedCardData,
        setErrorMessage,
        totalPages,
        currentListPage,
        setListCurrentPage,
        setCardSets,
        cardSets
    } = listviewprops   

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';


    const handleSuggestionClick = (card: string) => {
        setCardName(card);
        setClickedOnCard(true);
        setErrorMessage("");
        setTotalListNamesArray([]);
        setSelectedCardData(null);
        fetchSelectedCardData(card);
    };

    const handlePageChange = (page: number) => {
        setListCurrentPage(page);
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

    /*const filteredCards = currentListSuggestions.filter((card) => {
        if (!card || !card.card_name) return false;
        //const matchesSearchTerm = ();

        return matchesSearchTerm
    });*/

    return (
        <main className="w-[95%]">
            <div>
                {currentPageListNamesArray.map((card) => (
                    <div
                        key={card}
                        onClick={() => handleSuggestionClick(card)}
                    >
                        <div className="flex max-h-[14vh] bg-transparentt">
                            <img
                                src={cardData.find((cards) => cards.name === card)?.card_images[0].image_url}
                                //alt={suggestion}
                                className="w-[6.5%] min-w-[%]"
                            />
                            <div className="flex w-full min-h-full flex-col border-2 border-transparent hover:border-gray-500">
                                <div className="relative flex justify-between w-full">
                                    <div className="flex text-center items-center pl-[3%] w-1/2 text-goldenrod font-black text-2xl">{card}</div>
                                    <div className="flex justify-evenly items-center font-bold w-[25vw]">
                                        <div className="text-white text-xl">{cardData.find((cards) => cards.name === card)?.type}</div>
                                        <div className="text-white text-xl">{cardData.find((cards) => cards.name === card)?.race}</div>
                                        <div className="text-white text-xl">{cardData.find((cards) => cards.name === card)?.attribute}</div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-between ">
                                    <div className="w-full font-black text-gray-400 text-md max-h-[7vh] overflow-auto pl-[3%]">{cardData.find((cards) => cards.name === card)?.desc}</div>
                                        <div className="w-[30%] flex justify-between pl-[3%]">
                                        {cardData.find((cards) => cards.name === card)?.atk && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Atk:</p>{cardData.find((cards) => cards.name === card)?.atk}
                                            </div>
                                        )}
                                        {cardData.find((cards) => cards.name === card)?.def && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Def:</p>{cardData.find((cards) => cards.name === card)?.def}
                                            </div>
                                        )}
                                        {cardData.find((cards) => cards.name === card)?.level && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Level:</p>{cardData.find((cards) => cards.name === card)?.level}
                                            </div>
                                        )}
                                        {cardData.find((cards) => cards.name === card)?.scale && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Pendulum Scale:</p>{cardData.find((cards) => cards.name === card)?.scale}
                                            </div>
                                        )}
                                        {cardData.find((cards) => cards.name === card)?.linkval && (
                                            <div className="flex text-gray-300 font-black text-lg">
                                                <p className="mr-2">Link Value:</p>{cardData.find((cards) => cards.name === card)?.linkval}
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
                        <button className="bg-goldenrod text-white w-[30px] mr-[5%] rounded-lg hover:text-red-600" disabled={currentListPage === 1} onClick={() => handlePageChange(currentListPage - 1)}>
                            {'<'}
                        </button>
                        <span>{`Page ${currentListPage} of ${totalPages}`}</span>
                        <button className="bg-goldenrod text-white w-[30px] ml-[5%] rounded-lg hover:text-red-600" disabled={currentListPage === totalPages} onClick={() => handlePageChange(currentListPage + 1)}>
                            {'>'}
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default ListViewSearchSuggestionsComponent