import React, { useEffect, useState } from 'react';
import './styling/ownedcards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faCircleXmark, faGripHorizontal, faLeftLong, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from '../../api-slices/ownedCardapislice';
import { useLocation } from 'react-router-dom';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';

const UserOwnedCardTable = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredCards = cardsToDisplay.filter((card) => 
    card && card.card_name && card.card_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (userId) {
        refetch(); 
        console.log("Refetched data after entering Owned Cards page");
    }
  }, [userId, refetch]);

  
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
    <main className="flex flex-col bg-radial-gray min-h-[100vh] justify-between">
        <Header/>
        <div className="flex items-center justify-center">
          <div className="bg-blackone text-white relative flex flex-col items-center w-[80%] min-h-[68vh] rounded-[25px] p-5">
            <div className="relative items-center justify-between flex w-[95%] pb-5 my-5">
              <div className="text-[40px] ml-[5%] text-goldenrod"> 
                <strong>My Card Collection</strong> 
              </div>
              <div className="relative w-[500px] right-[7%] flex h-11 items-center  rounded-2xl border-2 border-gray-500">
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
              {!selectedCard && (
                <>
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
                </>
              )}
            </div>
              <main className='w-[95%] my-[3%]'>
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
                    <main className="overflow-y-auto bg-blackthrees h-[50vh] shadow-mycards">
                      {filteredCards.map((card, index) => (
                          <div 
                            key={index} 
                            className="flex bg-transparent h-50 items-center hover:bg-blacktwo"
                          >
                          <img 
                            src={card.image_url} 
                            alt={card.card_name} 
                            className="w-[6%]" 
                            onClick={() => handleCardClick(card)}
                          />
                          <div 
                            className="w-[20%] overflow-y-auto h-[164px] text-xl px-[2%] flex items-center"
                            onClick={() => handleCardClick(card)}
                          >
                            {card.card_name}
                          </div>
                          <div
                            className="w-[70%] flex items-center justify-left h-[164px] pr-[5%]"
                            onClick={() => handleCardClick(card)}
                          >
                            {card.desc}
                          </div>
                          <div className="flex w-[10%] h-[10%] items-center">
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
                          
                              <div>
                                <p>No cards available. Start adding to your collection!</p>
                              </div>
                            
                          )}                       
                        </main>
                    )
                  )}
                </div>
              </main>
            <div>
            
            </div>
          </div>
        </div>
        <Footer/>
    </main>              
  );

};



export default UserOwnedCardTable;