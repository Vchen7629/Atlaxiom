import { pageselector } from "../types/addcardtypes";

export const PageSelectorComponent = ({ pageselectorprops }: pageselector) => {
    const {
        currentPage, setCurrentPage,
        totalPages,
        setPage,
    } = pageselectorprops

    function handleListPageChange(page: number) {
        setCurrentPage(page);
        setPage(page)
    };

    function handlePageDecrease() {
        setCurrentPage(currentPage - 1);
    }

    function handlePageIncrease() {
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="flex w-fit text-center space-x-2">
            <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentPage === 1} onClick={handlePageDecrease}>
                {'<<'}
            </button>

            {currentPage >= 4 && (
                <button
                    className={`px-3 py-1 rounded-lg text-xs lg:text-md border-[1px] ${
                        currentPage === 1 ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                    } hover:border-[hsl(var(--background3))]`}
                    onClick={() => handleListPageChange(1)}
                >
                    1
                </button>
            )}
            
            {currentPage < 4 &&
                Array.from({ length: 3 }, (_, index) => {
                    const pageNumber = index + 1;
                    if (currentPage < 4) {
                        return (
                            <button
                                key={pageNumber}
                                className={`px-3 py-1 text-xs lg:text-md rounded-lg border-[1px] ${
                                    currentPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                                } hover:border-[hsl(var(--background3))]`}
                                onClick={() => handleListPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    }
                    return null;
                }
                
            )}

            {totalPages > 9 && <span className=" px-1 py-1 text-bottom text-[hsl(var(--text))] text-lg flex">...</span>}

            {totalPages > 3 &&
                Array.from({ length: 2 }, (_, index) => {
                    const pageNumber = currentPage - 1 + index;
                        if (pageNumber > 3 && pageNumber < totalPages) {
                            return (
                                <button
                                    key={pageNumber}
                                    className={`px-3 py-1 text-xs lg:text-md rounded-lg border-[1px] ${
                                        currentPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                                    } hover:border-[hsl(var(--background3))]`}
                                    onClick={() => handleListPageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                    return null;
                })}


                {totalPages > 4 && (
                    <button
                        key={totalPages}
                        className={`px-3 py-1 rounded-lg text-xs lg:text-md border-[1px] ${
                            currentPage === totalPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                        } hover:border-[hsl(var(--background3))]`}
                        onClick={() => handleListPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                )}
                <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentPage === totalPages} onClick={handlePageIncrease}>
                    {'>>'}
                </button>
        </div>
    )
}