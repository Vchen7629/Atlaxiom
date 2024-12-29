import { Card } from "@/pages/my-cards/ownedcardpagetypes";
import { useEffect, useMemo } from "react";

const PaginationComponent = ({ paginationprops }: any) => {
    const { 
        listView,
        galleryView,
        searchTerm,
        ownedCards,
        currentListPage, setListCurrentPage,
        currentGalleryPage, setGalleryCurrentPage,
        suggestionsPerListPage,
        suggestionsPerGalleryPage,
        setCurrentListPageResults,
        setCurrentGalleryPageResults,
        cardTypeFilter,
        subTypeFilter,
        attributeFilter,
        archeTypeFilter,
        levelFilter,
        setFilter,
        rarityFilter,
        totalListPages,
        totalGalleryPages,
        updateTotalPages
    } = paginationprops

    const cardsToDisplay = Object.values(ownedCards?.entities?.defaultId?.ownedCards || {}).flat() as Card[];
        
    const filteredCards = useMemo(() => {
        return cardsToDisplay.filter((card): card is Card => {
            if (!card || !card.card_name) return false;
            const matchesSearchTerm = card.card_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTypeFilter = cardTypeFilter ? card.type?.toLowerCase().includes(cardTypeFilter) : true;
            const matchesSubTypeFilter = subTypeFilter ? card.race?.toLowerCase().trim() === subTypeFilter.toLowerCase().trim() : true;
            const matchesAttributeFilter = attributeFilter ? card.attribute?.toLowerCase().trim() === attributeFilter.toLowerCase().trim() : true;
            const matchesArcheTypeFilter = archeTypeFilter ? card.archetype?.toLowerCase().trim() === archeTypeFilter.toLowerCase().trim() : true;
            const matchesLevelFilter = levelFilter ? card.level === levelFilter : true;
            const matchesSetFilter = setFilter ? card.set_name?.toLowerCase().trim() === setFilter.toLowerCase().trim() : true;
            const matchesRarityFilter = rarityFilter ? card.rarity?.toLowerCase().trim() === rarityFilter.toLowerCase().trim() : true;
    
            return (
                !! matchesSearchTerm &&
                !! matchesTypeFilter &&
                !! matchesSubTypeFilter &&
                !! matchesAttributeFilter &&
                !! matchesArcheTypeFilter &&
                !! matchesLevelFilter &&
                !! matchesSetFilter &&
                !! matchesRarityFilter
            );
            
        });
    }, [
        cardsToDisplay,
        searchTerm,
        cardTypeFilter,
        subTypeFilter,
        attributeFilter,
        archeTypeFilter,
        levelFilter,
        setFilter,
        rarityFilter,
    ]);


    const updateCurrentPageList = () => {
        if (filteredCards.length > 0) {
            const startIndex = (currentListPage - 1) * suggestionsPerListPage;
            const endIndex = startIndex + suggestionsPerListPage;
            const currentListSuggestions = filteredCards.slice(startIndex, endIndex);
            setCurrentListPageResults(currentListSuggestions);
        }
    };

    const handleListPageChange = (page: number) => {
        setListCurrentPage(page);        
    };

    const updateCurrentPageGallery = () => {
        if (filteredCards.length > 0) {
            const startIndex = (currentListPage - 1) * suggestionsPerGalleryPage;
            const endIndex = startIndex + suggestionsPerGalleryPage;
            const currentGallerySuggestions = filteredCards.slice(startIndex, endIndex);
            setCurrentGalleryPageResults(currentGallerySuggestions);
        }
    };

    const handleGalleryPageChange = (page: number) => {
        setGalleryCurrentPage(page);        
    };

    useEffect(() => {
        updateTotalPages(filteredCards.length);
        if (filteredCards.length > 0) {
            updateCurrentPageList();
            updateCurrentPageGallery();
            console.log("1")
        } else if ((filteredCards.length === 0)) {
            setCurrentListPageResults([]);
            setCurrentGalleryPageResults([]);
            console.log("2")

        }
    }, [filteredCards.length, suggestionsPerListPage, suggestionsPerGalleryPage, currentListPage, currentGalleryPage]);

    return (
        <>
            {listView && (
                <div className="flex w-full justify-center ">
                    <div className=" p-1.25 flex justify-center  text-goldenrod text-center">
                        <button className="bg-goldenrod text-white w-[30px] mr-[5%] rounded-lg hover:text-red-600" disabled={currentListPage === 1} onClick={() => {handleListPageChange(currentListPage - 1)}}>
                            {'<'}
                        </button>
                        <span className="text-sm">{`Page ${currentListPage} of ${totalListPages}`}</span>
                        <button className="bg-goldenrod text-white w-[30px] mr-[5%] rounded-lg hover:text-red-600" disabled={currentListPage === totalListPages} onClick={() => {handleListPageChange(currentListPage + 1)}}>
                            {'>'}
                        </button>
                    </div>
                </div>
            )}

            {galleryView && (
                <div className="flex w-full justify-center ">
                    <div className=" p-1.25 flex justify-center  text-goldenrod text-cente">
                        <button className="bg-goldenrod text-white w-[30px] mr-[5%] rounded-lg hover:text-red-600" disabled={currentGalleryPage === 1} onClick={() => {handleGalleryPageChange(currentGalleryPage - 1)}}>
                            {'<'}
                        </button>
                        <span className="text-sm">{`Page ${currentGalleryPage} of ${totalGalleryPages}`}</span>
                        <button className="bg-goldenrod text-white w-[30px] ml-[5%] rounded-lg hover:text-red-600" disabled={currentGalleryPage === totalGalleryPages} onClick={() => {handleGalleryPageChange(currentGalleryPage - 1)}}>
                            {'>'}
                        </button>
                    </div>
                </div>
            )}
        </>
    )

    
}

export default PaginationComponent