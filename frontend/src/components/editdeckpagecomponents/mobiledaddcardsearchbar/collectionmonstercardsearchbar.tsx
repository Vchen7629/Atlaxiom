import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useCallback, useMemo } from "react";
import { MobileCollectionSearchbarCompProps } from "../types/searchbartypes";
import { OwnedCard } from "../types/datatypes";
import { SetCollectionGallery, SetCollectionList } from "../types/mobileaddcardsearchbartypes";

const MobileCollectionMonsterCardSearchBarComponent = ({ CollectionSearchBarCompProps }: MobileCollectionSearchbarCompProps) => {
    const {
        cardData,
        listView,
        galleryView,
        collectionMonsterCards, setCollectionMonsterCards,
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

    const filterTerms = ["Fusion", "Ritual", "Synchro", "Pendulum", "Link", "XYZ", "Spell", "Trap"]

    const memoizedCards = useMemo(() => {
        if (cardData) {
            return Object.values(cardData.entities.defaultId.ownedCards || {})
                .flat()
                .filter((card): card is OwnedCard => card !== undefined && card !== null && Object.keys(card).length > 0)
                .filter((card: any) => card.type && !filterTerms.some(term => card.type.includes(term)))
        }
        return [];
    }, [cardData]);

    useEffect(() => {
        setCollectionMonsterCards(memoizedCards);
    }, [memoizedCards]);

    useEffect(() => {
        console.log("Updated collectionMonsterCards:", collectionMonsterCards);
    }, [collectionMonsterCards]);

    const DelayCollectionSearchResults = useCallback((inputValue: string) => {

        const normalizedInput = inputValue.toLowerCase().replace(/[-\s]/g, ''); 
        const filteredSuggestions = collectionMonsterCards.filter((card: { card_name: string }) => {
            const normalizedCardName = card?.card_name?.toLowerCase().replace(/[-\s]/g, ''); 
            return normalizedCardName?.includes(normalizedInput);
        });

        setCollectionListResults(filteredSuggestions.slice(0, maxResults).map((card: SetCollectionList) => ({
            _id: card._id,
            card_name: card.card_name,
            image_url: card.image_url,
            desc: card.desc,
        })));
        setCollectionGalleryResults(filteredSuggestions.slice(0, maxResults).map((card: SetCollectionGallery) => ({
            _id: card._id,
            card_name: card.card_name,
            image_url: card.image_url,
        })));
    }, [collectionMonsterCards, maxResults]);

    useEffect(() => {
        DelayCollectionSearchResults(collectionCardsName);
    }, [DelayCollectionSearchResults, collectionCardsName])

    useEffect(() => {
        const startListIndex = (collectionCurrentPage - 1) * resultsPerListPage;
        const endListIndex = startListIndex + resultsPerListPage;
        
        if (collectionCardsName.trim() === '') { 
            const newCurrentListResults = collectionMonsterCards.slice(startListIndex, endListIndex);
            setCollectionCurrentListResults(newCurrentListResults);
        } else {
            const newCurrentListResults = collectionListResults.slice(startListIndex, endListIndex);
            setCollectionCurrentListResults(newCurrentListResults);
        }
        const newCurrentListResults = collectionListResults.slice(startListIndex, endListIndex);
        setCollectionCurrentListResults(newCurrentListResults);
    }, [collectionCurrentPage, collectionListResults, collectionMonsterCards, resultsPerListPage]);

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
    }, [collectionCurrentPage, collectionGalleryResults, collectionMonsterCards, resultsPerGalleryPage])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setCollectionCardsName(inputValue);
        setCollectionCardsCurrentPage(1);
    };

    const handleClearClick = () => {
        setCollectionCardsName('');
        setCollectionGalleryResults([])
        setCollectionListResults([])
    };

    const handlePageChange = (page: number) => {
        setCollectionCardsCurrentPage(page);
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
                                onClick={() => handlePageChange( collectionCurrentPage - 1)}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${collectionCurrentPage === collectionTotalListPage ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={collectionCurrentPage === collectionTotalListPage} 
                                onClick={() => handlePageChange(collectionCurrentPage + 1)}>
                                    {'>'}
                                </button>
                        </div>
                    )}
                    {galleryView && (
                        <div className="flex w-full justify-between items-center rounded-md">
                            <button 
                                className={`${collectionCurrentPage === 1 ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={collectionCurrentPage === 1} 
                                onClick={() => handlePageChange(collectionCurrentPage - 1)}
                            >
                                {'<'}
                            </button>
                            <button 
                                className={`${collectionCurrentPage === collectionTotalGalleryPage ? 'bg-gray-400' : 'bg-goldenrod'} h-[80%] w-[48%] rounded-md`}
                                disabled={collectionCurrentPage === collectionTotalGalleryPage} 
                                onClick={() => handlePageChange(collectionCurrentPage + 1)}>
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

export default MobileCollectionMonsterCardSearchBarComponent
