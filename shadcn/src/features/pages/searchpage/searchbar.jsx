import React, { useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import './styling/searchbar.css';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import FilterResults from './filterresults';
import SearchResults from './searchresults';
import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [expandStatus, setExpandStatus] = useState(true);


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

      const normalizedInput = inputValue.toLowerCase().replace(/[-\s]/g, ''); 
      const filteredSuggestions = cardData.filter((card) => {
        const normalizedCardName = card.name.toLowerCase().replace(/[-\s]/g, ''); 
        return normalizedCardName.includes(normalizedInput);
      });

      setMainSuggestions(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));
      setGallerySuggestions(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));
    }, 500),
    [cardData]
  );

  const suggestionsPerGalleryPage = 45;
  const suggestionsPerPage = 20;
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
    debouncedSearchCard(inputValue);
  };

  const handleSuggestionClick = (suggestion) => {
    setCardName(suggestion);
    setClickedOnCard(true);
    setErrorMessage(null);
    setMainSuggestions([]);
    setSelectedCardData(null);
    fetchSelectedCardData(suggestion);
  };

  const handleClearClick = () => {
    setCardName('');
    setError(null);
    setErrorMessage(null);
    setMainSuggestions([]);
    setGallerySuggestions([]);
    setSelectedCardData(null);
    setSelectedSuggestion(null);
    setClickedOnCard(false);
  };

  const filterProps = {
    setListView,
    listView,
    setGalleryView,
    galleryView,
    setClickedOnCard,
    setCurrentPage,
    setMainSuggestions,
    setGallerySuggestions,
  };

  return (
    <main className="min-h-[100vh]">
      <body className="flex flex-col min-h-[120vh] bg-[hsl(var(--background1))] justify-between overflow-auto" >
        <Header/>
        <main className="flex flex-grow py-[5%] items-start ">            
          <div className={`flex flex-col ${expandStatus ? "w-[80%]" : "w-full"} ${selectedCardData ? "w-[100%]" : "w-[80%]"}`}>
              {!clickedOnCard &&  (
                <main>
                  <div className="flex relative w-full items-center mb-[5vh] pr-[3%]">
                    <div className="text-4xl text-goldenrod ml-[4%]">
                      <strong>Card Search</strong>
                    </div>
                    <div className="flex w-[40vw] h-[50px] ml-[10%] pl-5 relative border-2 border-gray-400 justify-start text-gold">                      
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
                    <button className="h-[40px] ml-4 w-[5vw] bg-[hsl(var(--filterbutton))] rounded-xl " onClick={() => setExpandStatus(!expandStatus)}>Filter Card</button>
                    <div className="flex absolute w-20 bg-footer rounded-xl right-0 mr-20">
                      <GridListViewComponent filterProps={filterProps}/>
                    </div>
                  </div>
                </main>
              )}
            
              {clickedOnCard && selectedCardData ? (
                <SearchResults selectedCardData={selectedCardData} cardSets={cardSets}/>
              ) : (
                <>
                    {listView && (
                      <main className='flex justify-center'> 
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
          <div className={`fixed flex right-0 top-0 min-h-[100vh] ${expandStatus ? "w-[20%]" : "w-0 "}`}>
            {!clickedOnCard &&  (
              <FilterResults expandStatus={expandStatus} setExpandStatus={setExpandStatus}/>
            )}
          </div>
        </main>   
        <Footer/>
      </body>
    </main>
  );
};


export default SearchBar;