import SearchCardGalleryViewItem from "../draganddropitems/SearchCardGalleryViewItem"
import SearchCardListViewItem from "../draganddropitems/SearchCardListViewItem"
import { AllCardsDisplayCompProps } from "../types/sidebardisplaytypes"

const AllCardsSearchResultsDisplayComponent = ({ AllCardsDisplayCompProps }: AllCardsDisplayCompProps) => {
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
                            <SearchCardListViewItem card={card} />
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
                        <SearchCardGalleryViewItem card={card} />
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