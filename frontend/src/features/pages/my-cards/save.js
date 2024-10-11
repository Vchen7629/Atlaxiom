import React, { useState } from 'react';
import './styling/ownedcards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faCircleXmark, faGripHorizontal, faLeftLong, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation } from '../../api-slices/ownedCardapislice';

const UserOwnedCardTable = ({ user, refetchUserData }) => {
  const { id: userId, ownedCards, totalOwnedCards, lastAdded, lastDeleted } = user;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState(null)

  const [increaseOwnedCard] = useIncreaseOwnedCardMutation();
  const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
  const [deleteOwnedCard] = useDeleteOwnedCardMutation();

  const [listView, setListView] = useState(true);
  const [listViewDecks, setListViewDecks] = useState([]);

  const [galleryView, setGalleryView] = useState(false);

  
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

  const filteredCards = ownedCards.filter((card) => 
    card.card_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIncreaseClick = async (cardName) => {
    try {
      await increaseOwnedCard({ 
        id: userId, 
        CardData: { 
          card_name: cardName,
          increaseOwnedAmount: 1 
        } 
      });
      refetchUserData();
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
      refetchUserData();
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
      refetchUserData();
    } catch (err) {
      console.error('Failed to delete card:', err);
    }
  }

  return (
    <main className="My-Cards-box">
      <div className="My-Cards-header">
        <div className="My-Cards-Title"> 
          <strong>My Card Collection</strong> 
        </div>
        <div className="My-Cards-Search-Bar-container">
          <FontAwesomeIcon icon={faSearch} className="My-cards-search-icon fa-xl"/>
            <input 
              className="My-Cards-Search-input"
              type="text"
              value={searchTerm}
              onChange={handleSearchTerm}
              placeholder="Search Cards... "
            />
            <button className="My-Cards-Clear-button fa-2xl" onClick={handleClearClick}>
              <FontAwesomeIcon icon={faTimes}/>
            </button>
        </div>
        <button
            className="list-view-setting-button-owned-card"
            onClick={handleListView}
          >
            <FontAwesomeIcon icon={faBars} className="fa-2xl"/>
          </button>
          <button
            className="gallery-view-setting-button-owned-card"
            onClick={handleGalleryView}
          >
            <FontAwesomeIcon icon={faGripHorizontal} className="fa-2xl"/>
          </button>
      </div>
        <div className="My-Cards-Display-Container">
          {selectedCard ? (
            <main>
              <button 
                className="My-Card-selected-back-icon"
                onClick={handleBackToGridClick}
              > 
                <FontAwesomeIcon icon={faLeftLong} className="fa-2x"/>
              </button>
              <div className="My-Card-selected-card-item">
                <div>
                  <div className="My-Card-selected-card-name">{selectedCard.card_name}</div>
                  <img src={selectedCard.image_url} alt="image unavailable" className="My-card-selected-card-image"/>
                  <div className="My-Card-selected-owned-amount"> Owned amount: {selectedCard.ownedamount}</div>
                </div>
                <div className="My-Card-selected-card-item-left">
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
                        <div className="My-Card-selected-card-type-container"> 
                          <div className="My-Card-selected-card-type-header">Card Type:</div> 
                          <div>{selectedCard.type}</div>
                        </div>
                      }

                      {selectedCard.race &&
                        <div className="My-Card-selected-card-race-container">
                          <div className="My-Card-selected-card-race-header">Race:</div>
                          <div>{selectedCard.race}</div>
                        </div>
                      }

                      {selectedCard.attribute &&
                        <div className="My-Card-selected-card-attribute-container">
                          <div className="My-Card-selected-card-attribute-header">Attribute: </div>
                          <div>{selectedCard.attribute}</div>
                        </div>
                      }

                      {selectedCard.archetype &&
                        <div className="My-Card-selected-card-archetype-container">
                          <div className="My-Card-selected-card-archetype-header">Archetype: </div>
                          <div>{selectedCard.archetype}</div>
                        </div>
                      }

                      {selectedCard.level &&
                        <div className="My-Card-selected-card-level-container">
                          <div className="My-Card-selected-card-level-header">Level: </div>
                          <div>{selectedCard.level}</div>
                        </div>
                      }

                      {selectedCard.linkval &&
                        <div className="My-Card-selected-card-linkval-container">
                          <div className="My-Card-selected-card-linkval-header">Link Value: </div>
                          <div>{selectedCard.linkval}</div>
                        </div>
                      }

                      {selectedCard.scale &&
                        <div className="My-Card-selected-card-pendscale-container">
                          <div className="My-Card-selected-card-pendscale-header">Pendulum Scale Value: </div>
                          <div>{selectedCard.scale}</div>
                        </div>
                      }

                      {selectedCard.atk !== undefined &&
                        <div className="My-Card-selected-card-atk-container">
                          <div className="My-Card-selected-card-atk-header">Attack: </div>
                          <div>{selectedCard.atk !== null ? selectedCard.atk : 0}</div>
                        </div>
                      }

                      {selectedCard.def !== undefined &&
                        <div className="My-Card-selected-card-def-container">
                          <div className="My-Card-selected-card-def-header">Defense: </div>
                          <div>{selectedCard.def !== null ? selectedCard.def : 0}</div>
                        </div>
                      }

                      {selectedCard.desc &&
                        <div className="My-Card-selected-card-linkval-container">
                          <div className="My-Card-selected-card-linkval-header">Description: </div>
                          <div>{selectedCard.desc}</div>
                        </div>
                      }

                    </div>
                  )}
                  </>
                </div>
              </div>
            </main>
            ) : (
            galleryView && (
              <main className="My-Card-Display-Grid">
                  {filteredCards.map((card, index) => (
                    <div 
                      key={index} 
                      className="my-card-item"
                    >
                      <div 
                        className="my-card-name"
                        onClick={() => handleCardClick(card)}
                      >
                        {card.card_name}
                      </div>
                      <img 
                        src={card.image_url} 
                        alt={card.card_name} 
                        className="my-card-image" 
                        onClick={() => handleCardClick(card)}
                      />
                      <div className="my-card-owned-amount-container">
                        <div className="my-card-owned-amount-header">owned:</div>
                        <div className="my-card-owned-amount-number">{card.ownedamount}</div>
                        <div className="my-card-owned-amount-change-container">
                          <button className="my-card-owned-amount-increase-icon" onClick={() => handleIncreaseClick((card.card_name))}>
                            <FontAwesomeIcon icon={faChevronUp}/>
                          </button>
                          <button className="my-card-owned-amount-decrease-icon" onClick={() => handleDecreaseClick((card.card_name))}>
                            <FontAwesomeIcon icon={faChevronDown}/>
                          </button>
                        </div>
                        <button className="my-card-owned-delete-icon"onClick={() => handleDeleteCardClick((card.card_name))}>
                          <FontAwesomeIcon icon={faCircleXmark}/>
                        </button>
                      </div>
                    </div>
                  ))}
              </main>
            ) 
          )}
        </div>
      <div>
        
      </div>
    </main>
  );

};



export default UserOwnedCardTable;