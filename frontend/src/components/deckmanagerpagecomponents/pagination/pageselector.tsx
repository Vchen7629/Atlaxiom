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

    function PrevPageList() {
        handleListPageChange(currentListPage - 1)
    }

    function NextPageList() {
        handleListPageChange(currentListPage + 1)
    }

    function PrevPageGallery() {
        handleGalleryPageChange(currentGalleryPage - 1)
    }

    function NextPageGallery() {
        handleGalleryPageChange(currentGalleryPage + 1)
    }

    return (
        <div className="flex w-fit text-center space-x-2">
            {listView && (
                <>
                    <button 
                        className="text-[hsl(var(--text))] px-1 lg:px-2 py-1 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" 
                        disabled={currentListPage === 1} 
                        onClick={PrevPageList}
                    >
                        {'<<'}
                    </button>
                    {Array.from({ length: Math.min(4, totalListPages) }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`px-2 lg:px-3 py-1 rounded-lg border-[1px] ${
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
                        Array.from({ length: 1 }, (_, index) => {
                            const pageNumber = currentListPage + index;
                            if (pageNumber > 4 && pageNumber < totalListPages) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`px-2 lg:px-3 py-1 rounded-lg border-[1px] ${
                                            currentListPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
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
                            className={`px-2 lg:px-3 py-1 rounded-lg border-[1px] ${
                                currentListPage === totalListPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                            } hover:border-[hsl(var(--background3))]`}
                            onClick={() => handleListPageChange(totalListPages)}
                        >
                            {totalListPages}
                        </button>
                    )}
                    <button 
                        className="text-[hsl(var(--text))] px-1 lg:px-2 py-1 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" 
                        disabled={currentListPage === totalListPages} 
                        onClick={NextPageList}
                    >
                        {'>>'}
                    </button>
                </>
            )}

            {galleryView && (
                <>
                    <button 
                        className="text-[hsl(var(--text))] px-1 lg:px-2 py-1 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" 
                        disabled={currentGalleryPage === 1} 
                        onClick={PrevPageGallery}
                    >
                        {'<<'}
                    </button>
                    {Array.from({ length: Math.min(4, totalGalleryPages) }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`px-2 lg:px-3 py-1 rounded-lg border-[1px] ${
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
                        Array.from({ length: 1 }, (_, index) => {
                            const pageNumber = currentGalleryPage + index;
                            if (pageNumber > 4 && pageNumber < totalGalleryPages) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`px-2 lg:px-3 py-1 rounded-lg border-[1px] ${
                                            currentGalleryPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
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
                            className={`px-2 lg:px-3 py-1 rounded-lg border-[1px] ${
                                currentGalleryPage === totalGalleryPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-[hsl(var(--text))] border-gray-400'
                            } hover:border-[hsl(var(--background3))]`}
                            onClick={() => handleGalleryPageChange(totalGalleryPages)}
                        >
                            {totalGalleryPages}
                        </button>
                    )}
                    <button 
                        className="text-[hsl(var(--text))] px-1 lg:px-2 py-1 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" 
                        disabled={currentGalleryPage === totalGalleryPages} 
                        onClick={NextPageGallery}
                    >
                        {'>>'}
                    </button>
                </>
            )}
        </div>
    )
}