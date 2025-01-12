import { useDroppable } from "@dnd-kit/core"
import GridListViewComponent from "../decksidebar/gridlistviewcomponent"
import { useState } from "react"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SideDeckCardZone = ({ sidedeckprops }: any) => {
  const {
    deck,
    sideDeckCards, setSideDeckCards,
    hoveredCard
  } = sidedeckprops

  const [listView, setListView] = useState(true);
  const [galleryView, setGalleryView] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: "sidedeckcard"
  })

  const shouldSideDeckBlur = isOver && hoveredCard ;

  const handleDeleteCardClick = (cardToDelete: any) => {
    setSideDeckCards((prevCards: any) => 
      prevCards.filter((card: any) => {
        const cardId = card?.id || card?._id;
        const deleteCardId = cardToDelete?.id || cardToDelete?._id;
        return cardId !== deleteCardId;
      })
    );
  };

  const filterProps = {
    listView, setListView,
    galleryView, setGalleryView
  }

  return (
    <section className="flex flex-grow flex-col min-h-[30vh] w-full px-4">
        <header className="flex w-full py-[2vh] pl-[3vw] justify-between text-[hsl(var(--text))]">
            <span className="flex font-black items-center">Side Decks</span>
            <div className="flex h-fit items-center space-x-4">
                <div className="font-bold">Total Side Deck Cards: {deck?.total_cards_side_deck}</div>
                <div className='flex w-20 bg-footer rounded-xl'>
                    <GridListViewComponent filterProps={filterProps}/>
                </div>
            </div>
        </header>
        {listView && (
          <div className="flex flex-grow bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section
              ref={setNodeRef}
              className={`flex flex-col w-full pt-[1.5vh] pl-[0.4vw] relative group transition-all duration-300 ${
                shouldSideDeckBlur ? "blur-sm border-2 border-goldenrod rounded-tl-lg rounded-bl-lg" : ""
              }`}
            >
              {sideDeckCards.length > 0 && (
                <div className="w-full h-full flex flex-col space-y-2 pl-2">
                  {sideDeckCards.map((card: any) => (
                    <div
                      key={card?.id || card?._id}
                      className="flex h-[5vh] items-center space-x-2"
                    >
                      <span className="text-gray-500">x1</span>
                      <img
                        src={card?.card_images?.[0]?.image_url || card?.image_url}
                        className="h-full object-contain"
                      />
                      <div className="font-black text-sm w-[70%]">
                        {card?.name || card?.card_name}
                      </div>
                      <div className="flex space-x-1">
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faPlus}/></button>
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faMinus}/></button>
                        <button 
                          className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                          onClick={(event) => {
                            event.stopPropagation(); 
                            handleDeleteCardClick(card);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {galleryView && (
          <div className="flex flex-grow bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section 
              ref={setNodeRef} 
              className={`flex flex-col w-full pt-[1.5vh] pl-[0.4vw] relative group transition-all duration-300 ${
                shouldSideDeckBlur ? "blur-sm border-2 border-goldenrod rounded-tl-lg rounded-bl-lg" : ""
              }`}
            >
              {sideDeckCards.length > 0 && ( 
                  <div 
                    className="grid grid-cols-8 gap-4 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {sideDeckCards.map((card: any) => (
                      <div className="flex h-full">
                          <div key={card.id} className="flex">
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

export default SideDeckCardZone