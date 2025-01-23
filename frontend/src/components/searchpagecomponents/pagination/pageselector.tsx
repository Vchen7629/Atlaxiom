import { pageselector } from "../types/paginationtypes.ts";

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

    const handleListPageChange = (page: number) => {
        setListCurrentPage(page);
        setListPage(page)
    };

    const handleGalleryPageChange = (page: number) => {
        setGalleryCurrentPage(page);
        setGalleryPage(page);        
    };

    return (
        <div className="flex w-fit text-center space-x-2">
            {listView && (
                <>
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] font-bold border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentListPage === 1} onClick={() => {handleListPageChange(currentListPage - 1)}}>
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

                    {totalListPages > 9 && <span className=" px-1 py-1 text-bottom text-lg flex text-[hsl(var(--text))]">...</span>}


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
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] font-bold border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentListPage === totalListPages} onClick={() => {handleListPageChange(currentListPage + 1)}}>
                        {'>>'}
                    </button>
                </>
            )}

            {galleryView && (
                <>
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] font-bold border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentGalleryPage === 1} onClick={() => {handleGalleryPageChange(currentGalleryPage - 1)}}>
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

                    {totalGalleryPages > 9 && <span className=" px-1 py-1 text-bottom text-lg text-[hsl(var(--text))] flex">...</span>}


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
                    <button className="text-[hsl(var(--text))] px-2 border-[1px] font-bold border-gray-400 rounded-lg hover:border-[hsl(var(--background3))] disabled:text-gray-400 disabled:hover:border-gray-400" disabled={currentGalleryPage === totalGalleryPages} onClick={() => {handleGalleryPageChange(currentGalleryPage + 1)}}>
                        {'>>'}
                    </button>
                </>
            )}
        </div>
    )
}