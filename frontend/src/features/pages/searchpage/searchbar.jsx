import React, { useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faGripHorizontal, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './styling/searchbar.css';
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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

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
      } catch (error) {
          console.error('Error posting card data:', error);
          setErrorMessage('Error adding Card to Collection.');
      }
    } else {
      console.error("No selected Card Data")
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
    <>
    <Header/>     
      <main className="bg-[#1f1d1d] xl:min-h-[82vh] flex flex-col items-center">   
          {!clickedOnCard &&  (
            <>
              <div className="flex relative top-10 w-[95%] justify-between items-center">
                <div className="text-5xl text-white ml-[4%]">
                  <strong>Card Search</strong>
                </div>
                <div className="flex w-[30%] h-[50px] rounded-2xl pl-5 relative top-12.5 border-2 border-gray-400 right-32 justify-start text-gold">
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
            </>
          )}
        
          {clickedOnCard && selectedCardData ? (
            <>
              <div className="flex relative top-10 w-[65%] justify-between items-center">
                <div className="text-5xl text-white ml-[5%]">
                  <strong>Card Search</strong>
                </div>
                <div className="flex w-[50%] h-[50px] rounded-2xl pl-5 relative top-12.5 border-2 border-gray-400 right-30 justify-start text-gold">
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
              <main className="flex absolute top-[22%] w-[70%] h-[50vh]">
                <img className="w-[400px] object-contain mx-[5%]"
                  src={selectedCardData.card_images[0].image_url}
                  alt={selectedCardData.name}
                /> 
                <div className="flex flex-col w-[80%] pt-[3%]">
                  <div className="text-4xl text-gold w-full">{selectedCardData.name}</div>
                  <div className="flex flex-col h-[79%] w-full pt-[4%]">
                    <div className="flex mb-[4%] w-[90%] justify-left">
                      <div className="flex text-xl max-w-1/2 text-white">
                        <div className="mr-5">Card type:</div> 
                        <div className="mr-10"> {selectedCardData.type}</div>
                      </div>
                      {selectedCardData.archetype && (
                        <div className="flex text-xl max-w-1/2 text-white">
                          <div className="mr-5">Archetype:</div>
                          <div className="mr-10">{selectedCardData.archetype}</div>
                        </div>
                      )}
                      <div className="flex text-xl max-w-1/2 text-white">
                        <div className="mr-5">Race:</div>
                        {selectedCardData.race}
                      </div>
                    </div>
                    <div className="flex mb-[4%] w-[90%] justify-left">
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
                        {(!successMessage && !errorMessage) && (
                          <button className="relative right-[10%] w-[150px] h-[50px] border-2 border-green-500 text-green-500" onClick={handleAddOwnedCardClick}>Add to Owned</button>
                        )}
                        {successMessage && (
                          <div className="flex relative r-[10%] justify-center items-center p-2.5 text-2xl text-green-500 border-2 border-green-500 w-[450px]">
                            {successMessage}
                          </div>
                        )}
                        {errorMessage && (
                          <div className="flex relative r-[10%] justify-center items-center p-2.5 text-2xl text-red-600 border-2 border-red-600 w-[450px]">
                            {errorMessage}
                          </div>
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
                  <div className="h-[58vh] overflow-auto w-[95%] my-[5%] flex flex-col items-center">
                    {mainSuggestions.length > 0 && (
                      <>
                        <div>
                          {currentMainSuggestions.map((suggestion) => (
                            <div
                              key={suggestion}
                              className={`${selectedSuggestion === suggestion ? 'selected' : ''}`}
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <div className="flex bg-[#1f1d1d]">
                                <img
                                  src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url}
                                  alt={suggestion}
                                  className="w-[6.5%] min-w-[%]"
                                />
                                <div className="flex w-full min-h-full flex-col justify-between border-2 border-transparent hover:border-gray-500">
                                  <div className="relative flex justify-between w-full">
                                    <div className="flex text-center items-center pl-[3%] w-1/2 text-goldenrod font-black text-2xl">{suggestion}</div>
                                    <div className="flex justify-evenly items-center w-[20%]">
                                      <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.type}</div>
                                      <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.race}</div>
                                      <div className="text-white text-xl">{cardData.find((card) => card.name === suggestion)?.attribute}</div>
                                    </div>
                                  </div>
                                  <div className="w-full flex flex-col min-h-[140px] mb-5 justify-between">
                                    <div className="font-black text-gray-400 text-lg w-1/2 pl-[3%]">{cardData.find((card) => card.name === suggestion)?.desc}</div>
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
                            <div className="w-[10%] mt-[30px] p-1.25 flex justify-between text-goldenrod text-center text-xl">
                              <button className="bg-goldenrod text-white w-[30px] mr-[1%] rounded-lg hover:text-red-600" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                                {'<'}
                              </button>
                              <span>{`Page ${currentPage} of ${totalPages}`}</span>
                              <button className="bg-goldenrod text-white w-[30px] ml-[1%] rounded-lg hover:text-red-600" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
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
                <div className="flex flex-col items-center w-[70%] justify-center min-h-[30vh] max-h-[60vh] my-[5%] overflow-hidden">
                  {gallerySuggestions.length > 0 && (
                    <div className="Searchbar-suggestion-grid">
                      {currentGallerySuggestions.map((suggestion) => (
                        <div key={suggestion}>
                          <img
                            src={cardData.find((card) => card.name === suggestion)?.card_images[0].image_url}
                            alt={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full max-w-[550px] border-2 border-transparent hover:border-cyan-400"
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

      </main>
    <Footer/>
    </>
  );
};


export default SearchBar;