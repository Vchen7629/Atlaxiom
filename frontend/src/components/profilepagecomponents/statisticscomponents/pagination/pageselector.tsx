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
        setListErr,
        setGalleryErr,
    } = pageselectorprops

    const handleListPageChange = (page: number) => {
        setListCurrentPage(page);
        setListPage(page); 
        setListErr("")       
    };

    const handleGalleryPageChange = (page: number) => {
        setGalleryCurrentPage(page);
        setGalleryPage(page);  
        setGalleryErr("");      
    };

    return (
        <div className="flex w-fit text-center space-x-2">
            {listView && (
                <>
                    <button className="text-white px-1 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentListPage === 1} onClick={() => {handleListPageChange(currentListPage - 1)}}>
                        {'<<'}
                    </button>
                    {Array.from({ length: Math.min(3, totalListPages) }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`px-2 py-1 rounded-lg border-[1px] ${
                                    currentListPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-white border-gray-400'
                                } hover:border-[hsl(var(--background3))]`}
                                onClick={() => handleListPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    {totalListPages > 3 && <span className=" px-1 py-1 text-bottom flex">...</span>}

                    {totalListPages > 10 &&
                        Array.from({ length: 3 }, (_, index) => {
                            const pageNumber = currentListPage - 1 + index;
                            if (pageNumber > 4 && pageNumber < totalListPages) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`px-2 py-1 rounded-lg border-[1px] ${
                                            currentListPage === totalListPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-white border-gray-400'
                                        } hover:border-[hsl(var(--background3))]`}
                                        onClick={() => handleListPageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            }
                            return null;
                        })}


                    {totalListPages > 3 && (
                        <button
                            key={totalListPages}
                            className={`px-2 py-1 rounded-lg border-[1px] ${
                                currentListPage === totalListPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-white border-gray-400'
                            } hover:border-[hsl(var(--background3))]`}
                            onClick={() => handleListPageChange(totalListPages)}
                        >
                            {totalListPages}
                        </button>
                    )}
                    <button className="text-white px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentListPage === totalListPages} onClick={() => {handleListPageChange(currentListPage + 1)}}>
                        {'>>'}
                    </button>
                </>
            )}

            {galleryView && (
                <>
                    <button className="text-white px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentGalleryPage === 1} onClick={() => {handleGalleryPageChange(currentGalleryPage - 1)}}>
                        {'<<'}
                    </button>
                    {Array.from({ length: Math.min(4, totalGalleryPages) }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={`px-3 py-1 rounded-lg border-[1px] ${
                                    currentGalleryPage === pageNumber ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-white border-gray-400'
                                } hover:border-[hsl(var(--background3))]`}
                                onClick={() => handleGalleryPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    {totalGalleryPages > 9 && <span className=" px-1 py-1 text-bottom flex">...</span>}

                    {totalGalleryPages > 10 &&
                        Array.from({ length: 3 }, (_, index) => {
                            const pageNumber = currentGalleryPage - 1 + index;
                            if (pageNumber > 4 && pageNumber < totalGalleryPages) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`px-3 py-1 rounded-lg border-[1px] ${
                                            currentGalleryPage === totalGalleryPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-white border-gray-400'
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
                                currentGalleryPage === totalGalleryPages ? 'text-[hsl(var(--background3))] border-[hsl(var(--background3))]' : 'text-white border-gray-400'
                            } hover:border-[hsl(var(--background3))]`}
                            onClick={() => handleGalleryPageChange(totalGalleryPages)}
                        >
                            {totalGalleryPages}
                        </button>
                    )}
                    <button className="text-white px-2 border-[1px] border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentGalleryPage === totalGalleryPages} onClick={() => {handleGalleryPageChange(currentGalleryPage + 1)}}>
                        {'>>'}
                    </button>
                </>
            )}
        </div>
    )
}