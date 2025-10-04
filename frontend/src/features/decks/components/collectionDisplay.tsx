import { CollectionDisplayCompProps } from "../types/sideBarDisplay";
import DeckBuilderSidebarCardItem from "./deckBuilderSidebarItem";

// This component is for the styling and logic of showing your card collection in the 
// deck builder sidebar
const CollectionDisplay = ({ CollectionDisplayCompProps }: CollectionDisplayCompProps) => {
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
                                    <DeckBuilderSidebarCardItem
                                        key={result._id} 
                                        card={result} 
                                        listView={listView} 
                                        galleryView={galleryView}
                                    />
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
                                <DeckBuilderSidebarCardItem
                                    key={result._id} 
                                    card={result} 
                                    listView={listView} 
                                    galleryView={galleryView}
                                />
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

export default CollectionDisplay