import { AllCardsDisplayCompProps } from "../types/sidebarcomponenttypes"

const AllCardsSearchResultsDisplayComponent = ({ AllCardsDisplayCompProps }: AllCardsDisplayCompProps) => {
    const {
        listView,
        allCardsListResults,
        allCardsCurrentListResults,
        galleryView,
        allCardsGalleryResults,
        allCardsCurrentGalleryResults,
        //allCardsData,
    } = AllCardsDisplayCompProps

    return (
        <>
        {listView && (
            <main className="flex w-full h-full">
                {allCardsListResults.length > 0 ? (
                    <div>
                        {allCardsCurrentListResults.map((card) => (
                            <div key={card.id} className="flex h-[12.4%] w-full">
                                <img 
                                    src={card.card_images?.[0]?.image_url} 
                                    className='"h-full object-contain'
                                />
                                <div className="flex flex-col ml-2">
                                    <div className="font-black">{card.name}</div>
                                    <div className="overflow-y-auto text-sm text-gray-300">{card.desc || "No description available"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full h-full justify-center items-center font-black">
                        Enter a card Name to find cards
                    </div>
                )}
            </main>
        )}

        {galleryView && (
            <main className="flex w-full h-full">
            {allCardsGalleryResults.length > 0 ? (
                <div 
                    className="grid grid-cols-4 gap-2 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                >
                     {allCardsCurrentGalleryResults.map((card) => (
                         <div key={card.id} className="flex h-full w-full">
                             <img 
                                src={card.card_images?.[0]?.image_url} 
                                className='"h-full object-contain'
                             />
                        
                         </div>
                     ))}
                 </div>
            ) : (
                <div className="flex w-full h-full justify-center items-center font-black">
                    Enter a card Name to find cards
                </div>
            )}
         </main>
        )}


        </>
    )
}

export default AllCardsSearchResultsDisplayComponent