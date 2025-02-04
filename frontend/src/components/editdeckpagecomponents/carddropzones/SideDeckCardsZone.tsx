import { useDroppable } from "@dnd-kit/core"
import { useState } from "react"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { handleDecreaseCardOwnedAmount, handleDeleteCardClick, handleIncreaseCardOwnedAmount } from "../buttons/EditDeckCardButtons"
import { SideDeckProps } from "../types/carddropzonetypes"
import SubGridListViewComponent from "../draganddropitems/subgridlistviewcomp"
import { UpdatedCard } from "../types/buttontypes"

const SideDeckCardZone = ({ sidedeckprops }: SideDeckProps) => {
  const {
    deckData,
    sideDeckCards, setSideDeckCards,
    hoveredCard,
    setModifySideDeckCardAmountPlaceHolder,
    setCardsToDeleteSideDeckPlaceHolder,
  } = sidedeckprops

  const [listView, setListView] = useState(true);
  const [galleryView, setGalleryView] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: "sidedeckcard"
  })

  const shouldSideDeckBlur = isOver && hoveredCard ;

  const filterProps = {
    listView, setListView,
    galleryView, setGalleryView
  }

  return (
    <section className="flex flex-grow flex-col min-h-[30vh] w-full px-4">
        <header className="flex w-full py-[2vh] pl-[3vw] justify-between text-[hsl(var(--text))]">
            <span className="hidden md:flex w-[10vw] font-black items-center">Side Decks</span>
            <div className="flex h-fit items-center justify-between w-full space-x-4">
                <div className="font-bold">Total Side Deck Cards: {deckData?.total_cards_side_deck}</div>
                <div className='flex w-20 bg-footer rounded-xl'>
                    <SubGridListViewComponent filterProps={filterProps}/>
                </div>
            </div>
        </header>
        {listView && (
          <div className="flex flex-grow bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section
              ref={setNodeRef}
              className={`flex flex-col w-full pt-[2vh] pl-[0.5vw] relative ${shouldSideDeckBlur ? "border-2 border-goldenrod rounded-lg" : ""}`}
            >
              {shouldSideDeckBlur && (
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Card To Side Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldSideDeckBlur ? "blur-sm" : "" }`}>
                {sideDeckCards.length > 0 && (
                  <div className="w-full h-full flex flex-col space-y-2 pl-2">
                    {sideDeckCards.map((card: UpdatedCard) => (
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
                        <span className="font-black text-[hsl(var(--text))] text-sm w-[70%]">
                          {card?.name || card?.card_name}
                        </span>
                        <div className="flex space-x-1">
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleIncreaseCardOwnedAmount(card, setSideDeckCards, setModifySideDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faPlus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleDecreaseCardOwnedAmount(card, setSideDeckCards, setModifySideDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faMinus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                            onClick={(event) => {
                              event.stopPropagation(); 
                              handleDeleteCardClick(card, setSideDeckCards, setModifySideDeckCardAmountPlaceHolder, setCardsToDeleteSideDeckPlaceHolder);
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
          <div className="flex flex-grow bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section 
              ref={setNodeRef} 
              className={`flex flex-col w-full pt-[2vh] pl-[0.5vw] relative ${shouldSideDeckBlur ? "border-2 border-goldenrod rounded-lg" : ""}`}
            >
              {shouldSideDeckBlur && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                  <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Card To Side Deck</span>
                </div>
              )}
                <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldSideDeckBlur ? "blur-sm" : "" }`}>
                  {sideDeckCards.length > 0 && ( 
                    <div 
                      className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                      style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                    >  
                      {sideDeckCards.map((card: UpdatedCard) => (
                          <div key={card.id} className="flex flex-col group relative items-center space-y-2">
                            <label className="bg-[hsl(var(--background3))] font-bold text-[hsl(var(--text))] px-2 text-xs rounded-2xl">{card?.cardInDeckOwnedAmount}x</label>
                            <img
                              src={card?.image_url || card?.card_images?.[0]?.image_url}
                              alt={card.name}
                              className="h-full object-contain"                              
                            />
                            <div className="absolute inset-0 flex items-center justify-center top-[10%] h-[70%] bg-black bg-opacity-50 text-white text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {card.name}
                            </div>
                            <div className="flex space-x-1">
                              <button 
                                className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                onClick={() => {handleIncreaseCardOwnedAmount(card, setSideDeckCards, setModifySideDeckCardAmountPlaceHolder)}}
                              >
                                <FontAwesomeIcon className="fa-xs" icon={faPlus}/>
                              </button>
                              <button 
                                className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                onClick={() => {handleDecreaseCardOwnedAmount(card, setSideDeckCards, setModifySideDeckCardAmountPlaceHolder)}}
                              >
                                <FontAwesomeIcon className="fa-xs" icon={faMinus}/>
                              </button>
                              <button 
                                className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-red-400'
                                onClick={(event) => {
                                  event.stopPropagation(); 
                                  handleDeleteCardClick(card, setSideDeckCards, setModifySideDeckCardAmountPlaceHolder, setCardsToDeleteSideDeckPlaceHolder);
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

export default SideDeckCardZone