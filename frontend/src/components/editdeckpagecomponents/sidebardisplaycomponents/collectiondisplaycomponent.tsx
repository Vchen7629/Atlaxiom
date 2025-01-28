import CollectionGalleryViewItem from "../draganddropitems/CollectionGalleryViewItem";
import CollectionListViewItem from "../draganddropitems/CollectionListViewItem";
import { CollectionDisplayCompProps } from "../types/sidebardisplaytypes";

const CollectionDisplayComponent = ({ CollectionDisplayCompProps }: CollectionDisplayCompProps) => {
    const {
        listView,
        galleryView,
        collectionListResults,
        collectionCurrentListResults,
        collectionGalleryResults,
        collectionCurrentGalleryResults,
    } = CollectionDisplayCompProps

    return (
        <>
            {listView && (
                <div className="flex w-full h-full">
                        {collectionListResults.length > 0 ? (
                            <div className="flex flex-col space-y-2">
                                {collectionCurrentListResults.map((result) => (
                                    <CollectionListViewItem key={result._id} result={result} />
                                ))}
                            </div>
                    ) : (
                        <div className="flex w-full h-full justify-center items-center font-black">
                            You have no owned Cards, Add to Collection
                        </div> 
                    )}
                </div>
            )}
            
            {galleryView && (
                <div className="flex w-full h-full">
                    {collectionGalleryResults.length > 0 ? (
                        <div 
                            className="grid grid-cols-4 gap-2 w-full h-full p-4 justify-items-start items-start"  
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {collectionCurrentGalleryResults.map((result) => (
                                <CollectionGalleryViewItem key={result._id} result={result} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex w-full h-full justify-center items-center font-black">
                            You have no owned Cards, Add to Collection
                        </div> 
                    )}
                </div>
            )}
        </>

        
    )
}

export default CollectionDisplayComponent