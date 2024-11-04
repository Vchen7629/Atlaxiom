import React, { useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faGripHorizontal, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './styling/searchbar.css';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { ComponentCardSetPopup } from '../../../components/shadcn_components/popup'

const SearchBar = () => {
  const [cardName, setCardName] = useState('');
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState(null);
  const [mainSuggestions, setMainSuggestions] = useState([]);
  const [gallerySuggestions, setGallerySuggestions] = useState([]);
  const [cardSets, setCardSets] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [clickedOnCard, setClickedOnCard] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const authenticated = useSelector((state) => state.auth.token !== null);
  const userId = useSelector((state) => state.auth.userId);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);

  const maxMainSuggestions = 99999;
  const navigate = useNavigate();

  const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

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
        setCardSets(data.data[0].card_sets || []);
        console.log("testing Card Set Data", cardSets)
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

  const suggestionsPerGalleryPage = 55;
  const suggestionsPerPage = 4;
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
    setErrorMessage(null);
    setSuccessMessage(null);
    debouncedSearchCard(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setCardName(suggestion);
    setClickedOnCard(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setMainSuggestions([]);
    setSelectedCardData(null);
    fetchSelectedCardData(suggestion);
  };

  const handleClearClick = () => {
    setCardName('');
    setError(null);
    setErrorMessage(null);
    setSuccessMessage(null);
    setMainSuggestions([]);
    setGallerySuggestions([]);
    setSelectedCardData(null);
    setSelectedSuggestion(null);
    setClickedOnCard(false);
  };

  return (
    <main className="flex flex-col min-h-[100vh] bg-[#1f1d1d] justify-between">
      <Header/>     
      <div className="h-[75vh] overflow-auto ">   
            {!clickedOnCard &&  (
              <main>
                <div className="flex relative w-full justify-between items-center mb-[5vh] ">
                  <div className="text-4xl text-white ml-[4%]">
                    <strong>Card Search</strong>
                  </div>
                  <div className="flex w-[30%] h-[50px] rounded-2xl pl-5 relative border-2 border-gray-400 right-32 justify-start text-gold">
                    <div className="flex items-center w-full">
                      <FontAwesomeIcon icon={faSearch} className="mr-2" />
                      <input
                        className="bg-transparent w-full h-full text-xl text-white focus:outline-none"
                        type="text"
                        value={cardName}
                        onChange={handleInputChange}
                        placeholder="Enter card name"
                      />
                      {cardName && (
                        <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                          <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex relative left-[-4%] w-20 justify-between">
                    <button
                      className="text-gray-400 hover:text-gold"
                      onClick={handleListView}
                    >
                      <FontAwesomeIcon icon={faBars} className="fa-2xl"/>
                    </button>
                    <button
                      className="text-gray-400 hover:text-gold"
                      onClick={handleGalleryView}
                    >
                      <FontAwesomeIcon icon={faGripHorizontal } className="fa-2xl"/>
                    </button>
                  </div>
                </div>
              </main>
            )}
          
            {clickedOnCard && selectedCardData ? (
              <main className="min-h-[70vh] flex flex-col items-center">
                <div className="flex w-full justify-between items-center">
                  <div className="text-5xl text-white ml-[10%]">
                    <strong>Card Search</strong>
                  </div>
                  <div className="flex w-[32vw] h-[50px] rounded-2xl pl-5 relative top-12.5 border-2 border-gray-400 mr-[30%] justify-start text-gold">
                    <div className="flex items-center w-full">
                      <FontAwesomeIcon icon={faSearch} className="mr-2" />
                      <input
                        className="bg-transparent w-full h-full text-xl text-white focus:outline-none"
                        type="text"
                        value={cardName}
                        onChange={handleInputChange}
                        placeholder="Enter card name"
                      />
                      {cardName && (
                        <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                          <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <main className="flex mt-[5vh] w-3/4 ">
                  <img className="w-[15vw] object-contain mx-[5%] "
                    src={selectedCardData.card_images[0].image_url}
                    alt={selectedCardData.name}
                  /> 
                  <div className="flex flex-col w-[50%] pt-[1%] items-center">
                    <div className="text-4xl text-goldenrod w-full text-center">{selectedCardData.name}</div>
                    <div className="flex flex-col h-[79%] w-fit pt-[4%]">
                      <div className="flex mb-[4%] w-full justify-center ">
                        <div className="flex text-xl max-w-1/2 text-white">
                          <div className="mr-5 text-gold">Card type:</div> 
                          <div className="mr-10 text-gray-400"> {selectedCardData.type}</div>
                        </div>
                        {selectedCardData.archetype && (
                          <div className="flex text-xl max-w-1/2 text-white">
                            <div className="mr-5 text-gold">Archetype:</div>
                            <div className="mr-10 text-gray-400">{selectedCardData.archetype}</div>
                          </div>
                        )}
                        <div className="flex text-xl max-w-1/2 text-white">
                          <div className="mr-5 text-gold">Race:</div>
                          <div className="text-gray-400">{selectedCardData.race}</div>
                        </div>
                      </div>
                      <div className="flex mb-[4%] w-full justify-left">
                        <div>
                          <div className="text-gold text-2xl mb-2.5">Card Desc: </div>
                          <div className="text-gray-400 text-xl">{selectedCardData.desc}</div>
                        </div>
                      </div>
                      {(selectedCardData.scale || selectedCardData.linkval || selectedCardData.atk || selectedCardData.def)&& (
                        <>
                        <div className="flex mb-[4%] w-[90%] justify-left">
                          {selectedCardData.scale && (
                            <>
                            <div className="flex text-xl text-white">
                              <div className="mr-5">Pend-Scale:</div>
                              <div className="mr-[50px]">{selectedCardData.scale}</div>
                            </div>
                            </>
                          )}
                          {selectedCardData.linkval && (
                            <>
                            <div className="flex text-xl text-white">
                              <div className="mr-5">Link-value:</div>
                              <div className="mr-[50px]">{selectedCardData.linkval}</div>
                            </div>
                            </>
                          )}
                          {selectedCardData.atk && (
                            <>
                            <div className="flex text-xl text-white">
                              <div className="mr-5">Attack:</div>
                              <div className="mr-[50px]">{selectedCardData.atk}</div>
                            </div>
                            </>
                          )}
                          {selectedCardData.def && (
                            <>
                            <div className="flex text-xl text-white">
                              <div className="mr-5">Defense:</div>
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
                        <div className="flex justify-center">
                         <ComponentCardSetPopup selectedCardData={selectedCardData} userId={userId} cardSets={cardSets} />
                        </div>
                      </div>
                      )} 
                  </div>    
                </main>        
              </main>
            ) : (
              <>
                {listView && (
                  <main className="h-[58vh] flex justify-center"> 
                    <div className="w-[95%] flex flex-col items-center ">
                      {mainSuggestions.length > 0 && (
                        <>
                          <div>
                            {currentMainSuggestions.map((suggestion) => (
                              <div
                                key={suggestion}
                                className={`${selectedSuggestion === suggestion ? 'selected' : ''}`}
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                <div className="flex max-h-[14vh] bg-[#1f1d1d]">
                                  <img
                                    src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url}
                                    alt={suggestion}
                                    className="w-[6.5%] min-w-[%]"
                                  />
                                  <div className="flex w-full min-h-full flex-col border-2 border-transparent hover:border-gray-500">
                                    <div className="relative flex justify-between w-full">
                                      <div className="flex text-center items-center pl-[3%] w-1/2 text-goldenrod font-black text-2xl">{suggestion}</div>
                                      <div className="flex justify-evenly items-center font-bold w-[25vw]">
                                        <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.type}</div>
                                        <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.race}</div>
                                        <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.attribute}</div>
                                      </div>
                                    </div>
                                    <div className="w-full flex flex-col justify-between ">
                                      <div className="w-full font-black text-gray-400 text-md max-h-[7vh] overflow-auto pl-[3%]">{cardData.find((card) => card.name === suggestion)?.desc}</div>
                                      <div className="w-[30%] flex justify-between pl-[3%]">
                                        {cardData.find((card) => card.name === suggestion)?.atk && (
                                          <div className="flex text-gray-300 font-black text-lg">
                                            <p className="mr-2">Atk:</p>{cardData.find((card) => card.name === suggestion)?.atk}
                                          </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.def && (
                                          <div className="flex text-gray-300 font-black text-lg">
                                            <p className="mr-2">Def:</p>{cardData.find((card) => card.name === suggestion)?.def}
                                          </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.level && (
                                          <div className="flex text-gray-300 font-black text-lg">
                                            <p className="mr-2">Level:</p>{cardData.find((card) => card.name === suggestion)?.level}
                                          </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.scale && (
                                          <div className="flex text-gray-300 font-black text-lg">
                                            <p className="mr-2">Pendulum Scale:</p>{cardData.find((card) => card.name === suggestion)?.scale}
                                          </div>
                                        )}
                                        {cardData.find((card) => card.name === suggestion)?.linkval && (
                                          <div className="flex text-gray-300 font-black text-lg">
                                            <p className="mr-2">Link Value:</p>{cardData.find((card) => card.name === suggestion)?.linkval}
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
                              <div className="w-[20%] mt-[30px] p-1.25 flex justify-center  text-goldenrod text-center text-xl">
                                <button className="bg-goldenrod text-white w-[30px] mr-[5%] rounded-lg hover:text-red-600" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                  {'<'}
                                </button>
                                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                                <button className="bg-goldenrod text-white w-[30px] ml-[5%] rounded-lg hover:text-red-600" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
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
                  </main> 
                )}
                {galleryView && (
                  <div className="flex flex-col items-center w-full h-fit  px-[4vw]">
                    {gallerySuggestions.length > 0 && (
                      <div className="Searchbar-suggestion-grid">
                        {currentGallerySuggestions.map((suggestion) => (
                          <div key={suggestion}>
                            <img
                              src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url}
                              alt={suggestion}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-[90%] max-w-[540px] border-2 border-transparent hover:border-cyan-400"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {totalGalleryPages > 1 && (
                      <>
                      <div className="w-[13.5%] mt-[35px] p-1.25 flex justify-between text-goldenrod text-xl">
                        <button className="bg-goldenrod text-white w-[30px] mr-[1%] rounded-lg hover:text-orange-600" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                          {'<'}
                        </button>
                        <span>{`Page ${currentPage} of ${totalGalleryPages}`}</span>
                        <button className="bg-goldenrod text-white w-[30px] mr-[1%] rounded-lg hover:text-orange-600" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                        {'>'}
                        </button>
                      </div>
                      </>
                    )}
                  </div>
                )}
              </>   
            )}

      </div>
      <Footer/>
    </main>
  );
};


export default SearchBar;