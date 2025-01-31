import { pageselector } from "../types/paginationtypes";

export const PageSelectorComponent = ({ pageselectorprops }: pageselector) => {
    const {
        listView,
        galleryView,
        setListPage,
        setGalleryPage,
        currentListPage, setListCurrentPage,
        totalListPages,
        currentGalleryPage, setGalleryCurrentPage,
        totalGalleryPages,
    } = pageselectorprops

    function handleListPageChange(page: number) {
        setListCurrentPage(page);
        setListPage(page); 
    };

    function handleGalleryPageChange(page: number) {
        setGalleryCurrentPage(page);
        setGalleryPage(page);  
    };

    function PrevPage() {
        handleListPageChange(currentListPage - 1)
    }

    function NextPage() {
        handleListPageChange(currentListPage + 1)
    }


    return (
        <div className="flex w-fit text-center space-x-2">
            {listView && (
                <>
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentListPage === 1} onClick={PrevPage}>
                        {'<<'}
                    </button>
                    {Array.from({ length: Math.min(4, totalListPages) }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`px-3 py-1 rounded-lg border-[1px] ${
                                    currentListPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                                } hover:border-[hsl(var(--background3))]`}
                                onClick={() => handleListPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    {totalListPages > 9 && <span className=" px-1 py-1 text-[hsl(var(--text))] text-lg text-bottom flex">...</span>}

                    {totalListPages > 10 &&
                        Array.from({ length: 3 }, (_, index) => {
                            const pageNumber = currentListPage - 1 + index;
                            if (pageNumber > 4 && pageNumber < totalListPages) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`px-3 py-1 rounded-lg border-[1px] ${
                                            currentListPage === totalListPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                                        } hover:border-[hsl(var(--background3))]`}
                                        onClick={() => handleListPageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            }
                            return null;
                        })}


                    {totalListPages > 4 && (
                        <button
                            key={totalListPages}
                            className={`px-3 py-1 rounded-lg border-[1px] ${
                                currentListPage === totalListPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                            } hover:border-[hsl(var(--background3))]`}
                            onClick={() => handleListPageChange(totalListPages)}
                        >
                            {totalListPages}
                        </button>
                    )}
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentListPage === totalListPages} onClick={NextPage}>
                        {'>>'}
                    </button>
                </>
            )}

            {galleryView && (
                <>
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentGalleryPage === 1} onClick={PrevPage}>
                        {'<<'}
                    </button>
                    {Array.from({ length: Math.min(4, totalGalleryPages) }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`px-3 py-1 rounded-lg border-[1px] ${
                                    currentGalleryPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                                } hover:border-[hsl(var(--background3))]`}
                                onClick={() => handleGalleryPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    {totalGalleryPages > 9 && <span className=" px-1 py-1 text-[hsl(var(--text))] text-lg text-bottom flex">...</span>}

                    {totalGalleryPages > 10 &&
                        Array.from({ length: 3 }, (_, index) => {
                            const pageNumber = currentGalleryPage - 1 + index;
                            if (pageNumber > 4 && pageNumber < totalGalleryPages) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`px-3 py-1 rounded-lg border-[1px] ${
                                            currentGalleryPage === totalGalleryPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                                        } hover:border-[hsl(var(--background3))]`}
                                        onClick={() => handleGalleryPageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            }
                            return null;
                        })}


                    {totalGalleryPages > 4 && (
                        <button
                            key={totalGalleryPages}
                            className={`px-3 py-1 rounded-lg border-[1px] ${
                                currentGalleryPage === totalGalleryPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                            } hover:border-[hsl(var(--background3))]`}
                            onClick={() => handleGalleryPageChange(totalGalleryPages)}
                        >
                            {totalGalleryPages}
                        </button>
                    )}
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentGalleryPage === totalGalleryPages} onClick={NextPage}>
                        {'>>'}
                    </button>
                </>
            )}
        </div>
    )
}