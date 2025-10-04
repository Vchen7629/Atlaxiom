import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useGetOwnedCardsQuery } from "../../../app/api-slices/ownedCardapislice";
import { useEffect, useCallback } from "react";
import { CollectionSearchbarCompProps } from "../types/searchBar";
import { GetOwnedCardsResponse } from "@/app/api-slices/types/ownedcardtypes";

const CollectionSearchBar = ({ CollectionSearchBarCompProps }: CollectionSearchbarCompProps) => {
    const {
        userId,
        listView,
        galleryView,
        collectionCardData, setCollectionCardData,
        collectionCardsName, setCollectionCardsName,
        collectionListResults, setCollectionListResults,
        collectionGalleryResults, setCollectionGalleryResults,
        collectionCurrentPage,
        setCollectionCurrentListResults,
        setCollectionCardsCurrentPage,
        collectionTotalListPage,
        collectionTotalGalleryPage,
        collectionCardsView,
        setCollectionCurrentGalleryResults,
        resultsPerGalleryPage,
        resultsPerListPage,
        maxResults,
    } = CollectionSearchBarCompProps

    const { refetch } = useGetOwnedCardsQuery(userId)

    const prefetchCollection = async () => {
        try {
            const result = await refetch();
            if (result?.data) {
                const isValidCard = (card: GetOwnedCardsResponse) => {
                    return card !== undefined && card !== null && Object.keys(card).length > 0;
                }
                const cardsToDisplay = Object.values(result.data || {}).flat().filter(isValidCard);
                setCollectionCardData(cardsToDisplay);
            } else {
                throw new Error('No data returned from prefetch.');
            }
        } catch (error) {
            setCollectionCardData([]);
            throw error;
        }
    };

    useEffect(() => {
        prefetchCollection();
    }, []);

    const DelayCollectionSearchResults = useCallback((inputValue: string) => {

        const normalizedInput = inputValue.toLowerCase().replace(/[-\s]/g, ''); 
        const filteredSuggestions = collectionCardData.filter((card) => {
            const normalizedCardName = card?.card_name?.toLowerCase().replace(/[-\s]/g, ''); 
            return normalizedCardName?.includes(normalizedInput);
        });

        setCollectionListResults(filteredSuggestions.slice(0, maxResults));
        setCollectionGalleryResults(filteredSuggestions.slice(0, maxResults));
    }, [collectionCardData, maxResults]);

    useEffect(() => {
        DelayCollectionSearchResults(collectionCardsName);
    }, [DelayCollectionSearchResults, collectionCardsName])

    useEffect(() => {
        const startListIndex = (collectionCurrentPage - 1) * resultsPerListPage;
        const endListIndex = startListIndex + resultsPerListPage;
        
        if (collectionCardsName.trim() === '') { 
            const newCurrentListResults = collectionCardData.slice(startListIndex, endListIndex);
            setCollectionCurrentListResults(newCurrentListResults);
        } else {
            const newCurrentListResults = collectionListResults.slice(startListIndex, endListIndex);
            setCollectionCurrentListResults(newCurrentListResults);
        }
        const newCurrentListResults = collectionListResults.slice(startListIndex, endListIndex);
        setCollectionCurrentListResults(newCurrentListResults);
    }, [collectionCurrentPage, collectionListResults, collectionCardData, resultsPerListPage]);

    useEffect(() => {
        const startGalleryIndex = (collectionCurrentPage - 1) * resultsPerGalleryPage;
        const endGalleryIndex = startGalleryIndex + resultsPerGalleryPage;

        if (collectionCardsName.trim() === '') { 
            const newCurrentGalleryResults = collectionGalleryResults.slice(startGalleryIndex, endGalleryIndex);
            setCollectionCurrentGalleryResults(newCurrentGalleryResults);
        } else {
            const newCurrentGalleryResults = collectionGalleryResults.slice(startGalleryIndex, endGalleryIndex);
            setCollectionCurrentGalleryResults(newCurrentGalleryResults);
        }
    }, [collectionCurrentPage, collectionGalleryResults, collectionCardData, resultsPerGalleryPage])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setCollectionCardsName(inputValue);
        setCollectionCardsCurrentPage(1);
    };

    function handleClearClick() {
        setCollectionCardsName('');
        setCollectionGalleryResults([])
        setCollectionListResults([])
    };

    function PrevPageClick() {
        setCollectionCardsCurrentPage(collectionCurrentPage - 1)
    }

    function NextPageClick() {
        setCollectionCardsCurrentPage(collectionCurrentPage + 1)
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
                            value={collectionCardsName}
                            onChange={handleInputChange}
                            placeholder="Enter Card Name"
                        />
                        {collectionCardsName && (
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
                                className={`${collectionCurrentPage === 1 ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={ collectionCurrentPage === 1} 
                                onClick={PrevPageClick}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${collectionCurrentPage === collectionTotalListPage ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={collectionCurrentPage === collectionTotalListPage} 
                                onClick={NextPageClick}>
                                    {'>'}
                                </button>
                        </div>
                    )}
                    {galleryView && (
                        <div className="flex w-full justify-between items-center rounded-md">
                            <button 
                                className={`${collectionCurrentPage === 1 ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={collectionCurrentPage === 1} 
                                onClick={PrevPageClick}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${collectionCurrentPage === collectionTotalGalleryPage ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={collectionCurrentPage === collectionTotalGalleryPage} 
                                onClick={NextPageClick}>
                                    {'>'}
                                </button>
                        </div>
                    )}
                </section>
                
            </div>
            <div className="flex w-full justify-center text-gray-500 my-2">
                {listView && collectionCardsView && collectionTotalListPage > 0 && (
                    <span>{`Page ${collectionCurrentPage} of ${collectionTotalListPage}`}</span>
                )}
                {galleryView && collectionCardsView && collectionTotalGalleryPage > 0 && (
                    <span>{`Page ${collectionCurrentPage} of ${collectionTotalGalleryPage}`}</span>
                )}
            </div>
        </div>
    )


}

export default CollectionSearchBar
