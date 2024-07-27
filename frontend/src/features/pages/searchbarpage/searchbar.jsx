import React, { useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './styling/searchbar.css';

const SearchBar = () => {
  const [cardName, setCardName] = useState('');
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [mainSuggestions, setMainSuggestions] = useState([]);
  const [leftSuggestions, setLeftSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const authenticated = useSelector((state) => state.auth.token !== null);

  const maxMainSuggestions = 30;
  const navigate = useNavigate();

  const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  const isAuthenticated = (suggestion) => {
    if (!authenticated) {
      navigate(`/search/${encodeURIComponent(suggestion)}`);
    } else {
      navigate(`/${encodeURIComponent(suggestion)}`);
    }
  };

  const fetchAllCardData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setCardData(data.data);
        setError(null);
      } else {
        setError(`Error: ${data.message} card data`);
        setCardData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setCardData([]);
    }
  };

  const debouncedSearchCard = useCallback(
    debounce((inputValue) => {
      if (!inputValue.trim()) {
        setMainSuggestions([]);
        setLeftSuggestions([]);
        return;
      }

      const filteredSuggestions = cardData.filter((card) =>
        card.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setMainSuggestions(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));
      setLeftSuggestions(filteredSuggestions.map((card) => card.name));
    }, 500),
    [cardData]
  );

  const suggestionsPerPage = 5;
  const totalPages = Math.ceil(leftSuggestions.length / suggestionsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLeftSuggestions, setCurrentLeftSuggestions] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * suggestionsPerPage;
    const endIndex = startIndex + suggestionsPerPage;
    const currentLeftSuggestions = leftSuggestions.slice(startIndex, endIndex);
    setCurrentLeftSuggestions(currentLeftSuggestions);
  }, [currentPage, leftSuggestions, suggestionsPerPage]);

  useEffect(() => {
    debouncedSearchCard(cardName);
  }, [debouncedSearchCard, cardName]);

  useEffect(() => {
    fetchAllCardData();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCardName(inputValue);
    setSelectedSuggestion(null);
    debouncedSearchCard(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setCardName(suggestion);
    setSelectedSuggestion(suggestion);
    setMainSuggestions([]);
    setLeftSuggestions([]);
    isAuthenticated(suggestion);
  };

  const handleClearClick = () => {
    setCardName('');
    setError(null);
    setMainSuggestions([]);
    setLeftSuggestions([]);
    setSelectedSuggestion(null);
  };

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
                className={`${selectedSuggestion === suggestion ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="suggestionbox">
                  <img
                    src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url_cropped}
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
                    src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url_small}
                    alt={suggestion}
                    className="suggestion-image-left"
                  />
                  <div className="suggestion-name-left-container">
                    {suggestion}
                  </div>
                  <div className="suggestion-carddata-container">
                    <p className="cardtype">
                      Type: {cardData.find((card) => card.name === suggestion)?.type}
                    </p>
                    <p className="card-description">
                      Description: {cardData.find((card) => card.name === suggestion)?.desc}
                    </p>
                    {(cardData.find((card) => card.name === suggestion)?.atk ||
                      cardData.find((card) => card.name === suggestion)?.def) && (
                      <p className="cardstats">
                        <p className="cardattack">
                          Attack: {cardData.find((card) => card.name === suggestion)?.atk}
                        </p>
                        <p className="carddefense">
                          Defense: {cardData.find((card) => card.name === suggestion)?.def}
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
    </div>
  );
};


export default SearchBar;