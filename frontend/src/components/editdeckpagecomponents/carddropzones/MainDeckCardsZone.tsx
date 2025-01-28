import { useDroppable } from "@dnd-kit/core"
import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleDecreaseCardOwnedAmount, handleDeleteCardClick, handleIncreaseCardOwnedAmount } from "../../editdeckpagecomponents/buttons/EditDeckCardButtons";
import { MainDeckProps } from "../types/carddropzonetypes";
import SubGridListViewComponent from "../../editdeckpagecomponents/draganddropitems/subgridlistviewcomp";
import AddMonsterCardDrawer from "../mobileaddcarddrawers/addmonstercarddrawer";
import AddSpellCardDrawer from "../mobileaddcarddrawers/addspellcarddrawer";
import AddTrapCardDrawer from "../mobileaddcarddrawers/addtrapcarddrawer";

const MainDeckCardZone = ({ maindeckprops }: MainDeckProps) => {
  const {
    userId,
    deck,
    setModifyMainDeckCardAmountPlaceHolder,
    setCardsToDeleteMainDeckPlaceHolder,
    monsterCards, setMonsterCards,
    spellCards, setSpellCards,
    trapCards, setTrapCards,
    hoveredCard,
    allCardsView, setAllCardsView,
    collectionCardsView, setCollectionCardsView,
    allCardsListResults, setAllCardsListResults,
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

  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [collectionMonsterCards, setCollectionMonsterCards] = useState<any>([])
  const [allMonsterCards, setAllMonsterCards] = useState<any>([])
  //const [collectionSpellCards, setCollectionSpellCards] = useState([])
  //const [collectionTrapCards, setCollectionTrapCards] = useState([])

  const filterProps = {
    listView, setListView,
    galleryView, setGalleryView
  }

  const monstercarddrawerprops = {
    userId,
    openDrawer, setOpenDrawer,
    allCardsView, setAllCardsView,
    allCardsListResults, setAllCardsListResults,
    collectionCardsView, setCollectionCardsView,
    collectionMonsterCards, setCollectionMonsterCards,
    allMonsterCards, setAllMonsterCards,
    setMonsterCards
  }

  return (
    <section className="flex flex-grow flex-col justify-between min-h-[35vh] w-full px-4">
        <header className="flex w-full py-[2vh] pl-[3vw] justify-between text-[hsl(var(--text))]">
            <span className="hidden md:flex w-[10vw] font-black items-center">Main Deck</span>
            <div className="flex h-fit items-center w-full justify-between space-x-4">
                <div className="font-bold">Total Main Deck Cards: {deck?.total_cards_main_deck}</div>
                <div className='flex w-20 bg-footer rounded-xl'>
                    <SubGridListViewComponent filterProps={filterProps}/>
                </div>
            </div>
        </header>
        {listView && (
          <div className="flex flex-col md:flex-row bg-transparent space-y-[3vh] md:space-y-0 md:bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section 
              ref={MonsterCardRef} 
              className={`flex flex-col w-full h-[30vh] md:h-full rounded-lg md:w-1/3 relative bg-[hsl(var(--editdeckdraganddropbackground))] ${shouldMonsterBlur ? "border-2 border-goldenrod rounded-lg" : ""}`}
            >
              {shouldMonsterBlur && (
                  <div className="absolute text-center inset-0 flex items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Monster Card To Main Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldMonsterBlur ? "blur-sm" : "" }`}>
                <div className="flex w-full items-center justify-between px-[2vw] py-[2vh]">
                  <span className="text-lg font-black text-[hsl(var(--text))]"> monster: </span>
                  <a className="flex md:hidden"><AddMonsterCardDrawer monstercarddrawerprops={monstercarddrawerprops}/></a>
                </div>
                {monsterCards.length > 0 && (
                  <div className="w-full h-full pl-[1vw] flex flex-col space-y-2">
                    {monsterCards.map((card: any) => (
                      <div
                        key={card?.id || card?._id}
                        className="flex w-full h-[5vh] items-center space-x-2"
                      >
                        <span className="text-gray-500">{card?.cardInDeckOwnedAmount}x</span>
                        <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          alt={card?.name || card?.card_name}
                          className="h-full object-contain"
                        />
                        <span className="font-black text-[hsl(var(--text))] text-sm w-[55%]">{card?.name || card?.card_name}</span>
                        <div className="flex space-x-1">
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleIncreaseCardOwnedAmount(card, setMonsterCards, setModifyMainDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faPlus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleDecreaseCardOwnedAmount(card, setMonsterCards, setModifyMainDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faMinus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                            onClick={(event) => {
                              event.stopPropagation(); 
                              handleDeleteCardClick(card, setMonsterCards, setModifyMainDeckCardAmountPlaceHolder, setCardsToDeleteMainDeckPlaceHolder);
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
            <section 
              ref={SpellCardRef} 
              className={`flex flex-col w-full rounded-lg  md:w-1/3 h-[30vh] md:h-full relative bg-[hsl(var(--editdeckdraganddropbackground))] ${shouldSpellBlur ? "border-2 border-goldenrod rounded-lg" : ""}`}
            >
              {shouldSpellBlur && (
                  <div className="absolute text-center inset-0 flex items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Spell Card To Main Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldSpellBlur ? "blur-sm" : "" }`}>
                <div className="flex w-full items-center justify-between px-[2vw] py-[2vh]">
                  <span className="text-lg font-black text-[hsl(var(--text))]">Spell: </span>
                  <a className="flex md:hidden"><AddSpellCardDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/></a>
                </div>
                {spellCards.length > 0 && (
                  <div className="w-full h-full pl-[1vw] flex flex-col space-y-2">
                    {spellCards.map((card: any) => (
                      <div key={card?.id || card?._id} className="flex h-[5vh] items-center space-x-2">
                        <span className="text-gray-500">{card?.cardInDeckOwnedAmount}x</span>
                        <img
                            src={card?.card_images?.[0]?.image_url || card?.image_url}
                            alt={card?.name || card?.card_name}
                            className="h-full object-contain"
                        />
                        <span className="font-black text-[hsl(var(--text))] text-sm w-[55%]">{card?.name || card?.card_name}</span>
                        <div className="flex space-x-1">
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleIncreaseCardOwnedAmount(card, setSpellCards, setModifyMainDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faPlus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleDecreaseCardOwnedAmount(card, setSpellCards, setModifyMainDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faMinus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                            onClick={(event) => {
                              event.stopPropagation(); 
                              handleDeleteCardClick(card, setSpellCards, setModifyMainDeckCardAmountPlaceHolder, setCardsToDeleteMainDeckPlaceHolder);
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
            <section 
              ref={TrapCardRef} 
              className={`flex flex-col w-full rounded-lg  md:w-1/3 h-[30vh] md:h-full relative  bg-[hsl(var(--editdeckdraganddropbackground))]${shouldTrapBlur ? "border-2 border-goldenrod rounded-lg" : "" }`}
            >
              {shouldTrapBlur && (
                  <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Trap Card To Main Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldTrapBlur ? "blur-sm" : "" }`}>
                <div className="flex w-full items-center justify-between px-[2vw] py-[2vh]">
                  <span className="text-lg font-black text-[hsl(var(--text))]">Trap:</span>
                  <a className="flex md:hidden"><AddTrapCardDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}/></a>
                </div>
                {trapCards.length > 0 && (
                  <div className="w-full h-full pl-[1vw] flex flex-col space-y-2">
                    {trapCards.map((card: any) => (
                      <div key={card.id} className="flex h-[5vh] items-center space-x-2">
                        <span className="text-gray-500">{card?.cardInDeckOwnedAmount}x</span>
                        <img
                            src={card?.card_images?.[0]?.image_url || card?.image_url}
                            alt={card?.name || card?.card_name}
                            className="h-full object-contain"
                        />
                        <span className="font-black text-[hsl(var(--text))] text-sm w-[55%]">{card?.name || card?.card_name}</span>
                        <div className="flex space-x-1">
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleIncreaseCardOwnedAmount(card, setTrapCards, setModifyMainDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faPlus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))]'
                            onClick={() => {handleDecreaseCardOwnedAmount(card, setTrapCards, setModifyMainDeckCardAmountPlaceHolder)}}
                          >
                            <FontAwesomeIcon icon={faMinus}/>
                          </button>
                          <button 
                            className='text-white h-6 w-6 rounded bg-[hsl(var(--background3))] hover:text-red-500'
                            onClick={(event) => {
                              event.stopPropagation(); 
                              handleDeleteCardClick(card, setTrapCards, setModifyMainDeckCardAmountPlaceHolder, setCardsToDeleteMainDeckPlaceHolder);
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
          <div className="flex flex-col md:flex-row bg-transparent space-y-[3vh] md:space-y-0 md:bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-lg">
            <section 
              ref={MonsterCardRef} 
              className={`flex flex-col w-full h-[30vh] md:h-full rounded-lg md:w-1/3 relative bg-[hsl(var(--editdeckdraganddropbackground))] ${shouldMonsterBlur ? "border-2 border-goldenrod rounded-tl-lg rounded-bl-lg" : ""}`}
            >
              {shouldMonsterBlur && (
                  <div className="absolute inset-0 flex text-center items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Monster Card To Main Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldMonsterBlur ? "blur-sm" : "" }`}>
                <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">monster: </span>
                {monsterCards.length > 0 && ( 
                    <div 
                      className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                      style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                    >
                      {monsterCards.map((card: any) => (
                        <div className="flex h-full">
                            <div key={card.id} className="relative group flex flex-col items-center space-y-2">
                              <label className="bg-[hsl(var(--background3))] font-bold text-[hsl(var(--text))] px-2 text-xs rounded-2xl">{card?.cardInDeckOwnedAmount}x</label>
                              <img
                                src={card?.image_url || card?.card_images?.[0]?.image_url}
                                alt={card.name}
                                className="h-full object-contain group-hover:blur-xs"
                              />
                              <div className="absolute inset-0 flex items-center justify-center top-[10%] h-[70%] bg-black bg-opacity-50 text-white text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {card.name}
                              </div>

                              <div className="flex space-x-1">
                                <button 
                                  className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                  onClick={() => {handleIncreaseCardOwnedAmount(card, setMonsterCards, setModifyMainDeckCardAmountPlaceHolder)}}
                                >
                                  <FontAwesomeIcon className="fa-xs" icon={faPlus}/>
                                </button>
                                <button 
                                  className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                  onClick={() => {handleDecreaseCardOwnedAmount(card, setMonsterCards, setModifyMainDeckCardAmountPlaceHolder)}}
                                >
                                  <FontAwesomeIcon className="fa-xs" icon={faMinus}/>
                                </button>
                                <button 
                                  className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-red-400'
                                  onClick={(event) => {
                                    event.stopPropagation(); 
                                    handleDeleteCardClick(card, setMonsterCards, setModifyMainDeckCardAmountPlaceHolder, setCardsToDeleteMainDeckPlaceHolder);
                                  }}
                                >
                                  <FontAwesomeIcon className="fa-xs" icon={faTrash}/>
                                </button>
                              </div>
                            </div>
                        </div>
                      ))}
                    </div>
                )}
              </div>
            </section>

            <section 
              ref={SpellCardRef} 
              className={`flex flex-col w-full h-[30vh] md:h-full rounded-lg md:w-1/3 relative bg-[hsl(var(--editdeckdraganddropbackground))] ${shouldSpellBlur ? "border-2 border-goldenrod" : ""}`}
            >
              {shouldSpellBlur && (
                <div className="absolute text-center inset-0 flex items-center justify-center bg-transparent">
                  <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Spell Card To Main Deck</span>
                </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldSpellBlur ? "blur-sm" : "" }`}>
                <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">Spell: </span>
                {spellCards.length > 0 && ( 
                    <div 
                      className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                      style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                    >
                      {spellCards.map((card: any) => (
                        <div className="flex h-full">
                            <div key={card.id} className="relative group flex flex-col items-center space-y-2">
                              <label className="bg-[hsl(var(--background3))] font-bold text-[hsl(var(--text))] px-2 text-xs rounded-2xl">{card?.cardInDeckOwnedAmount}x</label>
                              <img
                                src={card?.image_url || card?.card_images?.[0]?.image_url}
                                alt={card.name}
                                className="h-full object-contain group-hover:blur-xs"
                              />
                              <div className="absolute inset-0 flex items-center justify-center top-[10%] h-[70%] bg-black bg-opacity-50 text-white text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {card.name}
                              </div>
                              <div className="flex space-x-1">
                                <button 
                                  className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                  onClick={() => {handleIncreaseCardOwnedAmount(card, setSpellCards, setModifyMainDeckCardAmountPlaceHolder)}}
                                >
                                  <FontAwesomeIcon className="fa-xs" icon={faPlus}/>
                                </button>
                                <button 
                                  className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                  onClick={() => {handleDecreaseCardOwnedAmount(card, setSpellCards, setModifyMainDeckCardAmountPlaceHolder)}}
                                >
                                  <FontAwesomeIcon className="fa-xs" icon={faMinus}/>
                                </button>
                                <button 
                                  className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-red-400'
                                  onClick={(event) => {
                                    event.stopPropagation(); 
                                    handleDeleteCardClick(card, setSpellCards, setModifyMainDeckCardAmountPlaceHolder, setCardsToDeleteMainDeckPlaceHolder);
                                  }}
                                >
                                  <FontAwesomeIcon className="fa-xs" icon={faTrash}/>
                                </button>
                              </div>
                            </div>
                        </div>
                      ))}
                    </div>
                )}
              </div>
            </section>

            <section 
              ref={TrapCardRef} 
              className={`flex flex-col w-full h-[30vh] md:h-full rounded-lg md:w-1/3 relative bg-[hsl(var(--editdeckdraganddropbackground))] ${shouldTrapBlur ? "border-2 border-goldenrod rounded-tr-lg rounded-br-lg" : "" }`}
            >
              {shouldTrapBlur && (
                  <div className="absolute  text-center inset-0 flex items-center justify-center bg-transparent">
                    <span className="text-[hsl(var(--text))] font-bold text-lg z-10">Drop To Add Trap Card To Main Deck</span>
                  </div>
              )}
              <div className={`relative flex flex-col w-full h-full transition-all duration-300 ${ shouldTrapBlur ? "blur-sm" : "" }`}>
                <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">Trap: </span>
                  {trapCards.length > 0 && ( 
                      <div 
                        className="grid grid-cols-6 gap-4 w-full h-full p-4 justify-items-start items-start"  
                        style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                      >
                        {trapCards.map((card: any) => (
                          <div className="flex h-full">
                              <div key={card.id} className="flex flex-col relative group items-center space-y-2">
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
                                    onClick={() => {handleIncreaseCardOwnedAmount(card, setTrapCards, setModifyMainDeckCardAmountPlaceHolder)}}
                                  >
                                    <FontAwesomeIcon className="fa-xs" icon={faPlus}/>
                                  </button>
                                  <button 
                                    className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-green-400'
                                    onClick={() => {handleDecreaseCardOwnedAmount(card, setTrapCards, setModifyMainDeckCardAmountPlaceHolder)}}
                                  >
                                    <FontAwesomeIcon className="fa-xs" icon={faMinus}/>
                                  </button>
                                  <button 
                                    className='flex text-white h-4 w-4 justify-center items-center rounded bg-[hsl(var(--background3))] hover:text-red-400'
                                    onClick={(event) => {
                                      event.stopPropagation(); 
                                      handleDeleteCardClick(card, setTrapCards, setModifyMainDeckCardAmountPlaceHolder, setCardsToDeleteMainDeckPlaceHolder);
                                    }}
                                  >
                                    <FontAwesomeIcon className="fa-xs" icon={faTrash}/>
                                  </button>
                                </div>
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

export default MainDeckCardZone