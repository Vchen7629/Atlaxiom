import { useDroppable } from "@dnd-kit/core"
import GridListViewComponent from "../decksidebar/gridlistviewcomponent"

const MainDeckCardZone = ({ maindeckprops }: any) => {
  const {
    deck,
    monsterCards,
    spellCards,
    trapCards,
    listView, setListView,
    galleryView, setGalleryView
  } = maindeckprops

  const { setNodeRef: MonsterCardRef } = useDroppable({
    id: "monstercard"
  })

  const { setNodeRef: SpellCardRef } = useDroppable({
    id: "spellcard"
  })

  const { setNodeRef: TrapCardRef } = useDroppable({
    id: "trapcard"
  })

  const filterProps = {
    listView, setListView,
    galleryView, setGalleryView
  }

  return (
    <section className="flex flex-grow flex-col justify-between min-h-1/2 w-full p-4">
        <header className="flex w-full py-2 pl-[3vw] justify-between text-[hsl(var(--text))]">
            <div className="font-black">Main Deck</div>
            <div className="flex h-full items-center space-x-4">
                <div className="font-bold">Total Main Deck Cards: {deck?.total_cards_main_deck}</div>
                <div className='flex w-20 bg-footer rounded-xl'>
                    <GridListViewComponent filterProps={filterProps}/>
                </div>
            </div>
        </header>
        {listView && (
          <div className="flex bg-[hsl(var(--editdeckdraganddropbackground))] w-full min-h-[90%] rounded-2xl">
            <section ref={MonsterCardRef} className="flex flex-col w-1/3 bg-gray-400">
              <span className="text-lg pl-[2vw] font-black text-[hsl(var(--text))]">monster: </span>
              {monsterCards.length > 0 && (
                <div className="w-full h-full flex flex-col pl-2">
                  {monsterCards.map((card: any) => (
                    <div key={card?.id || card?._id} className="flex h-[5vh] items-center space-x-2">
                      <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          className="h-full object-contain"
                          //alt={card.card_name}
                      />
                      <div className="font-black text-md">{card?.name || card?.card_name}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section ref={SpellCardRef} className="flex flex-col w-1/3 bg-red-200 h-full">
              <span className="text-lg pl-[2vw] font-black text-[hsl(var(--text))]">Spell: </span>
              {spellCards.length > 0 && (
                <div className="w-full h-full flex flex-col pl-2">
                  {spellCards.map((card: any) => (
                    <div key={card?.id || card?._id} className="flex h-[5vh] items-center space-x-2">
                      <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          className="h-full object-contain"
                          //alt={card.card_name}
                      />
                      <div className="font-black text-md">{card?.name || card?.card_name}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
            <section ref={TrapCardRef} className="w-1/3 bg-green-200 h-full">
              <span className="text-lg pl-[2vw] font-black text-[hsl(var(--text))]">Trap: </span>
              {trapCards.length > 0 && (
                <div className="w-full h-full flex flex-col pl-2">
                  {trapCards.map((card: any) => (
                    <div key={card.id} className="flex h-[5vh] items-center space-x-2">
                      <img
                          src={card?.card_images?.[0]?.image_url || card?.image_url}
                          className="h-full object-contain"
                          //alt={card.card_name}
                      />
                      <div className="font-black text-md">{card?.name || card?.card_name}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {galleryView && (
          <div className="flex bg-deckpage w-full h-[90%] rounded-2xl">
            <section ref={MonsterCardRef} className="flex flex-col w-1/3 bg-gray-400">
              <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">Monster: </span>
              {monsterCards.length > 0 && ( 
                  <div 
                    className="grid grid-cols-8 gap-2 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {monsterCards.map((card: any) => (
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

            <section ref={SpellCardRef} className="flex flex-col w-1/3">
              <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">Spell: </span>
              {spellCards.length > 0 && (
                  <div 
                    className="grid grid-cols-8 gap-2 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {spellCards.map((card: any) => (
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

            <section ref={TrapCardRef} className="flex flex-col w-1/3">
              <span className="text-lg pl-[2vw] pt-[2vh] font-black text-[hsl(var(--text))]">Trap: </span>
              {trapCards.length > 0 && ( 
                  <div 
                    className="grid grid-cols-8 gap-2 w-full h-full p-4 justify-items-start items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                  >
                    {trapCards.map((card: any) => (
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

export default MainDeckCardZone