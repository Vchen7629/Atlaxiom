import { useDroppable } from "@dnd-kit/core"
import GridListViewComponent from "../decksidebar/gridlistviewcomponent"
import { useState } from "react"

const ExtraDeckCardZone = ({ extradeckprops }: any) => {
  const {
    //deck,
    extraDeckCards,
    hoveredCard
  } = extradeckprops

  const [listView, setListView] = useState(true);
  const [galleryView, setGalleryView] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: "extradeckcard"
  })

  const shouldExtraDeckBlur = isOver && hoveredCard && ["Synchro Monster", "Fusion Monster", "XYZ Monster"].some(
    (type) => hoveredCard.type?.includes(type)
  );

  const filterProps = {
    listView, setListView,
    galleryView, setGalleryView
  }

  return (
    <section className="flex flex-grow flex-col justify-between min-h-[30vh] w-full px-4">
        <header className="flex w-full py-[2vh] pl-[3vw] justify-between text-[hsl(var(--text))]">
            <span className="flex font-black items-center">Extra Deck</span>
            <div className="flex h-fit items-center space-x-4">
                {/*<div className="font-bold">Total Extra Deck Cards: {deck?.total_cards_extra_deck}</div>*/}
                <div className="font-bold">Total Extra Deck Cards: {extraDeckCards.length}</div>
                <div className='flex w-20 bg-footer rounded-xl'>
                    <GridListViewComponent filterProps={filterProps}/>
                </div>
            </div>
        </header>
        {listView && (
          <div className="flex bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-xl">
            <section
              ref={setNodeRef}
              className={`flex flex-col w-full pt-[1.5vh] pl-[0.4vw] relative group transition-all duration-300 ${
                shouldExtraDeckBlur ? "blur-sm border-2 border-goldenrod rounded-tl-lg rounded-bl-lg" : ""
              }`}
            >
              {extraDeckCards.length > 0 && (
                <div className="w-full h-full flex flex-col space-y-2 pl-2">
                  {extraDeckCards.map((card: any) => (
                    <div
                      key={card?.id || card?._id}
                      className="flex h-[5vh] items-center space-x-2"
                    >
                      <img
                        src={card?.card_images?.[0]?.image_url || card?.image_url}
                        className="h-full object-contain"
                      />
                      <div className="font-black text-md">
                        {card?.name || card?.card_name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {galleryView && (
          <div className="flex bg-deckpage w-full h-[90%] rounded-lg">
            <section ref={setNodeRef} className="flex flex-col w-full">
              {extraDeckCards.length > 0 && ( 
                  <div 
                    className="grid grid-cols-8 gap-2 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {extraDeckCards.map((card: any) => (
                      <div className="flex h-full">
                          <div key={card.id} className="flex h-[25%] space-x-2 bg-gray-200">
                            <img
                              src={card?.image_url || card?.card_images?.[0]?.image_url}
                              className="h-full object-contain"
                              //alt={card.card_name}
                            />
                          </div>
                      </div>
                    ))}
                  </div>
              )}
            </section>
          </div>
        )}
    </section>
  )
}

export default ExtraDeckCardZone