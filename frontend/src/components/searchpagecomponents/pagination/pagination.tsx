import { useEffect, useState } from "react";
import { PageSelectorComponent } from "./pageselector.tsx";
import { Pagination } from "../types/paginationtypes.ts";
import { SearchResCardData } from "../types/datastructuretypes.ts";

const PaginationComponent = ({ paginationprops }: Pagination) => {
    const { 
        filteredCards,
        listView,
        galleryView,
        currentListPage, setListCurrentPage,
        currentGalleryPage, setGalleryCurrentPage,
        suggestionsPerListPage,
        suggestionsPerGalleryPage,
        setCurrentPageListNamesArray,
        setCurrentPageGalleryNamesArray,
        totalListPages,
        totalGalleryPages,
        updateTotalListPages,
        updateTotalGalleryPages,
    } = paginationprops
    
    const [listpage, setListPage] = useState<number>(currentListPage);
    const [galleryPage, setGalleryPage] = useState<number>(currentGalleryPage);

    function updateCurrentPageList() {
        if (filteredCards.length > 0) {
            const startIndex = (currentListPage - 1) * suggestionsPerListPage;
            const endIndex = startIndex + suggestionsPerListPage;
            const currentListSuggestions = filteredCards.slice(startIndex, endIndex) as SearchResCardData[];
            setCurrentPageListNamesArray(currentListSuggestions);
        }
    };

    function handleListPageChange(page: number) {
        setListCurrentPage(page);
    };

    function handleListInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            let page = parseInt(value, 10) || 0;
            
            if (page < 1) {
                page = 1;
            } else if (page > totalListPages) {
                page = totalListPages;
            }

            setListPage(page);
            handleListPageChange(page);
        }
    };

    function updateCurrentPageGallery() {
        if (filteredCards.length > 0) {
            const startIndex = (currentGalleryPage - 1) * suggestionsPerGalleryPage;
            const endIndex = startIndex + suggestionsPerGalleryPage;
            const currentGallerySuggestions = filteredCards.slice(startIndex, endIndex) as SearchResCardData[];
            setCurrentPageGalleryNamesArray(currentGallerySuggestions);
        }
    };

    function handleGalleryPageChange(page: number) {
        setGalleryCurrentPage(page);        
    };

    function handleGalleryInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
           let page = parseInt(value, 10) || 0;

            if (page < 0) {
                page = 1;
            } else if (page > totalGalleryPages) {
                page = totalGalleryPages;
            }

            setGalleryPage(page);
            handleGalleryPageChange(page);
        }
    };

    useEffect(() => {
        updateTotalListPages(filteredCards.length);
        updateTotalGalleryPages(filteredCards.length);
        if (filteredCards.length > 0) {
            updateCurrentPageList();
            updateCurrentPageGallery();
        } else if (filteredCards.length === 0) {
            setCurrentPageListNamesArray([]);
            setCurrentPageGalleryNamesArray([]);
        }
    }, [filteredCards, suggestionsPerListPage, suggestionsPerGalleryPage, currentListPage, currentGalleryPage]);

    const pageselectorprops = {
        listView,
        galleryView,
        setListPage,
        setGalleryPage,
        currentListPage, setListCurrentPage,
        totalListPages,
        currentGalleryPage, setGalleryCurrentPage,
        totalGalleryPages,
    }

    return (
        <div className="py-2 px-2 bg-[hsl(var(--background1))]">
            {listView && totalListPages > 1 && (
                <div className="flex flex-col w-full">
                    <div className="hidden md:flex space-x-[1vw] w-full justify-between">
                        <section className="flex items-center h-full space-x-2 text-[hsl(var(--text))]"> 
                            <span className="text-lg">Page</span> 
                            <input
                                className="bg-transparent focus:outline-none w-10 text-center text-lg border-b-2 border-[hsl(var(--background3))]"
                                placeholder={String(currentListPage)}
                                value={listpage}
                                onChange={handleListInputChange}
                            />
                            <span className="text-lg">of {totalListPages}</span>
                        </section>
                        <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                    </div>
                    <div className={`${totalListPages > 4 ? "flex flex-col" : "flex"} md:hidden space-y-[2vh] items-center space-x-[3vw] w-full`}>
                        <section className="flex items-center h-full space-x-2"> 
                            <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                            <input
                                className="bg-transparent focus:outline-none w-10 text-center text-lg border-b-2 border-[hsl(var(--background3))]"
                                placeholder={String(currentListPage)}
                                value={listpage}
                                onChange={handleListInputChange}
                            />
                            <span className="text-lg">of {totalListPages}</span>
                        </section>
                        <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                    </div>
                </div>
            )}

            {galleryView && totalGalleryPages > 1 && (
                <div className="flex flex-col">
                    <div className="hidden md:flex space-x-[1vw] w-full justify-between">
                        <section className="flex items-center h-full space-x-2"> 
                            <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                            <input
                                className="bg-transparent focus:outline-none w-10 text-center text-[hsl(var(--text))] text-lg border-b-2 border-[hsl(var(--background3))]"
                                placeholder={String(currentGalleryPage)}
                                value={galleryPage}
                                onChange={handleGalleryInputChange}
                            />
                            <span className="text-lg text-[hsl(var(--text))]">of {totalGalleryPages}</span>
                        </section>
                        <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                    </div>
                    <div className={`${totalGalleryPages > 4 ? "flex flex-col" : "flex"} md:hidden space-y-[2vh] items-center space-x-[3vw] w-full`}>
                        <section className="flex items-center h-full space-x-2"> 
                            <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                            <input
                                className="bg-transparent text-[hsl(var(--text))] focus:outline-none w-10 text-center text-lg border-b-2 border-[hsl(var(--background3))]"
                                placeholder={String(currentGalleryPage)}
                                value={galleryPage}
                                onChange={handleGalleryInputChange}
                            />
                            <span className="text-lg text-[hsl(var(--text))]">of {totalGalleryPages}</span>
                         </section>
                        <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                    </div>
                </div>
            )}
        </div>
    )

    
}

export default PaginationComponent