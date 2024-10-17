import React, { useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faGripHorizontal, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './styling/searchbar.css';
import './styling/searchresult.css'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { useAddNewOwnedCardMutation } from '../../api-slices/ownedCardapislice';

const SearchBar = () => {
  const [cardName, setCardName] = useState('');
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [mainSuggestions, setMainSuggestions] = useState([]);
  const [gallerySuggestions, setGallerySuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [clickedOnCard, setClickedOnCard] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const authenticated = useSelector((state) => state.auth.token !== null);
  const userId = useSelector((state) => state.auth.userId);
  const [AddNewOwnedCard] = useAddNewOwnedCardMutation();
  const [successMessage, setSuccessMessage] = useState('')

  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);

  const maxMainSuggestions = 99999;
  const navigate = useNavigate();

  const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  const handleAddOwnedCardClick = async () => {
    if (selectedCardData){
      const cardToPost = {
        ownedCards: [
            {
                card_name: selectedCardData.name,
                image_url: selectedCardData.card_images && selectedCardData.card_images.length > 0 ? selectedCardData.card_images[0].image_url : 'fallback-image-url',
                ownedprop: "True",
                ownedamount: 1,
                type: selectedCardData.type,
                race: selectedCardData.race,
                attribute: selectedCardData.attribute,
                archetype: selectedCardData.archetype,
                level: selectedCardData.level,
                linkval: selectedCardData.linkval,
                scale: selectedCardData.scale,
                atk: selectedCardData.atk,
                def: selectedCardData.def,
                desc: selectedCardData.desc || selectedCardData.pend_desc || selectedCardData.monster_desc,
            },
        ],
      };
      try {
          const result = await AddNewOwnedCard({ id: userId, CardData: cardToPost }).unwrap();
          setSuccessMessage("Card successfully added to Collection!")
          console.log("Card data successfully posted:", result);
      } catch (error) {
          console.error('Error posting card data:', error);
          setSuccessMessage('Failed to add card to your collection.');
      }
    } else {
      console.log("No selected Card Data")
    }
    
  }

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

  const fetchSelectedCardData = async (suggestion) => {
    try {
      const response = await fetch(`${apiUrl}?name=${encodeURIComponent(suggestion)}`);
      const data = await response.json();

      if (response.ok) {
        setSelectedCardData(data.data[0]);
        console.log("setting", data.data[0])

      } else {
        console.error('Error fetching card data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
    
  }



  const debouncedSearchCard = useCallback(
    debounce((inputValue) => {
      if (!inputValue.trim()) {
        setMainSuggestions([]);
        return;
      }

      const filteredSuggestions = cardData.filter((card) =>
        card.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setMainSuggestions(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));
      setGallerySuggestions(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));
    }, 500),
    [cardData]
  );

  const suggestionsPerGalleryPage = 30;
  const suggestionsPerPage = 3;
  const totalPages = Math.ceil(mainSuggestions.length / suggestionsPerPage);
  const totalGalleryPages = Math.ceil(gallerySuggestions.length / suggestionsPerGalleryPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMainSuggestions, setCurrentMainSuggestions] = useState([]);
  const [currentGallerySuggestions, setCurrentGallerySuggestions] = useState([]);



  useEffect(() => {
    const startIndex = (currentPage - 1) * suggestionsPerPage;
    const endIndex = startIndex + suggestionsPerPage;
    const currentMainSuggestions = mainSuggestions.slice(startIndex, endIndex);
    setCurrentMainSuggestions(currentMainSuggestions);
  }, [currentPage, mainSuggestions, suggestionsPerPage]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * suggestionsPerGalleryPage;
    const endIndex = startIndex + suggestionsPerGalleryPage;
    const currentGallerySuggestions = gallerySuggestions.slice(startIndex, endIndex);
    setCurrentGallerySuggestions(currentGallerySuggestions);
  }, [currentPage, gallerySuggestions, suggestionsPerGalleryPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleListView = () => {
    setListView(true)
    setGalleryView(false)
    setSelectedCardData(null)
    setClickedOnCard(false)
    setCurrentPage(1)
  }

  const handleGalleryView = () => {
      setListView(false)
      setGalleryView(true)
      setClickedOnCard(false)
      setSelectedCardData(null)
      setCurrentPage(1)
  }

  useEffect(() => {
    debouncedSearchCard(cardName);
  }, [debouncedSearchCard, cardName]);

  useEffect(() => {
    fetchAllCardData();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCardName(inputValue);
    setClickedOnCard(false);
    setSelectedCardData(null);
    setCurrentPage(1);
    debouncedSearchCard(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setCardName(suggestion);
    setClickedOnCard(true);
    setMainSuggestions([]);
    setSelectedCardData(null);
    fetchSelectedCardData(suggestion);
  };

  const handleClearClick = () => {
    setCardName('');
    setError(null);
    setMainSuggestions([]);
    setGallerySuggestions([]);
    setSelectedCardData(null);
    setSelectedSuggestion(null);
    setClickedOnCard(false);
  };

  return (
    <>
    <Header/>     
      <main className="Searchbar-page-background">
        <div className="Searchbar-page-header">
          <div className="Searchbar-page-title">
            <strong>Card Search</strong>
          </div>
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
                  <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                </button>
              )}
            </div>
          </div>
          {!clickedOnCard &&  (
            <>
            <button
              className="list-view-setting-button-searchbar"
              onClick={handleListView}
            >
              <FontAwesomeIcon icon={faBars} className="fa-2xl"/>
            </button>
            <button
              className="gallery-view-setting-button-searchbar"
              onClick={handleGalleryView}
            >
              <FontAwesomeIcon icon={faGripHorizontal } className="fa-2xl"/>
            </button>
            </>
          )}
        </div>
          {clickedOnCard && selectedCardData ? (
            <>
              <main className="search-result-container">
                <img className="search-result-card-image"
                  src={selectedCardData.card_images[0].image_url}
                  alt={selectedCardData.name}
                /> 
                <div className="search-result-card-data-container">
                  <div className="search-result-card-name">{selectedCardData.name}</div>
                  <div className="data-body">
                    <div className="data-header">
                      <div className="Card-type">
                        <div style={{ marginRight: '20px' }}>Card type:</div> 
                        <div style={{ marginRight: '50px' }}> {selectedCardData.type}</div>
                      </div>
                      {selectedCardData.archetype && (
                        <div className="Card-type">
                          <div style={{ marginRight: '20px' }}>Archetype:</div>
                          <div style={{ marginRight: '50px' }}>{selectedCardData.archetype}</div>
                        </div>
                      )}
                      <div className="Card-type">
                        <div style={{ marginRight: '20px' }}>Race:</div>
                        {selectedCardData.race}
                      </div>
                    </div>
                    <div className="data-desc">
                      <div>
                        <div style={{ color: 'Gold', fontSize: '22px', marginBottom: '10px'}}>Card Desc: </div>
                        <div style={{ color: 'Gray', fontSize: '20px' }}>{selectedCardData.desc}</div>
                      </div>
                    </div>
                    {(selectedCardData.scale || selectedCardData.linkval || selectedCardData.atk || selectedCardData.def)&& (
                      <>
                      <div className="data-stats">
                        {selectedCardData.scale && (
                          <>
                          <div className="Card-type">
                            <div style={{ marginRight: '20px' }}>Pend-Scale:</div>
                            <div style={{ marginRight: '50px' }}>{selectedCardData.scale}</div>
                          </div>
                          </>
                        )}
                        {selectedCardData.linkval && (
                          <>
                          <div className="Card-type">
                            <div style={{ marginRight: '20px' }}>Link-value:</div>
                            <div style={{ marginRight: '50px' }}>{selectedCardData.linkval}</div>
                          </div>
                          </>
                        )}
                        {selectedCardData.atk && (
                          <>
                          <div className="Card-type">
                            <div style={{ marginRight: '20px' }}>Attack:</div>
                            <div style={{ marginRight: '50px' }}>{selectedCardData.atk}</div>
                          </div>
                          </>
                        )}
                        {selectedCardData.def && (
                          <>
                          <div className="Card-type">
                            <div style={{ marginRight: '20px' }}>Defense:</div>
                            <div>{selectedCardData.def}</div>
                          </div>
                          </>
                        )}
                      </div>
                      </>
                    )}
                    
                  </div>
                  {authenticated && (
                    <div>
                      <div className="add-card-button-container">
                        <button className="add-card-button" onClick={handleAddOwnedCardClick}>Add to Owned</button>
                          {successMessage && (
                            <span className="success-message">{successMessage}</span>
                          )}
                      </div>
                    </div>
                    )} 
                </div>    
              </main>        
            </>
          ) : (
            <>
              {listView && (
                <> 
                  <div className="Searchbar-suggestion-container">
                    {mainSuggestions.length > 0 && (
                      <>
                        <div className="suggestion-container">
                          {currentMainSuggestions.map((suggestion) => (
                            <div
                              key={suggestion}
                              className={`${selectedSuggestion === suggestion ? 'selected' : ''}`}
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <div className="suggestionbox-container">
                                <img
                                  src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url}
                                  alt={suggestion}
                                  className="suggestion-image"
                                />
                                <div className="suggestion-box">
                                  <div className="suggestion-box-header">
                                    <div className="suggestion-name-container">{suggestion}</div>
                                    <div className="heas">
                                      <div className="suggestion-card-type-container">{cardData.find((card) => card.name === suggestion)?.type}</div>
                                      <div className="suggestion-card-race-container">{cardData.find((card) => card.name === suggestion)?.race}</div>
                                      <div className="suggestion-card-race-container">{cardData.find((card) => card.name === suggestion)?.attribute}</div>
                                    </div>
                                  </div>
                                  <div className="suggestion-box-body">
                                    <div className="suggestion-card-desc-container">{cardData.find((card) => card.name === suggestion)?.desc}</div>
                                    <div className="heas">
                                      {cardData.find((card) => card.name === suggestion)?.atk && (
                                        <div className="suggestion-card-stats-container">
                                          <p>Atk:</p>{cardData.find((card) => card.name === suggestion)?.atk}
                                        </div>
                                      )}
                                      {cardData.find((card) => card.name === suggestion)?.def && (
                                        <div className="suggestion-card-stats-container">
                                          <p>Def:</p>{cardData.find((card) => card.name === suggestion)?.def}
                                        </div>
                                      )}
                                      {cardData.find((card) => card.name === suggestion)?.level && (
                                        <div className="suggestion-card-stats-container">
                                          <p>Level:</p>{cardData.find((card) => card.name === suggestion)?.level}
                                        </div>
                                      )}
                                      {cardData.find((card) => card.name === suggestion)?.scale && (
                                        <div className="suggestion-card-stats-container">
                                          <p>Pendulum Scale:</p>{cardData.find((card) => card.name === suggestion)?.scale}
                                        </div>
                                      )}
                                      {cardData.find((card) => card.name === suggestion)?.linkval && (
                                        <div className="suggestion-card-stats-container">
                                          <p>Link Value:</p>{cardData.find((card) => card.name === suggestion)?.linkval}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {totalPages > 1 && (
                          <>
                            <div className="pagination">
                              <button className="button-left" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                {'<'}
                              </button>
                              <span>{`Page ${currentPage} of ${totalPages}`}</span>
                              <button className="button-right" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                                {'>'}
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
    
                    {error && (
                      <p className="errormessage">
                        {error}
                      </p>
                    )}
                  </div>
                </> 
              )}
              {galleryView && (
                <div className="gallery-view-container">
                  {gallerySuggestions.length > 0 && (
                    <div className="Searchbar-suggestion-grid">
                      {currentGallerySuggestions.map((suggestion) => (
                        <div key={suggestion}>
                          <img
                            src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url}
                            alt={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="gallery-item-image"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {totalGalleryPages > 1 && (
                    <>
                    <div className="pagination-gallery">
                      <button className="button-left" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        {'<'}
                      </button>
                      <span>{`Page ${currentPage} of ${totalGalleryPages}`}</span>
                      <button className="button-right" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                      {'>'}
                      </button>
                    </div>
                    </>
                  )}
                </div>
              )}
            </>   
          )}

      </main>
    <Footer/>
    </>
  );
};


export default SearchBar;