import { useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import debounce from 'lodash/debounce';


const AllCardsSearchBarComponent = ({ AllCardsSearchBarCompProps }) => {
    const {
        allCardsCurrentPage,
        setAllCardsCurrentPage,
        allCardsTotalListPages,
        allCardsTotalGalleryPages,
        resultsPerListPage,
        resultsPerGalleryPage,
        allCardsData,
        setAllCardsData,
        allCardsName,
        setAllCardsName,
        allCardsListResults,
        setAllCardsListResults,
        allCardsGalleryResults,
        setAllCardsGalleryResults,
        error,
        setError,
        allCardsCurrentListResults,
        setAllCardsCurrentListResults,
        allCardsCurrentGalleryResults,
        setAllCardsCurrentGalleryResults,
        maxResults,
        listView,
        galleryView,
        allCardsView
    } = AllCardsSearchBarCompProps
    

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    const prefetchAllCardData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
      
            if (response.ok) {
              setAllCardsData(data.data);
              setError(null);
              console.log("prefetch")
            } else {
              setError(`Error: ${data.message} card data`);
              setAllCardsData([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
            setAllCardsData([]);
        }
    };

    useEffect(() => {
        prefetchAllCardData();
    }, []);


    const DelayAllCardsSearchResults = useCallback(
        debounce((inputValue) => {
            if (!inputValue.trim()) {
                setAllCardsListResults([]);
                return;
        }

        const normalizedInput = inputValue.toLowerCase().replace(/[-\s]/g, ''); 
        const filteredSuggestions = allCardsData.filter((card) => {
            const normalizedCardName = card.name.toLowerCase().replace(/[-\s]/g, ''); 
            return normalizedCardName.includes(normalizedInput);
        });

        setAllCardsListResults(filteredSuggestions.slice(0, maxResults).map((card) => card.name));
        setAllCardsGalleryResults(filteredSuggestions.slice(0, maxResults).map((card) => card.name));
        }, 500),
        [allCardsData]
    );

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

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setAllCardsName(inputValue);
        setAllCardsCurrentPage(1);
    };

    const handleClearClick = () => {
        setAllCardsName('');
        setAllCardsGalleryResults([])
        setAllCardsListResults([])
    };

    const handlePageChange = (page) => {
        setAllCardsCurrentPage(page);
    };

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
                                onClick={() => handlePageChange(allCardsCurrentPage - 1)}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${allCardsCurrentPage === allCardsTotalListPages ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={allCardsCurrentPage === allCardsTotalListPages} 
                                onClick={() => handlePageChange(allCardsCurrentPage + 1)}>
                                    {'>'}
                                </button>
                        </div>
                    )}
                    {galleryView && (
                        <div className="flex w-full justify-between items-center rounded-md">
                            <button 
                                className={`${allCardsCurrentPage === 1 ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={allCardsCurrentPage === 1} 
                                onClick={() => handlePageChange(allCardsCurrentPage - 1)}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${allCardsCurrentPage === allCardsTotalGalleryPages ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={allCardsCurrentPage === allCardsTotalGalleryPages} 
                                onClick={() => handlePageChange(allCardsCurrentPage + 1)}>
                                    {'>'}
                                </button>
                        </div>
                    )}
                </section>
                
            </div>
            <div className="flex w-full justify-center text-gray-500 mt-1">
                {listView && allCardsView && (
                    <span>{`Page ${allCardsCurrentPage} of ${allCardsTotalListPages}`}</span>
                )}
                {galleryView && allCardsView && (
                    <span>{`Page ${allCardsCurrentPage} of ${allCardsTotalGalleryPages}`}</span>
                )}
            </div>
        </div>
    )

}  

export default AllCardsSearchBarComponent