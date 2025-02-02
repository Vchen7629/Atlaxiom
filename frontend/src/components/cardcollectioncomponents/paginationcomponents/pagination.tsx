import React, { useEffect, useState } from "react";
import { PageSelectorComponent } from "./pageselector";
import { Pagination } from "../types/paginationtypes";
import { OwnedCard } from "../types/dataStructures";

const PaginationComponent = ({ paginationprops }: Pagination) => {
    const {
        filteredCards,
        listView,
        galleryView,
        currentListPage, setListCurrentPage,
        currentGalleryPage, setGalleryCurrentPage,
        suggestionsPerListPage,
        suggestionsPerGalleryPage,
        setCurrentListPageResults,
        setCurrentGalleryPageResults,
        totalListPages,
        totalGalleryPages,
        updateTotalPages
    } = paginationprops
    
    const [listpage, setListPage] = useState(currentListPage);
    const [gallerypage, setGalleryPage] = useState(currentGalleryPage);

    function updateCurrentPageList() {
        if (filteredCards.length > 0) {
            const startIndex = (currentListPage - 1) * suggestionsPerListPage;
            const endIndex = startIndex + suggestionsPerListPage;
            const currentListSuggestions = filteredCards.slice(startIndex, endIndex) as OwnedCard[];
            setCurrentListPageResults(currentListSuggestions);
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
            
            if (page < 0) {
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
            const currentGallerySuggestions = filteredCards.slice(startIndex, endIndex) as OwnedCard[];
            setCurrentGalleryPageResults(currentGallerySuggestions);
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
        updateTotalPages(filteredCards.length);
        if (filteredCards.length > 0) {
            updateCurrentPageList();
            updateCurrentPageGallery();
        } else if ((filteredCards.length === 0)) {
            setCurrentListPageResults([]);
            setCurrentGalleryPageResults([]);
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
        <div className="flex flex-col py-2 px-2 w-full bg-[hsl(var(--background1))]">
            <div className="hidden md:flex space-x-[1vw] w-full justify-between">
                <section className="items-center flex h-full space-x-2"> 
                    <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                    <input
                        className={`bg-transparent focus:outline-none ${listView ? "flex" : "hidden"} w-10 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentListPage || 1)}
                        value={listpage}
                        onChange={handleListInputChange}
                    />
                    <input
                        className={`bg-transparent focus:outline-none ${galleryView ? "flex" : "hidden"} w-10 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentGalleryPage || 1)}
                        value={gallerypage}
                        onChange={handleGalleryInputChange}
                    />
                    <span className={`text-lg ${listView ? "flex" : "hidden"} text-[hsl(var(--text))]`}>of {totalListPages || 1}</span>
                    <span className={`text-lg ${galleryView ? "flex" : "hidden"} text-[hsl(var(--text))]`}>of {totalGalleryPages || 1}</span>
                </section>
                <PageSelectorComponent pageselectorprops={pageselectorprops}/>
            </div>
            <div className={`${totalListPages > 2 ? "flex flex-col space-y-[2vh]" : "flex"} w-full flex md:hidden items-center h-full justify-between`}>
                <section className="flex items-center h-full space-x-2"> 
                    <span className="text-sm md:text-md text-[hsl(var(--text))]">Page</span> 
                    <input
                        className={`bg-transparent focus:outline-none ${listView ? "flex" : "hidden"} w-10 text-center text-sm text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentListPage || 1)}
                        value={listpage}
                        onChange={handleListInputChange}
                    />
                    <input
                        className={`bg-transparent focus:outline-none ${galleryView ? "flex" : "hidden"} w-10 text-center text-sm text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentGalleryPage || 1)}
                        value={gallerypage}
                        onChange={handleGalleryInputChange}
                    />
                    <span className={`text-sm ${listView ? "flex" : "hidden"} text-[hsl(var(--text))]`}>of {totalListPages || 1}</span>
                    <span className={`text-sm ${galleryView ? "flex" : "hidden"} text-[hsl(var(--text))]`}>of {totalGalleryPages || 1}</span>
                </section>
                <PageSelectorComponent pageselectorprops={pageselectorprops}/>
            </div>
        </div>
    )

    
};

export default PaginationComponent