import { pageselector } from "../types/addcardtypes";

export const PageSelectorComponent = ({ pageselectorprops }: pageselector) => {
    const {
        currentPage, setCurrentPage,
        totalPages,
        setPage,
        setErr
    } = pageselectorprops

    const handleListPageChange = (page: number) => {
        setCurrentPage(page);
        setPage(page)
        setErr("")
    };

    return (
        <div className="flex w-fit text-center space-x-2">
            <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentPage === 1} onClick={() => {handleListPageChange(currentPage - 1)}}>
                {'<<'}
            </button>
            {Array.from({ length: Math.min(4, totalPages) }, (_, index) => {
                const pageNumber = index + 1;
                return (
                    <button
                        key={pageNumber}
                        className={`px-3 py-1 rounded-lg border-[1px] ${
                            currentPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                        } hover:border-[hsl(var(--background3))]`}
                        onClick={() => handleListPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {totalPages > 9 && <span className=" px-1 py-1 text-bottom text-[hsl(var(--text))] text-lg flex">...</span>}

            {totalPages > 10 &&
                Array.from({ length: 3 }, (_, index) => {
                    const pageNumber = currentPage - 1 + index;
                        if (pageNumber > 4 && pageNumber < totalPages) {
                            return (
                                <button
                                    key={pageNumber}
                                    className={`px-3 py-1 rounded-lg border-[1px] ${
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
                        className={`px-3 py-1 rounded-lg border-[1px] ${
                            currentPage === totalPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                        } hover:border-[hsl(var(--background3))]`}
                        onClick={() => handleListPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                )}
                <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentPage === totalPages} onClick={() => {handleListPageChange(currentPage + 1)}}>
                    {'>>'}
                </button>
        </div>
    )
}