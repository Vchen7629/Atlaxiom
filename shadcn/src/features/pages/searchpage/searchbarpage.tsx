import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import SearchResults from './searchresults';
import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';
import FilterCardComponent from './searchfiltercomponents/FilterComponent';
import SearchBarComponent from './searchbarcomponents/searchbar';
import ListViewSearchSuggestionsComponent from './searchbarpagecomponents/listviewsearchsuggestions';

const SearchBarPage= () => {
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
  const [filterActive, setFilterActive] = useState(false);


  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);

  const maxMainSuggestions = 99999;
  const navigate = useNavigate();

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

  const handleFilterClick = () => {
    setExpandStatus(!expandStatus)
    setFilterActive(!filterActive)
  }

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

  const searchbarprops = {
    cardData,
    setCardData,
    cardName,
    setCardName,
    setClickedOnCard,
    setSelectedCardData,
    setCurrentPage,
    setErrorMessage,
    setMainSuggestions,
    maxMainSuggestions,
    setSelectedSuggestion,
  }

  const listviewprops = {
    cardData,
    setCardName,
    setClickedOnCard,
    currentMainSuggestions,
    setMainSuggestions,
    selectedSuggestion,
    setSelectedCardData,
    setErrorMessage,
    totalPages,
    currentPage,
    setCurrentPage,
    setCardSets,
    cardSets
  } 



  return (
    <main className="min-h-[100vh]">
      <body className="flex flex-col min-h-[120vh] bg-[hsl(var(--background1))] justify-between overflow-auto" >
        <Header/>
        <main className="flex flex-grow py-[15vh] items-start ">            
          <div className={`flex flex-col ${expandStatus ? "w-[80%]" : "w-full"} ${selectedCardData ? "w-[100%]" : "w-[80%]"}`}>
              {!clickedOnCard &&  (
                <main>
                  <div className="flex relative w-full items-center mb-[5vh] pr-[3%]">
                    <div className="text-4xl text-goldenrod ml-[4%]">
                      <strong>Card Search</strong>
                    </div>
                    <SearchBarComponent searchbarprops={searchbarprops} />
                    <button className={`h-[40px] ml-4 w-[5vw] rounded-xl ${filterActive ? "bg-[hsl(var(--filterbutton))]" : "bg-[hsl(var(--background3))]"}`}  onClick={handleFilterClick}>Filter Card</button>
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
                        <ListViewSearchSuggestionsComponent listviewprops={listviewprops}/>
                      </main>
                    )}
                    {galleryView && (
                    <div className="flex flex-col items-center w-full h-fit  px-[4vw]">
                      {gallerySuggestions.length > 0 && (
                        <div className="grid grid-cols-10 gap-2 w-full h-full p-4 justify-items-start items-start" style={{ gridAutoRows: 'auto', alignContent: 'start' }}>
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
          <div className={`fixed flex right-4 top-24 min-h-[80vh] ${expandStatus ? "w-[20%]" : "w-0 "}`}>
            {!clickedOnCard &&  (
              <FilterCardComponent expandStatus={expandStatus} setExpandStatus={setExpandStatus}/>
            )}
          </div>
        </main>   
        <Footer/>
      </body>
    </main>
  );
};


export default SearchBarPage;