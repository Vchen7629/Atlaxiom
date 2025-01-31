import { useEffect, useState } from "react";
import { PageSelectorComponent } from "./addcardpageselector.tsx";
import { Pagination } from "../types/addcardtypes.ts";
import { mappedCard } from "../types/buttontypes.ts";

const AddCardPaginationComponent = ({ paginationprops }: Pagination) => {
    const {
        filteredCards,
        currentPage, setCurrentPage,
        cardsPerPage,
        totalPages,
        UpdateTotalPages,
        setCurrentCards,
    } = paginationprops
    
    const [, setPage] = useState(currentPage);
    const [err, setErr] = useState<string>("")


    function updateCurrentPageList() {
        if (filteredCards.length > 0) {
            const startIndex = (currentPage - 1) * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;
            const currentCards = filteredCards.slice(startIndex, endIndex) as mappedCard[];
            setCurrentCards(currentCards);
        }
    };

    function handleListPageChange(page: number) {
        setCurrentPage(page);        
    };

    function handleListInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            const page = parseInt(value, 10);
            setPage(page || 0);
            if (page >= 1 && page <= totalPages) {
                handleListPageChange(page);
                setErr("")
            } else {
                setErr(`Enter a page number between 1 and ${totalPages}`)
            }
        }
    };

    useEffect(() => {
        UpdateTotalPages(filteredCards.length);
        if (filteredCards.length > 0) {
            updateCurrentPageList();
        } else if ((filteredCards.length === 0)) {
            setCurrentCards([]);
        }
    }, [filteredCards.length, cardsPerPage, currentPage]);

    const pageselectorprops = {
        currentPage, setCurrentPage,
        setPage,
        totalPages,
        setErr,
    }

    return (
        <div className="py-2 px-2 bg-[hsl(var(--background1))]">
            {totalPages > 1 && (
                <div className="flex w-full justify-between ">
                    <section className="flex items-center h-full space-x-2"> 
                        <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                        <input
                            className="bg-transparent focus:outline-none w-10 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]"
                            placeholder={String(currentPage)}
                            value={currentPage}
                            onChange={handleListInputChange}
                        />
                        <span className="text-lg text-[hsl(var(--text))]">of {totalPages}</span>
                        {err && (
                            <span className="text-red-500 text-xs">{err}</span>
                        )}
                    </section>
                    <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                </div>
            )}
        </div>
    )

    
}

export default AddCardPaginationComponent