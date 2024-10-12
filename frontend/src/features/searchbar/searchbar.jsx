import React, { useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faGripHorizontal, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './styling/searchbar.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';

const SearchBar = () => {
  const [cardName, setCardName] = useState('');
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [mainSuggestions, setMainSuggestions] = useState([]);
  const [gallerySuggestions, setGallerySuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const authenticated = useSelector((state) => state.auth.token !== null);

  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);

  const maxMainSuggestions = 99999;
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
    setCurrentPage(1)
  }

  const handleGalleryView = () => {
      setListView(false)
      setGalleryView(true)
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
    setSelectedSuggestion(null);
    setCurrentPage(1);
    debouncedSearchCard(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setCardName(suggestion);
    setSelectedSuggestion(suggestion);
    setMainSuggestions([]);
    isAuthenticated(suggestion);
  };

  const handleClearClick = () => {
    setCardName('');
    setError(null);
    setMainSuggestions([]);
    setSelectedSuggestion(null);
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
      </div>
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
                      className="gallery-item-image"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="pagination-gallery">
              <button className="button-left" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                {'<'}
              </button>
              <span>{`Page ${currentPage} of ${totalGalleryPages}`}</span>
              <button className="button-right" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
               {'>'}
              </button>
            </div>
          </div>
        )}   
    </main>
    <Footer/>
    </>
  );
};


export default SearchBar;