import { CollectionDisplayCompProps } from "../types/sidebarcomponenttypes";

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
                        <div>
                            {collectionCurrentListResults.map((result) => (
                                <div key={result._id} className="flex h-[12.4%] w-full">
                                    <img src={result.image_url} className="h-full object-contain" />
                                    <div className="flex flex-col ml-2">
                                        <div className="font-black">{result.card_name}</div>
                                    </div>
                                </div>
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
                            <div key={result._id} className="flex h-full w-full">
                                <img src={result.image_url} className='h-full object-contain'/>
                            </div>
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