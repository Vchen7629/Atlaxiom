import { MobileCollectionCardsLoadingSkeleton } from "@/components/loadingcomponents/mobilecollectioncardloading";
import { CollectionDisplayCompProps } from "../types/sidebardisplaytypes";

const MobileCollectionMonsterCardDisplayComponent = ({ CollectionDisplayCompProps }: CollectionDisplayCompProps) => {
    const {
        isLoading,
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
                        <div className="flex flex-col space-y-[2vh]">
                            {collectionCurrentListResults.map((result) => (
                                <div key={result._id} className="grid grid-cols-[20%_70%_10%] max-h-[10vh] w-full bg-transparent">
                                    <img src={result.image_url} className="w-1/2 object-contain" alt={result.card_name} />
                                    <div className="flex flex-col  max-h-[10vh]">
                                        <span className="font-black text-xs text-[hsl(var(--background3))]">{result.card_name}</span>
                                        <span className="overflow-y-auto mt-1 text-xs text-[hsl(var(--text))] max-w-[95%]">
                                            {result.desc || "No description available"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isLoading ? (
                        <MobileCollectionCardsLoadingSkeleton/>
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
                                <div key={result._id} className="flex flex-col h-full w-full"> 
                                    <div className="flex items-center justify-center text-[hsl(var(--text))] text-center text-xs">
                                        {result.card_name}
                                    </div>
                                    <img src={result.image_url} alt={result.card_name} className='h-full object-contain'/>
                                </div>
                            ))}
                        </div>
                    ) : isLoading ? (
                        <MobileCollectionCardsLoadingSkeleton/>
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

export default MobileCollectionMonsterCardDisplayComponent