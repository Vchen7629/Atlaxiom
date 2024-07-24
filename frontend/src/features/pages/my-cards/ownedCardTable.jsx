import React, { useState } from 'react';
import './styling/ownedcards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircleXmark, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation } from '../../api-slices/ownedCardapislice';

const UserOwnedCardTable = ({ user, refetchUserData }) => {
  const { id: userId, ownedCards, totalOwnedCards, lastAdded, lastDeleted } = user;
  const [ searchTerm, setSearchTerm ] = useState('');

  const [increaseOwnedCard] = useIncreaseOwnedCardMutation();
  const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
  const [deleteOwnedCard] = useDeleteOwnedCardMutation();

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleClearClick = () => {
    setSearchTerm('')
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
      <div className="My-Cards-Title"> My Cards </div>
      <div className="My-Cards-body-container">
        <div className="My-Cards-Sidebar-container"> 
          <div className="My-Cards-Search-Bar-container">
            <div className="My-Cards-Search-input">
              <FontAwesomeIcon icon={faSearch} className="search-icon"/>
              <input 
                type="text"
                value={searchTerm}
                onChange={handleSearchTerm}
                placeholder="Search Cards... "
              />
              <button className="clear-button" onClick={handleClearClick}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="My-Cards-Sidebar-Statistics-title"> Collection Statistics </div>
            <div className="My-Cards-tally"> Total OwnedCards: {totalOwnedCards} </div>
            <div className="My-Cards-last-added"> Last added Card: {lastAdded}</div>
            <div className="My-Cards-last-deleted">Last Deleted Card: {lastDeleted}</div>
          </div>
        </div>
        <div className="My-Cards-Display-Container">
          <div className="My-Card-Display-Grid">
            {filteredCards.map((card, index) => (
              console.log("testing", card),
              console.log("cardid", card._id),
              <div key={index} className="my-card-item">
                <div className="my-card-name">{card.card_name}</div>
                <img src={card.image_url} alt={card.card_name} className="my-card-image" />
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
          </div>
        </div>
      </div>
    </main>
  );

};



export default UserOwnedCardTable;