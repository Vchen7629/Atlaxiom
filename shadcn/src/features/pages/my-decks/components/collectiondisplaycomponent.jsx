const CollectionDisplayComponent = ({ CollectionDisplayCompProps }) => {
    const {
        userId,
        listView,
        galleryView,
        collectionListResults,
        collectionCurrentListResults,
        collectionGalleryResults,
        collectionCurrentGalleryResults,
        collectionCardData,
        collectionCardsName
    } = CollectionDisplayCompProps

    const allOwnedCards = collectionCardData || [];
    console.log("Fetched Cards:", collectionCardData);
    console.log("collectionCurrentListResults:", collectionCurrentListResults);
    console.log("collectionCardData:", collectionCardData);


    return (
        <>
        {listView && (
            <div className="flex w-full h-full">
                    {collectionCardData.length > 0 ? (
                        <div>
                            {collectionCurrentListResults.map((result) => (
                                <item key={result._id} className="flex h-[12.4%] w-full">
                                    <img src={result.image_url} className="h-full object-contain" />
                                    <div className="flex flex-col ml-2">
                                        <div className="font-black">{result.card_name}</div>
                                    </div>
                                </item>
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
                            <item key={result._id} className="flex h-full w-full">
                                <img src={result.image_url} className='"h-full object-contain'/>
                            </item>
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