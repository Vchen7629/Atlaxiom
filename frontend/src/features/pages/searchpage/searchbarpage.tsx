import { useState, useEffect } from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import SearchResults from './searchresults';
import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';
import FilterCardComponent from './searchfiltercomponents/FilterComponent';
import SearchBarComponent from './searchbarcomponents/searchbar';
import ListViewSearchSuggestionsComponent from './searchbarpagecomponents/listviewsearchsuggestions';
import { ApiCardData, SearchResCardData } from './types/datastructuretypes';
import GalleryViewSearchSuggestionsComponent from './searchbarpagecomponents/galleryviewsearchsuggestions';
import { CardSet } from './types/searchresultcomptypes';

const SearchBarPage= () => {
  const [cardName, setCardName] = useState<string>('');
  const [cardData, setCardData] = useState<ApiCardData[]>([]);
  const [cardSets, setCardSets] = useState<CardSet[]>([]);

  const [totalListNamesArray, setTotalListNamesArray] = useState<string[]>([]);
  const [currentPageListNamesArray, setCurrentPageListNamesArray] = useState<string[]>([]);
  const [totalGalleryNamesArray, setTotalGalleryNamesArray] = useState<string[]>([]);
  const [currentPageGalleryNamesArray, setCurrentPageGalleryNamesArray] = useState<string[]>([]);

  const [clickedOnCard, setClickedOnCard] = useState<boolean>(false);
  const [selectedCardData, setSelectedCardData] = useState<SearchResCardData | null>(null);
  const [/*errorMessage*/, setErrorMessage] = useState<string>('');
  const [expandStatus, setExpandStatus] = useState<boolean>(true);
  const [filterActive, setFilterActive] = useState<boolean>(false);


  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);

  const maxMainSuggestions = 99999;

  const suggestionsPerGalleryPage = 45;
  const suggestionsPerPage = 20;
  const totalPages = Math.ceil(totalListNamesArray.length / suggestionsPerPage);
  const totalGalleryPages = Math.ceil(totalGalleryNamesArray.length / suggestionsPerGalleryPage);
  const [currentListPage, setListCurrentPage] = useState(1);  
  const [currentGalleryPage, setGalleryCurrentPage] = useState(1);  

  useEffect(() => {
    const startIndex = (currentListPage - 1) * suggestionsPerPage;
    const endIndex = startIndex + suggestionsPerPage;
    const currentListSuggestions = totalListNamesArray.slice(startIndex, endIndex);
    setCurrentPageListNamesArray(currentListSuggestions);
  }, [currentListPage, totalListNamesArray, suggestionsPerPage]);

  useEffect(() => {
    const startIndex = (currentGalleryPage - 1) * suggestionsPerGalleryPage;
    const endIndex = startIndex + suggestionsPerGalleryPage;
    const currentGallerySuggestions = totalGalleryNamesArray.slice(startIndex, endIndex);
    setCurrentPageGalleryNamesArray(currentGallerySuggestions);
  }, [currentGalleryPage, totalGalleryNamesArray, suggestionsPerGalleryPage]);

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
    setTotalListNamesArray,
    setTotalGalleryNamesArray,
  };

  const searchbarprops = {
    cardData,
    setCardData,
    cardName,
    setCardName,
    setClickedOnCard,
    setSelectedCardData,
    setListCurrentPage,
    setGalleryCurrentPage,
    setErrorMessage,
    setTotalListNamesArray,
    setTotalGalleryNamesArray,
    maxMainSuggestions,
  }

  const listviewprops = {
    cardData,
    setCardName,
    setClickedOnCard,
    currentPageListNamesArray,
    setTotalListNamesArray,
    setSelectedCardData,
    setErrorMessage,
    totalPages,
    currentListPage,
    setListCurrentPage,
    setCardSets,
    cardSets
  } 

  const galleryviewprops = {
    cardData,
    setCardName,
    setClickedOnCard,
    currentPageGalleryNamesArray,
    setTotalGalleryNamesArray,
    setSelectedCardData,
    setErrorMessage,
    totalGalleryPages,
    currentGalleryPage,
    setGalleryCurrentPage,
    setCardSets,
    cardSets
  } 



  return (
    <main className="min-h-[100vh]">
      <div className="flex flex-col min-h-[120vh] bg-[hsl(var(--background1))] justify-between overflow-auto" >
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
                      <main className="flex w-full h-full">
                        <GalleryViewSearchSuggestionsComponent galleryviewprops={galleryviewprops}/>
                      </main>
                  )}
                  
                </>   
              )}           
          </div>
          <div className={`fixed flex right-4 top-24 min-h-[80vh] ${expandStatus ? "w-[20%]" : "w-0 "}`}>
            {!clickedOnCard &&  (
              <FilterCardComponent expandStatus={expandStatus}/>
            )}
          </div>
        </main>   
        <Footer/>
      </div>
    </main>
  );
};


export default SearchBarPage;