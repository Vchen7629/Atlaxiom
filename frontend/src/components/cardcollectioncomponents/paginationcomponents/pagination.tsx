import { Card } from "@/pages/my-cards/ownedcardpagetypes";
import { useEffect, useMemo, useState } from "react";
import { PageSelectorComponent } from "./pageselector";
import { OwnedCard, Pagination } from "../types/paginationtypes";

const PaginationComponent = ({ paginationprops }: Pagination) => {
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
    
    const [listpage, setListPage] = useState(currentListPage);
    const [listerr, setListErr] = useState<string>("")


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
            const currentListSuggestions = filteredCards.slice(startIndex, endIndex) as OwnedCard[];
            setCurrentListPageResults(currentListSuggestions);
        }
    };

    const handleListPageChange = (page: number) => {
        setListCurrentPage(page);        
    };

    const handleListInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            const page = parseInt(value, 10);
            setListPage(page || 0);
            if (page >= 1 && page <= totalListPages) {
                handleListPageChange(page);
                setListErr("")
            } else {
                setListErr(`Enter a page number between 1 and ${totalListPages}`)
            }
        }
    };

    const updateCurrentPageGallery = () => {
        if (filteredCards.length > 0) {
            const startIndex = (currentListPage - 1) * suggestionsPerGalleryPage;
            const endIndex = startIndex + suggestionsPerGalleryPage;
            const currentGallerySuggestions = filteredCards.slice(startIndex, endIndex) as OwnedCard[];
            setCurrentGalleryPageResults(currentGallerySuggestions);
        }
    };

    useEffect(() => {
        updateTotalPages(filteredCards.length);
        if (filteredCards.length > 0) {
            updateCurrentPageList();
            updateCurrentPageGallery();
        } else if ((filteredCards.length === 0)) {
            setCurrentListPageResults([]);
            setCurrentGalleryPageResults([]);
        }
    }, [filteredCards.length, suggestionsPerListPage, suggestionsPerGalleryPage, currentListPage, currentGalleryPage]);

    const pageselectorprops = {
        listView,
        galleryView,
        currentListPage, setListCurrentPage,
        totalListPages,
        currentGalleryPage, setGalleryCurrentPage,
        totalGalleryPages,
    }

    return (
        <div className="py-2 px-2 bg-[hsl(var(--background1))]">
            {listView && (
                <>
                    {totalListPages > 1 && (
                        <div className="flex w-full justify-between ">
                            <section className="flex items-center h-full space-x-2"> 
                                <span className="text-lg">Page</span> 
                                <input
                                    className="bg-transparent focus:outline-none w-10 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]"
                                    placeholder={String(currentListPage)}
                                    value={listpage}
                                    onChange={handleListInputChange}
                                />
                                <span className="text-lg">of {totalListPages}</span>
                                {listerr && (
                                    <span className="text-red-500">{listerr}</span>
                                )}
                            </section>
                            <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                        </div>
                    )}
                </>
            )}

            {galleryView && (
                <>
                    {totalGalleryPages > 1 && (
                        <div className="flex w-full justify-between">
                            <section className="flex items-center h-full space-x-2"> 
                                <span className="text-lg">Page</span> 
                                <input
                                    className="bg-transparent focus:outline-none w-10 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]"
                                    placeholder={String(currentGalleryPage)}
                                ></input>
                                <span className="text-lg">of {totalGalleryPages}</span>
                            </section>
                            <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                        </div>
                    )}
                </>
            )}
        </div>
    )

    
}

export default PaginationComponent