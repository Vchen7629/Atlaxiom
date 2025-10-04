import { useEffect, useState } from "react";
import { PageSelectorComponent } from "../buttons/addcardpageselector.tsx";
import { Pagination } from "../../../components/cardcollectioncomponents/types/addcardtypes.ts";
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
            let page = parseInt(value, 10) || 0;

            if (page < 0) {
                page = 1;
            } else if (page > totalPages) {
                page = totalPages;
            }

            handleListPageChange(page);
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
    }

    return (
        <div className="py-2 px-2 bg-[hsl(var(--background1))]">
            {totalPages > 1 && (
                <div className="flex flex-col lg:flex-row w-full items-center space-y-[2vh] lg:space-y-0 lg:items-start justify-between ">
                    <section className="flex items-center h-full space-x-2 py-1"> 
                        <span className="text-lg text-[hsl(var(--text))]">Page</span> 
                        <input
                            className="bg-transparent focus:outline-none w-10 text-center text-lg text-[hsl(var(--text))] border-b-2 border-[hsl(var(--background3))]"
                            placeholder={String(currentPage)}
                            value={currentPage}
                            onChange={handleListInputChange}
                        />
                        <span className="text-lg text-[hsl(var(--text))]">of {totalPages}</span>
                    </section>
                    <PageSelectorComponent pageselectorprops={pageselectorprops}/>
                </div>
                
            )}
        </div>
    )

    
}

export default AddCardPaginationComponent