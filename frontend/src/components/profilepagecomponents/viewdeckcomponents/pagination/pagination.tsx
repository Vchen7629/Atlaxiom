import { useEffect, useState } from "react";
import { PageSelectorComponent } from "./pageselector.tsx";
import { Pagination } from "../../statisticscomponents/types/paginationtypes.ts";
import { DeckApiResponse } from "@/app/api-slices/types/decktypes.ts";

const PaginationComponent = ({ paginationprops }: Pagination) => {
    const {
        filteredDecks,
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
        updateTotalListPages,
        updateTotalGalleryPages,
    } = paginationprops
    
    const [listpage, setListPage] = useState(currentListPage);
    const [gallerypage, setGalleryPage] = useState(currentGalleryPage);

    const updateCurrentPageList = () => {
        if (filteredDecks.length > 0) {
            const startIndex = (currentListPage - 1) * suggestionsPerListPage;
            const endIndex = startIndex + suggestionsPerListPage;
            const currentListSuggestions = filteredDecks.slice(startIndex, endIndex) as DeckApiResponse[];
            setCurrentListPageResults(currentListSuggestions);
        }
    };

    const handleListPageChange = (page: number) => {
        setListCurrentPage(page);        
    };

    function handleListInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
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

    const updateCurrentPageGallery = () => {
        if (filteredDecks.length > 0) {
            const startIndex = (currentGalleryPage - 1) * suggestionsPerGalleryPage;
            const endIndex = startIndex + suggestionsPerGalleryPage;
            const currentGallerySuggestions = filteredDecks.slice(startIndex, endIndex) as DeckApiResponse[];
            setCurrentGalleryPageResults(currentGallerySuggestions);
        }
    };

    const handleGalleryPageChange = (page: number) => {
        setGalleryCurrentPage(page);        
    };

    function handleGalleryInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
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
        updateTotalListPages(filteredDecks.length);
        updateTotalGalleryPages(filteredDecks.length)
        if ((filteredDecks.length === 0)) {
            setCurrentListPageResults([]);
            setCurrentGalleryPageResults([]);
        } else if (filteredDecks.length > 0) {
            updateCurrentPageList();
            updateCurrentPageGallery();
        }
    }, [filteredDecks.length, suggestionsPerListPage, suggestionsPerGalleryPage, currentListPage, currentGalleryPage]);

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
        <div className="flex py-2 px-2 w-fit bg-[hsl(var(--background1))]">
            <div className="hidden md:flex space-x-[1vw] w-full justify-evenly">
                <section className="flex items-center w-[90px] h-full space-x-2"> 
                    <span className="text-[hsl(var(--text))] text-sm">Page</span> 
                    <input
                        className={`${listView ? "flex" : "hidden"} bg-transparent focus:outline-none w-4 text-center text-sm text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentListPage || 1)}
                        value={listpage}
                        onChange={handleListInputChange}
                    />
                    <input
                        className={`${galleryView ? "flex" : "hidden"} bg-transparent focus:outline-none w-4 text-center text-sm text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentGalleryPage || 1)}
                        value={gallerypage}
                        onChange={handleGalleryInputChange}
                    />
                    <span className={`${listView ? "flex" : "hidden"} text-[hsl(var(--text))] text-sm`}> of {totalListPages || 1}</span>
                    <span className={`${galleryView ? "flex" : "hidden"} text-[hsl(var(--text))] text-sm`}> of {totalGalleryPages || 1}</span>
                </section>
                <PageSelectorComponent pageselectorprops={pageselectorprops}/>
            </div>
            <div className={`${totalListPages > 4 ? "flex flex-col" : "flex"} md:hidden space-y-[2vh] items-center space-x-[3vw] w-full`}>
                <section className="flex items-center w-full h-full space-x-2 justify-center"> 
                    <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                    <input
                        className={`${listView ? "flex" : "hidden"} bg-transparent focus:outline-none w-8 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentListPage || 1)}
                        value={listpage}
                        onChange={handleListInputChange}
                    />
                    <input
                        className={`${galleryView ? "flex" : "hidden"} bg-transparent focus:outline-none w-8 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]`}
                        placeholder={String(currentGalleryPage || 1)}
                        value={gallerypage}
                        onChange={handleGalleryInputChange}
                    />
                    <span className={`${listView ? "flex" : "hidden"} text-lg text-[hsl(var(--text))]`}> of {totalGalleryPages || 1}</span>
                    <span className={`${galleryView ? "flex" : "hidden"} text-lg text-[hsl(var(--text))]`}> of {totalGalleryPages || 1}</span>
                </section>
                <PageSelectorComponent pageselectorprops={pageselectorprops}/>
            </div>
        </div>
    )

    
}

export default PaginationComponent