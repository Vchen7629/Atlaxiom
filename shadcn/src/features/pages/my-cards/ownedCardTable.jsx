import React, { useEffect, useState } from 'react';
import './styling/ownedcards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faCircleXmark, faGripHorizontal, faLeftLong, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from '../../api-slices/ownedCardapislice';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { AttributeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/attributedropdown"
import { ArchetypeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/archetypedropdown"
import { SubTypeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/subtypedrowndown"
import { CardSetDropDownComponent } from "../../../components/shadcn_components/dropdown_components/cardsetdropdown"
import { RarityRadialChartComponent } from "../../../components/shadcn_components/charts/rarityradialchart"


const UserOwnedCardTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');

  const [cardTypeFilter, setCardTypeFilter] = useState('');
  const [isMonsterFilterActive, setIsMonsterFilterActive] = useState(false);
  const [isSpellFilterActive, setIsSpellFilterActive] = useState(false);
  const [isTrapFilterActive, setIsTrapFilterActive] = useState(false);
  
  const [monsterCount, setMonsterCount] = useState(0);
  const [spellCount, setSpellCount] = useState(0);
  const [trapCount, setTrapCount] = useState(0);

  const handleMonsterFilter = () => {
    setCardTypeFilter('monster');
    setIsMonsterFilterActive(true);
    setIsSpellFilterActive(false);
    setIsTrapFilterActive(false);
  }

  const handleSpellFilter = () => {
    setCardTypeFilter('spell');
    setIsMonsterFilterActive(false);
    setIsSpellFilterActive(true);
    setIsTrapFilterActive(false);
  }

  const handleTrapFilter = () => {
    setCardTypeFilter('trap');
    setIsMonsterFilterActive(false);
    setIsSpellFilterActive(false);
    setIsTrapFilterActive(true);
  }
  const clearFilter = () => {
    setCardTypeFilter('');
    setIsMonsterFilterActive(false);
    setIsSpellFilterActive(false);
    setIsTrapFilterActive(false);
  }
  
  const [selectedCard, setSelectedCard] = useState(null)

  const [increaseOwnedCard] = useIncreaseOwnedCardMutation();
  const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
  const [deleteOwnedCard] = useDeleteOwnedCardMutation();

  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);


  const {
    data: ownedCards,
    refetch
  } = useGetOwnedCardsQuery(userId);


  const cardsToDisplay = Object.values(ownedCards?.entities || {}).flat();

  const filteredCards = cardsToDisplay.filter((card) => {
    if (!card || !card.card_name || !card.type) return false;
    const matchesSearchTerm = card.card_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = cardTypeFilter ? card.type.toLowerCase().includes(cardTypeFilter) : true;
    return matchesSearchTerm && matchesTypeFilter;
  });

  useEffect(() => {
    if (userId) {
        refetch(); 
    }
  }, [userId, refetch]);

  useEffect(() => {
    if (ownedCards) {
      const allCards = Object.values(ownedCards?.entities || {}).flat().filter(card => card);

      setMonsterCount(allCards.filter(card => card.type?.toLowerCase().includes('monster')).length);
      setSpellCount(allCards.filter(card => card.type?.toLowerCase().includes('spell')).length);
      setTrapCount(allCards.filter(card => card.type?.toLowerCase().includes('trap')).length);

    }
  }, [ownedCards]);

  const handleAddtoCollection = () => {
    navigate('/searchloggedin')
  }
  
  const handleListView = () => {
    setListView(true)
    setGalleryView(false)
  }

  const handleGalleryView = () => {
      setListView(false)
      setGalleryView(true)
  }

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleClearClick = () => {
    setSearchTerm('')
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleBackToGridClick = () => {
    setSelectedCard(null)
  }

  const handleIncreaseClick = async (cardName) => {
    try {
      await increaseOwnedCard({ 
        id: userId, 
        CardData: { 
          card_name: cardName,
          increaseOwnedAmount: 1 
        } 
      });
      refetch();
    } catch (err) {
      console.error('Failed to increase card amount:', err);
    }
  };

  const handleDecreaseClick = async (cardName) => {
    try {
      await decreaseOwnedCard({ 
        id: userId, 
        CardData: { 
          card_name: cardName,
          decreaseOwnedAmount: 1 
        } 
      });
      refetch();
    } catch (err) {
      console.error('Failed to decrease card amount:', err);
    }
  };

  const handleDeleteCardClick = async (cardName) => {
    try {
      await deleteOwnedCard({
        id: userId,
        CardData: { card_name: cardName }
      });
      refetch();
    } catch (err) {
      console.error('Failed to delete card:', err);
    }
  }

  return (
    <main className="flex flex-col bg-radial-gray min-h-[100vh]">
        <Header/>
        <div className="flex items-center justify-center">
          <div className="bg-blackone text-white relative flex flex-col w-full min-h-[120vh] p-5">
            <div className="relative items-center justify-between flex w-full mt-[1%] ">
              <div className="text-[40px] ml-[5%] text-goldenrod"> 
                <strong>My Card Collection</strong> 
              </div>
              {!selectedCard && (
                <div className="relative right-[3vw]">
                  <div className="flex w-20 justify-between">
                    <button
                      className="relative bg-transparent text-gray-500 border-transparent focus:text-gold hover:text-gold"
                      onClick={handleListView}
                    >
                      <FontAwesomeIcon icon={faBars} className="fa-2xl"/>
                    </button>
                    <button
                      className="relative bg-transparent text-gray-500 border-transparent focus:text-gold hover:text-gold"
                      onClick={handleGalleryView}
                    >
                      <FontAwesomeIcon icon={faGripHorizontal} className="fa-2xl"/>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <main className="flex justify-between">
              <div className='w-full my-[1%]'>
                  <div>
                    {selectedCard ? (
                      <main>
                        <button 
                          className="relative h-10 w-[100px] text-gold cursor-pointer left-[94%]"
                          onClick={handleBackToGridClick}
                        > 
                          <FontAwesomeIcon icon={faLeftLong} className="fa-2x"/>
                        </button>
                        <div className="flex relative w-[80%] left-1/2 translate-x-[-50%] max-h-[620px]">
                          <div className="flex flex-col items-center text-gold">
                            <div className="text-center text-2xl font-black ">{selectedCard.card_name}</div>
                            <img src={selectedCard.image_url} alt="Unavailable"className="max-h-[500px] my-[9%]"/>
                            <div> Owned amount: {selectedCard.ownedamount}</div>
                          </div>
                          <div className="flex flex-col justify-evenly ml-[5%] pr-[5%] max-h-full overflow-auto">
                            <>
                            {( 
                              selectedCard.type || 
                              selectedCard.race || 
                              selectedCard.attribute || 
                              selectedCard.archetype ||
                              selectedCard.level ||
                              selectedCard.linkval ||
                              selectedCard.scale ||
                              selectedCard.atk ||
                              selectedCard.def ||
                              selectedCard.desc ||
                              selectedCard.pend_desc ||
                              selectedCard.monster_desc 
                            ) && (
                              <div>
                                {selectedCard.type &&
                                  <div className="flex items-center"> 
                                    <div className="text-gold mr-[10px]">Card Type:</div> 
                                    <div>{selectedCard.type}</div>
                                  </div>
                                }

                                {selectedCard.race &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Race:</div>
                                    <div>{selectedCard.race}</div>
                                  </div>
                                }

                                {selectedCard.attribute &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Attribute: </div>
                                    <div>{selectedCard.attribute}</div>
                                  </div>
                                }

                                {selectedCard.archetype &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Archetype: </div>
                                    <div>{selectedCard.archetype}</div>
                                  </div>
                                }

                                {selectedCard.level &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Level: </div>
                                    <div>{selectedCard.level}</div>
                                  </div>
                                }

                                {selectedCard.linkval &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Link Value: </div>
                                    <div>{selectedCard.linkval}</div>
                                  </div>
                                }

                                {selectedCard.scale &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Pendulum Scale Value: </div>
                                    <div>{selectedCard.scale}</div>
                                  </div>
                                }

                                {selectedCard.atk !== undefined &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Attack: </div>
                                    <div>{selectedCard.atk !== null ? selectedCard.atk : 0}</div>
                                  </div>
                                }

                                {selectedCard.def !== undefined &&
                                  <div className="flex items-center my-[5%]">
                                    <div className="text-gold mr-[10px]">Defense: </div>
                                    <div>{selectedCard.def !== null ? selectedCard.def : 0}</div>
                                  </div>
                                }

                                {selectedCard.desc &&
                                  <div className="flex items-center mt-[5%]">
                                    <div className="text-gold mr-[10px]">Description: </div>
                                    <div>{selectedCard.desc}</div>
                                  </div>
                                }

                              </div>
                            )}
                            </>
                          </div>
                        </div>
                      </main>
                    ) : listView ? (
                      <main className="flex">
                        <main className=" bg-blackthrees w-[75%] max-h-full border-r-2 border-footer">
                        {filteredCards.length > 0 ? (
                          <div>
                            {filteredCards.map((card, index) => (
                              <div 
                                key={index} 
                                className="flex bg-transparent h-32 items-center hover:bg-blacktwo"
                              >
                              <img 
                                src={card.image_url} 
                                alt={card.card_name} 
                                className="w-[5%]" 
                                onClick={() => handleCardClick(card)}
                              />
                              <div 
                                className="w-[25%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center"
                                onClick={() => handleCardClick(card)}
                              >
                                {card.card_name}
                              </div>
                              <div
                                className="w-[10%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center"
                                onClick={() => handleCardClick(card)}
                              >
                                {card.set_code}
                              </div>
                              <div
                                className="w-[25%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center"
                                onClick={() => handleCardClick(card)}
                              >
                                {card.set_name}
                              </div>
                              <div
                                className="w-[15%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center"
                                onClick={() => handleCardClick(card)}
                              >
                                {card.rarity}
                              </div>
                              <div
                                className="w-[10%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center"
                                onClick={() => handleCardClick(card)}
                              >
                                ${card.price}
                              </div>
                              <div className="flex w-[10%] h-[10%] items-center">
                                <div className="text-goldenrod mr-[5px] text-sm md:w-1/4 lg:w-[30%">owned:</div>
                                  <div className="mx-[5%]">{card.ownedamount}</div>
                                  <div className="flex flex-col mr-[5%]">
                                    <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleIncreaseClick((card.card_name))}>
                                      <FontAwesomeIcon icon={faChevronUp}/>
                                    </button>
                                    <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleDecreaseClick((card.card_name))}>
                                      <FontAwesomeIcon icon={faChevronDown}/>
                                    </button>
                                  </div>
                                  <button className="text-red-600 cursor-pointer"onClick={() => handleDeleteCardClick((card.card_name))}>
                                    <FontAwesomeIcon icon={faCircleXmark}/>
                                  </button>
                              </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex h-full justify-center pt-[25%] text-3xl text-gray-400 font-black">
                            <p>No cards available. Start adding to your <button className="text-cyan-400" onClick={handleAddtoCollection}>Collection</button></p>
                          </div>
                        )}
                        
                      
                        </main>
                        <div className="flex flex-col w-[25%] items-center py-[1%]">
                          <div className="relative w-[90%] flex h-11 items-center  rounded-2xl border-2 border-gray-500">
                            <FontAwesomeIcon icon={faSearch} className="text-xl ml-4"/>
                              <input 
                                className="pl-[3%] w-full bg-transparent outline-none"
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchTerm}
                                placeholder="Search Cards... "
                              />
                              <button className="curser-pointer absolute right-[3%] top-[19%] text-gray-400 bg-transparent border-transparent fa-xl" onClick={handleClearClick}>
                                <FontAwesomeIcon icon={faTimes}/>
                              </button>
                          </div>
                          <button className="w-[30%] rounded-3xl h-6 bg-footer my-[5%]"onClick={clearFilter}>Clear</button>
                          <div className="flex w-[92%] max-w-[100%] h-10">
                              <button
                                className={`w-[37%] flex ${isMonsterFilterActive ? 'text-gold' : 'text-white'} focus:outline-none`}
                                onClick={handleMonsterFilter}
                              >
                                <div className="bg-[url('../img/monstercardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                                <div className='w-fit h-full text-[14px] flex items-center'>Monster Cards ({monsterCount})</div>
                              </button>
                              <button
                                className={`w-[32%] flex ${isSpellFilterActive ? 'text-gold' : 'text-white'} focus:outline-none`}
                                onClick={handleSpellFilter}
                              >
                                <div className="bg-[url('../img/spellcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                                <div className='w-fit h-full text-[14px] flex items-center'>Spell Cards ({spellCount})</div>
                              </button>
                              <button
                                 className={`w-[31%] flex ${isTrapFilterActive ? 'text-gold' : 'text-white'} focus:outline-none`}
                                onClick={handleTrapFilter}
                              >
                                <div className="bg-[url('../img/trapcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                                <div className='w-fit h-full text-[14px] flex items-center'>Trap Cards ({trapCount})</div>
                              </button>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Subtype:</div>
                            <SubTypeDropDownComponent/>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Attribute:</div>
                            <AttributeDropDownComponent/>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center ">Card Archetype:</div>
                            <ArchetypeDropDownComponent/>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between items-center bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Level:</div>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Set:</div>
                            <CardSetDropDownComponent/>
                          </div>
                          <div className="mt-[5%]">
                            <RarityRadialChartComponent/>
                          </div>
                        </div>
                      </main>
                    ) : (
                      galleryView && (
                          <main className="My-Card-Display-Grid">
                            {filteredCards.length > 0 ? (
                              <>
                                {filteredCards.map((card, index) => (
                                  <div 
                                    key={index} 
                                    className="flex flex-col m-2.5"
                                  >
                                    <div 
                                      className="text-m text-goldenrod max-w-[130px] h-[50px] text-center"
                                      onClick={() => handleCardClick(card)}
                                    >
                                      {card.card_name}
                                    </div>
                                    <img 
                                      src={card.image_url} 
                                      alt={card.card_name} 
                                      className="max-h-[200px] my-2.5" 
                                      onClick={() => handleCardClick(card)}
                                    />
                                    <div className="flex w-full h-[10%] items-center">
                                      <div className="text-goldenrod mr-[5px]">owned:</div>
                                      <div className="mx-[5%]">{card.ownedamount}</div>
                                      <div className="flex flex-col mr-[5%]">
                                        <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleIncreaseClick((card.card_name))}>
                                          <FontAwesomeIcon icon={faChevronUp}/>
                                        </button>
                                        <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleDecreaseClick((card.card_name))}>
                                          <FontAwesomeIcon icon={faChevronDown}/>
                                        </button>
                                      </div>
                                      <button className="text-red-600 cursor-pointer"onClick={() => handleDeleteCardClick((card.card_name))}>
                                        <FontAwesomeIcon icon={faCircleXmark}/>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div className="flex h-full min-w-[90vw] justify-center pt-[25%] text-3xl text-gray-400 font-black">
                                <p>No cards available. Start adding to your <button className="text-cyan-400" onClick={handleAddtoCollection}>Collection</button></p>
                              </div>
                            )}                       
                          </main>
                      )
                    )}
                  </div>
              </div>
              
            </main>
          </div>
        </div>
        <Footer/>
    </main>              
  );

};



export default UserOwnedCardTable;