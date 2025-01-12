import { useDroppable } from "@dnd-kit/core"
import GridListViewComponent from "../decksidebar/gridlistviewcomponent"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const MainDeckCardZone = ({ maindeckprops }: any) => {
  const {
    deck,
    monsterCards, setMonsterCards,
    spellCards, setSpellCards,
    trapCards, setTrapCards,
    hoveredCard
  } = maindeckprops

  const [listView, setListView] = useState(true);
  const [galleryView, setGalleryView] = useState(false);

  const { setNodeRef: MonsterCardRef, isOver: isMonsterOver } = useDroppable({
    id: "monstercard"
  })

  const shouldMonsterBlur = isMonsterOver && hoveredCard && ["Fusion", "Synchro", "XYZ", "Spell", "Trap"].every(
      (type) => !hoveredCard.type?.includes(type)
  );

  const { setNodeRef: SpellCardRef, isOver: isSpellOver } = useDroppable({
    id: "spellcard"
  })

  const shouldSpellBlur = isSpellOver && hoveredCard && hoveredCard?.type?.includes("Spell");

  const { setNodeRef: TrapCardRef, isOver: isTrapOver } = useDroppable({
    id: "trapcard"
  })

  const shouldTrapBlur = isTrapOver && hoveredCard && hoveredCard?.type?.includes("Trap");

  const handleDeleteMonsterCardClick = (cardToDelete: any) => {
    setMonsterCards((prevCards: any) => 
      prevCards.filter((card: any) => {
        const cardId = card?.id || card?._id;
        const deleteCardId = cardToDelete?.id || cardToDelete?._id;
        return cardId !== deleteCardId;
      })
    );
  };

  const handleDeleteSpellCardClick = (cardToDelete: any) => {
    setSpellCards((prevCards: any) => 
      prevCards.filter((card: any) => {
        const cardId = card?.id || card?._id;
        const deleteCardId = cardToDelete?.id || cardToDelete?._id;
        return cardId !== deleteCardId;
      })
    );
  };

  const handleDeleteTrapCardClick = (cardToDelete: any) => {
    setTrapCards((prevCards: any) => 
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
    <section className="flex flex-grow flex-col justify-between min-h-[35vh] w-full px-4">
        <header className="flex w-full py-[2vh] pl-[3vw] justify-between text-[hsl(var(--text))]">
            <span className="flex font-black items-center">Main Deck</span>
            <div className="flex h-fit items-center space-x-4">
                <div className="font-bold">Total Main Deck Cards: {deck?.total_cards_main_deck}</div>
                <div className='flex w-20 bg-footer rounded-xl'>
                    <GridListViewComponent filterProps={filterProps}/>
                </div>
            </div>
        </header>
        {listView && (
          <div className="flex bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section
              ref={MonsterCardRef}
              className={`flex flex-col w-1/3 relative group transition-all duration-300 ${
                shouldMonsterBlur ? "blur-sm border-2 border-goldenrod rounded-tl-lg rounded-bl-lg" : ""
              }`}
            >
              <span className="text-lg pl-[2vw] py-[2vh] font-black text-[hsl(var(--text))]">
                monster:
              </span>
              {monsterCards.length > 0 && (
                <div className="w-full h-full pl-[1vw] flex flex-col space-y-2">
                  {monsterCards.map((card: any) => (
                    <div
                      key={card?.id || card?._id}
                      className="flex w-full h-[5vh] items-center space-x-2"
                    >
                      <span className="text-gray-500">x1</span>
                      <img
                        src={card?.card_images?.[0]?.image_url || card?.image_url}
                        className="h-full object-contain"
                      />
                      <div className="font-black text-sm w-[55%]">{card?.name || card?.card_name}</div>
                      <div className="flex space-x-1">
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faPlus}/></button>
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faMinus}/></button>
                        <button 
                          className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                          onClick={(event) => {
                            event.stopPropagation(); 
                            handleDeleteMonsterCardClick(card);
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
            <section 
              ref={SpellCardRef} 
              className={`flex flex-col w-1/3 relative group transition-all duration-300 ${
                shouldSpellBlur ? "blur-sm border-2 border-goldenrod" : ""
              }`}
            >
              <span className="text-lg pl-[2vw] py-[2vh] font-black text-[hsl(var(--text))]">
                Spell: 
              </span>
              {spellCards.length > 0 && (
                <div className="w-full h-full pl-[1vw] flex flex-col space-y-2">
                  {spellCards.map((card: any) => (
                    <div key={card?.id || card?._id} className="flex h-[5vh] items-center space-x-2">
                      <span className="text-gray-500">x1</span>
                      <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          className="h-full object-contain"
                          //alt={card.card_name}
                      />
                      <div className="font-black text-sm w-[55%]">{card?.name || card?.card_name}</div>
                      <div className="flex space-x-1">
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faPlus}/></button>
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faMinus}/></button>
                        <button 
                          className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                          onClick={(event) => {
                            event.stopPropagation(); 
                            handleDeleteSpellCardClick(card);
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
            <section 
              ref={TrapCardRef} 
              className={`flex flex-col w-1/3 relative group transition-all duration-300 ${
                shouldTrapBlur ? "blur-sm border-2 border-goldenrod" : ""
              }`}
            >
              <span className="text-lg pl-[2vw] py-[2vh] font-black text-[hsl(var(--text))]">
                Trap: 
              </span>
              {trapCards.length > 0 && (
                <div className="w-full h-full pl-[1vw] flex flex-col space-y-2">
                  {trapCards.map((card: any) => (
                    <div key={card.id} className="flex h-[5vh] items-center space-x-2">
                      <span className="text-gray-500">x1</span>
                      <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          className="h-full object-contain"
                          //alt={card.card_name}
                      />
                      <div className="font-black text-sm w-[55%]">{card?.name || card?.card_name}</div>
                      <div className="flex space-x-1">
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faPlus}/></button>
                        <button className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faMinus}/></button>
                        <button 
                          className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                          onClick={(event) => {
                            event.stopPropagation(); 
                            handleDeleteTrapCardClick(card);
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
          <div className="flex bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section 
              ref={MonsterCardRef} 
              className={`flex flex-col w-1/3 relative group transition-all duration-300 ${
                shouldMonsterBlur ? "blur-sm border-2 border-goldenrod rounded-tl-lg rounded-bl-lg" : ""
              }`}
            >
              <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">monster: </span>
              {monsterCards.length > 0 && ( 
                  <div 
                    className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {monsterCards.map((card: any) => (
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

            <section 
              ref={SpellCardRef} 
              className={`flex flex-col w-1/3 relative group transition-all duration-300 ${
                shouldSpellBlur ? "blur-sm border-2 border-goldenrod" : ""
              }`}
            >
              <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">Spell: </span>
              {spellCards.length > 0 && (
                  <div 
                    className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {spellCards.map((card: any) => (
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

            <section 
              ref={TrapCardRef} 
              className={`flex flex-col w-1/3 relative group transition-all duration-300 ${
                shouldTrapBlur ? "blur-sm border-2 border-goldenrod" : ""
              }`}
            >
              <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">Trap: </span>
              {trapCards.length > 0 && ( 
                  <div 
                    className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {trapCards.map((card: any) => (
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

export default MainDeckCardZone