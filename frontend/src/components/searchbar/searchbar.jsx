import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash/debounce';
import './styling/searchbar.css';
import YugiohCard from './cardprop.jsx';

import FlipPendulumMonsterCard from './specializedCardProps/FlipPendulumCardProp.jsx';

const SearchBar = () => {
  const [cardName, setCardName] = useState('');
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(null);
  const [mainSuggestions, setMainSuggestions] = useState([]);
  const [leftSuggestions, setLeftSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [data] = useState({ data: [] }); // Initial state for data
  const [showEffectType] = useState(false);
  const maxMainSuggestions = 30;

  const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  const searchCard = async () => {
    try {
      if (!cardName.trim()) {
        return;
      }

      const response = await fetch(`${apiUrl}?fname=${encodeURIComponent(cardName)}`);
      const data = await response.json();

      if (response.ok) {
        setCardData(data);
        setError(null);

        // Set the main suggestions based on the results
        setMainSuggestions(data.data.slice(0, maxMainSuggestions).map((card) => card.name));
        // Set all suggestions for the left container
        setLeftSuggestions(data.data.map((card) => card.name));
      } else {
        setError(`Error: ${data.message}`);
        setCardData(null);
        setMainSuggestions([]);
        setLeftSuggestions([]);
        setSelectedSuggestion(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setCardData(null);
      setMainSuggestions([]);
      setLeftSuggestions([]);
      setSelectedSuggestion(null);
    }
  };

  // Debounce the searchCard function with a delay of 500 milliseconds
  const debouncedSearchCard = useCallback(debounce(searchCard, 500), [searchCard]);

  const suggestionsPerPage = 30;
  const totalPages = Math.ceil(leftSuggestions.length / suggestionsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeftSuggestions, setCurrentLeftSuggestions] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * suggestionsPerPage;
    const endIndex = startIndex + suggestionsPerPage;
  
    // Extract suggestions for the current page
    const currentLeftSuggestions = leftSuggestions.slice(startIndex, endIndex);
  
    // Update the state with the current left suggestions
    setCurrentLeftSuggestions(currentLeftSuggestions);
  }, [currentPage, leftSuggestions, suggestionsPerPage]);

  useEffect(() => {
    debouncedSearchCard();
  }, [debouncedSearchCard, currentPage]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCardName(inputValue);
    setSelectedSuggestion(null);

  };

  const handleSuggestionClick = (suggestion) => {
    setCardName(suggestion);
    setSelectedSuggestion(suggestion);
    setMainSuggestions([]);
    setLeftSuggestions([]);
  };

  // Function for clearing text
  const handleClearClick = () => {
    setCardName('');
    setCardData(null);
    setError(null);
    setMainSuggestions([]);
    setLeftSuggestions([]);
    setSelectedSuggestion(null);
  };


  // Determine the card type based on the "type" property
  let CardComponent;
  if (cardData && cardData.data && cardData.data.length > 0) {
    const cardType = cardData.data[0].type.toLowerCase();
    switch (cardType) {
      case 'pendulum flip effect monster':
        CardComponent = FlipPendulumMonsterCard;
        break;
      default:
        CardComponent = YugiohCard;
    }
  }

  return (
    <div className="search-bar-container">
      <div className="Input-Wrapper">
        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={cardName}
            onChange={handleInputChange}
            placeholder="Enter card name"
          />
          {cardName && (
            <button className="clear-button" onClick={handleClearClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>

      {mainSuggestions.length > 0 && (
        <>
          <div className="suggestion-container">
            {mainSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                className={`suggestion ${selectedSuggestion === suggestion ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="suggestionbox">
                  <img
                    src={cardData.data.find((card) => card.name === suggestion)?.card_images[0].image_url_cropped}
                    alt={suggestion}
                    className="suggestion-image"
                  />
                    <div className="suggestion-name-container">
                      {suggestion}
                    </div>
                </div>
              </div>
            ))}
          </div>

          <div className="suggestion-left-container">
            {currentLeftSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className={`suggestion-left ${selectedSuggestion === suggestion ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                
                <div>
                    <img
                      src={cardData.data.find((card) => card.name === suggestion)?.card_images[0].image_url_small}
                      alt={suggestion}
                      className="suggestion-image-left"
                    />
                    <div className="suggestion-name-left-container">
                        {suggestion}
                    </div>
                    <div className="suggestion-carddata-container"> 
                      <p className="cardtype">
                        Type: {cardData.data.find((card) => card.name === suggestion)?.type}
                      </p>
                      <p className="card-description">
                        Description: {cardData.data.find((card) => card.name === suggestion)?.desc}
                      </p>
                      {(cardData.data.find((card) => card.name === suggestion)?.atk ||
                      cardData.data.find((card) => card.name === suggestion)?.def) && (
                      <p className="cardstats">
                        <p className="cardattack">
                          Attack: {cardData.data.find((card) => card.name === suggestion)?.atk}
                        </p>
                        <p className="carddefense">
                          defense: {cardData.data.find((card) => card.name === suggestion)?.def}
                        </p>
                      </p>
                      )}
                    </div>
                  </div>
              </div>
            ))}
            <div className="pagination">
              <button className="button-left" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                {'<'}
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button className="button-right" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                {'>'}
              </button>
            </div>

          </div>
        </>
      )}
      
      {error && (
        <p className="errormessage">
              {error}
        </p>
          )}
      
    
          {selectedSuggestion && cardData && cardData.data && cardData.data.length > 0 && (
            <CardComponent
              name={cardData.data[0].name}
              image={cardData.data[0].card_images[0].image_url}
              type={cardData.data[0].type}
              attribute={cardData.data[0].attribute}
              level={cardData.data[0].level}
              race={cardData.data[0].race}
              archetype={cardData.data[0].archetype}
              attack={cardData.data[0].atk}
              defense={cardData.data[0].def}
              description={cardData.data[0].desc}
              showEffectType={showEffectType}
              pend_desc={cardData.data[0].pend_desc}
              monster_desc={cardData.data[0].monster_desc}
              scale={cardData.data[0].scale}
              linkval={cardData.data[0].linkval}
              card_sets={cardData.data[0].card_sets[0].set_name}
            />
            
            
          )}
        </div>
        );
    };

export default SearchBar;