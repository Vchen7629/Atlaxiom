import { useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import {  MobileAllCardsSearchbarCompProps } from "../types/searchbartypes.ts";


const AllCardsMobileSearchBarComponent = ({ AllCardsSearchBarCompProps }: MobileAllCardsSearchbarCompProps ) => {
    const {
        allMonsterCards, setAllMonsterCards,
        allCardsName, setAllCardsName,
        allCardsCurrentPage, setAllCardsCurrentPage,
        allCardsListResults, setAllCardsListResults,
        allCardsGalleryResults, setAllCardsGalleryResults,
        allCardsTotalListPages,
        allCardsTotalGalleryPages,
        resultsPerListPage,
        resultsPerGalleryPage,
        setAllCardsCurrentListResults,
        setAllCardsCurrentGalleryResults,
        setError,
        maxResults,
        listView,
        galleryView,
        allCardsView
    } = AllCardsSearchBarCompProps
    

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    async function prefetchAllCardData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
      
            if (response.ok) {
                setAllMonsterCards(data.data);
            } else {
                setError(`Error: ${data.message} card data`);
                setAllMonsterCards([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setAllMonsterCards([]);
        }
    };

    useEffect(() => {
        prefetchAllCardData();
    }, []);


    const DelayAllCardsSearchResults = useCallback((inputValue: string) => {
        if (!inputValue.trim()) {
            setAllCardsListResults([]);
            setAllCardsGalleryResults([]);
            return;
        }
    
        const normalizedInput = inputValue.toLowerCase().replace(/[-\s]/g, '');
        const filteredSuggestions = allMonsterCards.filter((card) => {
            const normalizedCardName = card.name.toLowerCase().replace(/[-\s]/g, '');
            return normalizedCardName.includes(normalizedInput);
        });
    
        setAllCardsListResults(filteredSuggestions.slice(0, maxResults));
        setAllCardsGalleryResults(filteredSuggestions.slice(0, maxResults));
    }, [allMonsterCards, maxResults]);
    

    useEffect(() => {
        DelayAllCardsSearchResults(allCardsName);
    }, [DelayAllCardsSearchResults, allCardsName]);

    useEffect(() => {
        const startListIndex = (allCardsCurrentPage - 1) * resultsPerListPage;
        const endListIndex = startListIndex + resultsPerListPage;
        const newCurrentListResults = allCardsListResults.slice(startListIndex, endListIndex);
        setAllCardsCurrentListResults(newCurrentListResults);
    }, [allCardsCurrentPage, allCardsListResults, resultsPerListPage]);

    useEffect(() => {
        const startGalleryIndex = (allCardsCurrentPage - 1) * resultsPerGalleryPage;
        const endGalleryIndex = startGalleryIndex + resultsPerGalleryPage;
        const newCurrentGalleryResults = allCardsGalleryResults.slice(startGalleryIndex, endGalleryIndex);
        setAllCardsCurrentGalleryResults(newCurrentGalleryResults);
    }, [allCardsCurrentPage, allCardsGalleryResults, resultsPerGalleryPage])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setAllCardsName(inputValue);
        setAllCardsCurrentPage(1);
    };

    function handleClearClick() {
        setAllCardsName('');
        setAllCardsGalleryResults([])
        setAllCardsListResults([])
    };

    function handlePrevPage() {
        setAllCardsCurrentPage(allCardsCurrentPage - 1)
    }

    function handleNextPage() {
        setAllCardsCurrentPage(allCardsCurrentPage + 1)
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between ">
                <section className="flex w-[60%] h-[40px] pl-2 relative bg-gray-600 justify-start text-gold rounded-lg">                      
                    <div className="flex items-center w-full">
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        <input
                            className="bg-gray-600 rounded-lg w-full h-full text-md text-white focus:outline-none"
                            type="text"
                            value={allCardsName}
                            onChange={handleInputChange}
                            placeholder="Enter Card Name"
                        />
                        {allCardsName && (
                            <button className="cursor-pointer mr-4 " onClick={handleClearClick}>
                                <FontAwesomeIcon icon={faTimes} className="fa-md" />
                            </button>
                        )}
                    </div>
                </section>
                <section className="flex w-[20%]">
                    <button className="bg-blue-400 w-full h-full rounded-md">Filter</button>
                </section>
                <section className="flex w-[18%]">
                    {listView && (
                        <div className="flex w-full justify-between items-center rounded-md">
                            <button 
                                className={`${allCardsCurrentPage === 1 ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={allCardsCurrentPage === 1} 
                                onClick={handlePrevPage}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${allCardsCurrentPage === allCardsTotalListPages ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={allCardsCurrentPage === allCardsTotalListPages} 
                                onClick={handleNextPage}>
                                    {'>'}
                                </button>
                        </div>
                    )}
                    {galleryView && (
                        <div className="flex w-full justify-between items-center rounded-md">
                            <button 
                                className={`${allCardsCurrentPage === 1 ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={allCardsCurrentPage === 1} 
                                onClick={handlePrevPage}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${allCardsCurrentPage === allCardsTotalGalleryPages ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={allCardsCurrentPage === allCardsTotalGalleryPages} 
                                onClick={handleNextPage}>
                                    {'>'}
                                </button>
                        </div>
                    )}
                </section>
                
            </div>
            <div className="flex w-full justify-center text-gray-500 my-2">
                {listView && allCardsView && allCardsTotalListPages > 0 && (
                    <span>{`Page ${allCardsCurrentPage} of ${allCardsTotalListPages}`}</span>
                )}
                {galleryView && allCardsView && allCardsTotalGalleryPages > 0 && (
                    <span>{`Page ${allCardsCurrentPage} of ${allCardsTotalGalleryPages}`}</span>
                )}
            </div>
        </div>
    )

}  

export default AllCardsMobileSearchBarComponent