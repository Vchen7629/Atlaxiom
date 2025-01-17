import { useEffect, useState } from "react";
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
    const [listerr, setListErr] = useState<string>("")

    const [gallerypage, setGalleryPage] = useState(currentGalleryPage);
    const [galleryerr, setGalleryErr] = useState<string>("")

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

    const handleGalleryPageChange = (page: number) => {
        setGalleryCurrentPage(page);        
    };

    const handleGalleryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            const page = parseInt(value, 10);
            setGalleryPage(page || 0);
            if (page >= 1 && page <= totalListPages) {
                handleGalleryPageChange(page);
                setGalleryErr("")
            } else {
                setGalleryErr(`Enter a page number between 1 and ${totalListPages}`)
            }
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
        setListErr,
        setGalleryErr,
    }

    return (
        <div className="py-2 px-2 bg-[hsl(var(--background1))]">
            {listView && (
                <>
                    {totalListPages > 1 && (
                        <div className="flex w-full justify-between ">
                            <section className="flex items-center h-full space-x-2"> 
                                <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                                <input
                                    className="bg-transparent focus:outline-none w-10 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]"
                                    placeholder={String(currentListPage)}
                                    value={listpage}
                                    onChange={handleListInputChange}
                                />
                                <span className="text-lg text-[hsl(var(--text))]">of {totalListPages}</span>
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
                                    value={gallerypage}
                                    onChange={handleGalleryInputChange}
                                />
                                <span className="text-lg">of {totalGalleryPages}</span>
                                {galleryerr && (
                                    <span className="text-red-500">{galleryerr}</span>
                                )}
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