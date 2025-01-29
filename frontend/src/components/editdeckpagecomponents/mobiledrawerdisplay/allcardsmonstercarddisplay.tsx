import { MobileCollectionCardsLoadingSkeleton } from "@/components/loadingcomponents/mobilecollectioncardloading";
import { AllCardsDisplayCompProps } from "../types/sidebardisplaytypes";

const MobileAllCardsMonsterCardDisplayComponent = ({ AllCardsDisplayCompProps }: AllCardsDisplayCompProps) => {
    const {
        isLoading,
        listView,
        allCardsListResults,
        allCardsCurrentListResults,
        galleryView,
        allCardsGalleryResults,
        allCardsCurrentGalleryResults,
        //setMonsterCards
    } = AllCardsDisplayCompProps

    console.log(allCardsCurrentListResults)

    return (
        <>
            {listView && (
                <div className="flex w-full h-full">
                    {allCardsListResults.length > 0 ? (
                        <div className="flex flex-col space-y-[2vh]">
                            {allCardsCurrentListResults.map((card) => (
                                <div key={card._id} className="grid grid-cols-[20%_70%_10%] max-h-[10vh] w-full bg-[hsl(var(--background1))]">
                                    <img
                                        src={card.card_images?.[0]?.image_url}
                                        className="w-[60%] object-contain"
                                        alt={card.name}
                                    />
                                    <div className="flex flex-col  max-h-[10vh]">
                                        <span className="font-black text-xs text-[hsl(var(--background3))]">{card.name}</span>
                                        <span className="overflow-y-auto mt-1 text-xs text-[hsl(var(--text))] max-w-[95%]">
                                            {card.desc || "No description available"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isLoading ? (
                        <MobileCollectionCardsLoadingSkeleton/>
                    ) : (
                        <div className="flex w-full h-[30vh] text-[hsl(var(--text))] justify-center items-center font-black">
                           Enter a card Name to find cards
                        </div> 
                    )}
                </div>
            )}
            
            {galleryView && (
                <div className="flex h-full">
                    {allCardsGalleryResults.length > 0 ? (
                        <div 
                            className="grid grid-cols-4 gap-2 w-full p-4 justify-items-start items-start"  
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {allCardsCurrentGalleryResults.map((card) => (
                                <div key={card._id} className="flex flex-col h-full w-full"> 
                                    <img src={card.card_images?.[0]?.image_url} alt="Search Result monster Cards" className='h-3/4 object-contain'/>
                                </div>
                            ))}
                        </div>
                    ) : isLoading ? (
                        <MobileCollectionCardsLoadingSkeleton/>
                    ) : (
                        <div className="flex w-full h-[30vh] text-[hsl(var(--text))] justify-center items-center font-black">
                           Enter a card Name to find cards
                        </div> 
                    )}
                </div>
            )}
        </>

        
    )
}

export default MobileAllCardsMonsterCardDisplayComponent