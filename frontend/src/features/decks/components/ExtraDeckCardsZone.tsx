import { useDroppable } from "@dnd-kit/core"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { handleDecreaseCardOwnedAmount, handleDeleteCardClick, handleIncreaseCardOwnedAmount } from "../buttons/EditDeckCardButtons"
import { ExtraDeckProps } from "../types/carddropzonetypes"
import { UpdatedCard } from "../types/buttontypes"
import GridListView from "@/shared/buttons/gridOrListView"

const ExtraDeckCardZone = ({ extradeckprops }: ExtraDeckProps) => {
  const {
    deckData,
    extraDeckCards, setExtraDeckCards,
    hoveredCard,
    setModifyExtraDeckCardAmountPlaceHolder,
    setCardsToDeleteExtraDeckPlaceHolder,
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
            <span className="hidden md:flex w-[10vw] font-black items-center">Extra Deck</span>
            <div className="flex h-fit items-center justify-between w-full space-x-4">
                <div className="font-bold flex">Total Extra Deck Cards: {deckData?.total_cards_extra_deck}</div>
                <div className='flex w-20 bg-footer rounded-xl'>
                    <GridListView filterProps={filterProps}/>
                </div>
            </div>
        </header>
        {listView && (
          <div className="flex bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-xl">
            <section
              ref={setNodeRef}
              className={`flex flex-col w-full pt-[2vh] pl-[0.5vw] relative ${shouldExtraDeckBlur ? "border-2 border-goldenrod rounded-lg" : ""}`}
            >
              {shouldExtraDeckBlur && (
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Card To Extra Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldExtraDeckBlur ? "blur-sm" : "" }`}>
                {extraDeckCards.length > 0 && (
                  <div className="w-full h-full flex flex-col space-y-2 pl-2">
                    {extraDeckCards.map((card: UpdatedCard) => (
                      <div
                        key={card?.id || card?._id}
                        className="flex h-[5vh] items-center space-x-2"
                      >
                        <span className="text-gray-500">{card?.cardInDeckOwnedAmount}</span>
                        <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          alt={card?.name || card?.card_name}
                          className="h-full object-contain"
                        />
                        <span className="font-black text-[hsl(var(--text))] text-sm w-[70%]">{card?.name || card?.card_name}</span>
                        <div className="flex space-x-1">
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleIncreaseCardOwnedAmount(card, setExtraDeckCards, setModifyExtraDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faPlus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleDecreaseCardOwnedAmount(card, setExtraDeckCards, setModifyExtraDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faMinus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                            onClick={(event) => {
                              event.stopPropagation(); 
                              handleDeleteCardClick(card, setExtraDeckCards, setModifyExtraDeckCardAmountPlaceHolder, setCardsToDeleteExtraDeckPlaceHolder);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash}/>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {galleryView && (
          <div className="flex bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-xl">
            <section 
              ref={setNodeRef} 
              className={`flex flex-col w-full pt-[2vh] pl-[0.5vw] relative ${shouldExtraDeckBlur ? "border-2 border-goldenrod rounded-lg" : ""}`}
            >
              {shouldExtraDeckBlur && (
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Card To Extra Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldExtraDeckBlur ? "blur-sm" : "" }`}>
                {extraDeckCards.length > 0 && ( 
                      <div 
                        className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                        style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                      >
                        {extraDeckCards.map((card: UpdatedCard) => (
                              <div key={card.id} className="flex flex-col group relative items-center space-y-2">
                                <label className="bg-[hsl(var(--background3))] font-bold text-[hsl(var(--text))] px-2 text-xs rounded-2xl">{card?.cardInDeckOwnedAmount}x</label>
                                <img
                                  src={card?.image_url || card?.card_images?.[0]?.image_url}
                                  className="h-full object-contain"
                                  alt={card.name}
                                />
                                <div className="absolute inset-0 flex items-center justify-center top-[10%] h-[70%] bg-black bg-opacity-50 text-white text-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {card.name}
                                </div>
                                <div className="flex space-x-1">
                                  <button 
                                    className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                    onClick={() => {handleIncreaseCardOwnedAmount(card, setExtraDeckCards, setModifyExtraDeckCardAmountPlaceHolder)}}
                                  >
                                    <FontAwesomeIcon className="fa-xs" icon={faPlus}/>
                                  </button>
                                  <button 
                                    className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                    onClick={() => {handleDecreaseCardOwnedAmount(card, setExtraDeckCards, setModifyExtraDeckCardAmountPlaceHolder)}}
                                  >
                                    <FontAwesomeIcon className="fa-xs" icon={faMinus}/>
                                  </button>
                                  <button 
                                    className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-red-400'
                                    onClick={(event) => {
                                      event.stopPropagation(); 
                                      handleDeleteCardClick(card, setExtraDeckCards, setModifyExtraDeckCardAmountPlaceHolder, setCardsToDeleteExtraDeckPlaceHolder);
                                    }}
                                  >
                                    <FontAwesomeIcon className="fa-xs" icon={faTrash}/>
                                  </button>
                                </div>
                              </div>
                        ))}
                      </div>
                  )}
              </div>
            </section>
          </div>
        )}
    </section>
  )
}

export default ExtraDeckCardZone