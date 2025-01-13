import { useDroppable } from "@dnd-kit/core"
import GridListViewComponent from "../decksidebar/gridlistviewcomponent"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

const ExtraDeckCardZone = ({ extradeckprops }: any) => {
  const {
    //deck,
    extraDeckCards, setExtraDeckCards,
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

  const handleIncreaseCardOwnedAmount = (cardToIncrease: any, setCard: React.Dispatch<React.SetStateAction<any[]>>) => {
    setCard((prevCard: any) => {
      const updatedCard = prevCard.map((card: any) => {
        if ((card._id || card.id) === (cardToIncrease._id || cardToIncrease.id)) {
          return { 
            ...card, 
            cardInDeckOwnedAmount: Math.min((card.cardInDeckOwnedAmount || 0) + 1, 3)
          } 
        } else {
          return card;
        } 
      });
      return updatedCard;
    })
  }

  const handleDecreaseCardOwnedAmount = (cardToDecrease: any, setCard: React.Dispatch<React.SetStateAction<any[]>>) => {
    setCard((prevCard: any) => {
      const updatedCard = prevCard.map((card: any) => {
        if ((card._id || card.id) === (cardToDecrease._id || cardToDecrease.id)) {
          return { 
            ...card, 
            cardInDeckOwnedAmount: Math.max((card.cardInDeckOwnedAmount || 0) - 1, 0)
          } 
        } else {
          return card;
        } 
      }).filter((card: any) => card.cardInDeckOwnedAmount > 0);
      return updatedCard;
    })
  }

  const handleDeleteCardClick = (cardToDelete: any) => {
    setExtraDeckCards((prevCards: any) => 
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
                    {extraDeckCards.map((card: any) => (
                      <div
                        key={card?.id || card?._id}
                        className="flex h-[5vh] items-center space-x-2"
                      >
                        <span className="text-gray-500">{card?.cardInDeckOwnedAmount}</span>
                        <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          className="h-full object-contain"
                        />
                        <div className="font-black text-sm w-[70%]">{card?.name || card?.card_name}</div>
                        <div className="flex space-x-1">
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleIncreaseCardOwnedAmount(card, setExtraDeckCards)}}
                          >
                            <FontAwesomeIcon icon={faPlus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleDecreaseCardOwnedAmount(card, setExtraDeckCards)}}
                          >
                            <FontAwesomeIcon icon={faMinus}/>
                          </button>
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
                      className="grid grid-cols-8 gap-4 w-full h-full p-4 justify-items-start items-start"  
                      style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                    >
                      {extraDeckCards.map((card: any) => (
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
              </div>
            </section>
          </div>
        )}
    </section>
  )
}

export default ExtraDeckCardZone