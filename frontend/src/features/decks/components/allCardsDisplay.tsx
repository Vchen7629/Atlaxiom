import { AllCardsDisplayCompProps } from "../types/sideBarDisplay"
import DeckBuilderSidebarCardItem from "./deckBuilderSidebarItem"

const AllCardsSearchResultsDisplay = ({ AllCardsDisplayCompProps }: AllCardsDisplayCompProps) => {
    const {
        listView,
        allCardsListResults,
        allCardsCurrentListResults,
        galleryView,
        allCardsGalleryResults,
        allCardsCurrentGalleryResults,
    } = AllCardsDisplayCompProps

    return (
        <>
        {listView && (
            <main className="flex w-full h-full">
                {allCardsListResults.length > 0 ? (
                    <div className="flex flex-col space-y-2 ">
                        {allCardsCurrentListResults.map((card) => (
                            <DeckBuilderSidebarCardItem 
                                key={card.id} 
                                card={card} 
                                listView={listView} 
                                galleryView={galleryView}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex w-full h-full justify-center text-[hsl(var(--text))] items-center font-black">
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
                        <DeckBuilderSidebarCardItem 
                            key={card.id} 
                            card={card} 
                            listView={listView} 
                            galleryView={galleryView}
                        />
                     ))}
                 </div>
            ) : (
                <div className="flex w-full h-full justify-center items-center text-[hsl(var(--text))] font-black">
                    Enter a card Name to find cards
                </div>
            )}
         </main>
        )}


        </>
    )
}

export default AllCardsSearchResultsDisplay