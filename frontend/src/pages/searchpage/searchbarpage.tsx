import { useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import SearchResults from './searchresults';
import GridListViewComponent from '../../components/searchpagecomponents/searchbar/grid_or_list_view';
import FilterCardComponent from '../../components/searchpagecomponents/searchresultfilter/FilterComponent';
import SearchBarComponent from '../../components/searchpagecomponents/searchbar/searchbar';
import ListViewSearchSuggestionsComponent from '../../components/searchpagecomponents/display/listviewsearchsuggestions';
import { ApiCardData, SearchResCardData } from '../../components/searchpagecomponents/types/datastructuretypes';
import GalleryViewSearchSuggestionsComponent from '../../components/searchpagecomponents/display/galleryviewsearchsuggestions';
import { CardSet } from '../../components/searchpagecomponents/types/searchresultcomptypes';
import ClearFilterButton from '../../components/searchpagecomponents/buttons/clearfilterbutton';
import FilterButton from '../../components/searchpagecomponents/buttons/filterbutton';
import PaginationComponent from '@/components/searchpagecomponents/pagination/pagination';

const SearchBarPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  const [monsterType, setMonsterType] = useState<string>("");
  const [spellType, setSpellType] = useState<string>("");
  const [trapType, setTrapType] = useState<string>("");
  const [attributeType, setAttributeType] = useState<string>("");

  const [levelFilter, setLevelFilter] = useState<number | null>(0);
  const [lessThanEqual, setLessThanEqual] = useState<boolean>(false);
  const [equal, setEqual] = useState<boolean>(true);
  const [greaterThanEqual, setGreaterThanEqual] = useState<boolean>(false);

  const [pendFilter, setPendFilter] = useState<number | null>(0);
  const [pendLessThanEqual, setPendLessThanEqual] = useState<boolean>(false);
  const [pendEqual, setPendEqual] = useState<boolean>(true);
  const [pendGreaterThanEqual, setPendGreaterThanEqual] = useState<boolean>(false);

  const [linkFilter, setLinkFilter] = useState<number | null>(0);
  const [linkLessThanEqual, setLinkLessThanEqual] = useState<boolean>(false);
  const [linkEqual, setLinkEqual] = useState<boolean>(true);
  const [linkGreaterThanEqual, setLinkGreaterThanEqual] = useState<boolean>(false);

  const [atkFilter, setAtkFilter] = useState<number | null>(0);
  const [atkLessThanEqual, setAtkLessThanEqual] = useState<boolean>(false);
  const [atkEqual, setAtkEqual] = useState<boolean>(true);
  const [atkGreaterThanEqual, setAtkGreaterThanEqual] = useState<boolean>(false);

  const [defFilter, setDefFilter] = useState<number | null>(0);
  const [defLessThanEqual, setDefLessThanEqual] = useState<boolean>(false);
  const [defEqual, setDefEqual] = useState<boolean>(true);
  const [defGreaterThanEqual, setDefGreaterThanEqual] = useState<boolean>(false);

  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);

  const suggestionsPerGalleryPage = 45;
  const suggestionsPerListPage = 15;
  const [totalListPages, setTotalListPages] = useState<number>(1);
  const [totalGalleryPages, setTotalGalleryPages] = useState<number>(1);
  const updateTotalListPages = (filteredCardsLength: number) => {
    setTotalListPages(Math.ceil(filteredCardsLength / suggestionsPerListPage));
  }
  const updateTotalGalleryPages = (filteredCardsLength: number) => {
    setTotalGalleryPages(Math.ceil(filteredCardsLength / suggestionsPerGalleryPage));
  }
  const [currentListPage, setListCurrentPage] = useState<number>(1);  
  const [currentGalleryPage, setGalleryCurrentPage] = useState<number>(1);
  

  const gridlistviewprops = {
    setListView,
    listView,
    setGalleryView,
    galleryView,
    setClickedOnCard,
    setTotalListNamesArray,
    setTotalGalleryNamesArray,
  };

  const searchbarprops = {
        cardData, setCardData,
        searchTerm, setSearchTerm,
        setClickedOnCard,
        setSelectedCardData,
        suggestionsPerListPage, 
        suggestionsPerGalleryPage,
        currentListPage, setListCurrentPage,
        currentGalleryPage, setGalleryCurrentPage,
        setCurrentPageListNamesArray,
        setCurrentPageGalleryNamesArray,
        setErrorMessage,
        totalListNamesArray, setTotalListNamesArray,
        totalGalleryNamesArray, setTotalGalleryNamesArray,
        monsterType,
        spellType,
        trapType,
        attributeType,
        levelFilter, lessThanEqual, equal, greaterThanEqual,
        pendFilter, pendLessThanEqual, pendEqual, pendGreaterThanEqual,
        linkFilter, linkLessThanEqual, linkEqual, linkGreaterThanEqual,
        atkFilter, atkLessThanEqual, atkEqual, atkGreaterThanEqual,
        defFilter, defLessThanEqual, defEqual, defGreaterThanEqual
  }

  const clearfilterprops = {
    setMonsterType,
    setSpellType,
    setTrapType,
    setAttributeType,
    setLevelFilter, setLessThanEqual, setEqual, setGreaterThanEqual,
    setPendFilter, setPendLessThanEqual, setPendEqual, setPendGreaterThanEqual,
    setLinkFilter, setLinkLessThanEqual, setLinkEqual, setLinkGreaterThanEqual,
    setAtkFilter, setAtkLessThanEqual, setAtkEqual, setAtkGreaterThanEqual,
    setDefFilter, setDefLessThanEqual, setDefEqual, setDefGreaterThanEqual,
  }

  const filterbuttonprops = {
    expandStatus, setExpandStatus,
    filterActive, setFilterActive
  }

  const listviewprops = {
    cardData,
    setSearchTerm,
    setClickedOnCard,
    currentPageListNamesArray,
    setTotalListNamesArray,
    setSelectedCardData,
    setErrorMessage,
    cardSets, setCardSets
  } 

  const galleryviewprops = {
    cardData,
    setSearchTerm,
    setClickedOnCard,
    currentPageGalleryNamesArray,
    setTotalGalleryNamesArray,
    setSelectedCardData,
    setErrorMessage,
    cardSets, setCardSets
  } 

  const filterprops = {
    expandStatus,
    monsterType, setMonsterType,
    spellType, setSpellType,
    trapType, setTrapType,
    attributeType, setAttributeType,
    levelFilter, setLevelFilter, 
    lessThanEqual, setLessThanEqual, 
    equal, setEqual, 
    greaterThanEqual, setGreaterThanEqual,
    pendFilter, setPendFilter,
    pendLessThanEqual, setPendLessThanEqual,
    pendEqual, setPendEqual,
    pendGreaterThanEqual, setPendGreaterThanEqual,
    linkFilter, setLinkFilter,
    linkLessThanEqual, setLinkLessThanEqual,
    linkEqual, setLinkEqual,
    linkGreaterThanEqual, setLinkGreaterThanEqual,
    atkFilter, setAtkFilter,
    atkLessThanEqual, setAtkLessThanEqual,
    atkEqual, setAtkEqual,
    atkGreaterThanEqual, setAtkGreaterThanEqual,
    defFilter, setDefFilter,
    defLessThanEqual, setDefLessThanEqual,
    defEqual, setDefEqual,
    defGreaterThanEqual, setDefGreaterThanEqual
  }

  const paginationprops = {
    listView,
    galleryView,
    currentListPage, setListCurrentPage,
    currentGalleryPage, setGalleryCurrentPage,
    suggestionsPerListPage,
    suggestionsPerGalleryPage,
    setCurrentPageListNamesArray,
    setCurrentPageGalleryNamesArray,
    totalListPages,
    totalGalleryPages,
    updateTotalListPages,
    updateTotalGalleryPages,
    searchTerm,
    totalListNamesArray,
    totalGalleryNamesArray,
  }


  return (
    <main className="min-h-[100vh]">
      <div className="flex flex-col min-h-[120vh] bg-[hsl(var(--background1))] justify-between overflow-auto" >
        <Header/>
        <main className="flex flex-grow py-[15vh] items-start ">            
          <div className={`flex flex-col ${expandStatus ? "w-[79%]" : "w-full"} ${selectedCardData ? "w-[100%]" : "w-[80%]"}`}>
              {!clickedOnCard &&  (
                <main>
                  <div className="flex w-full items-center mb-[5vh]">
                    <div className="text-4xl text-goldenrod ml-[4%]">
                      <strong>Card Search</strong>
                    </div>
                    <div className="w-[40vw]"><SearchBarComponent searchbarprops={searchbarprops}/></div>
                    <div className="flex ml-2 items-center">
                      <ClearFilterButton clearfilterprops={clearfilterprops}/>
                      <FilterButton filterbuttonprops={filterbuttonprops}/>
                    </div>
                    <div className="flex w-20 bg-footer rounded-xl ml-4">
                      <GridListViewComponent gridlistviewprops={gridlistviewprops}/>
                    </div>
                  </div>
                </main>
              )}
            
              {clickedOnCard && selectedCardData ? (
                <SearchResults selectedCardData={selectedCardData} cardSets={cardSets}/>
              ) : (
                <>
                    {listView && (
                      <main className='flex flex-col justify-center space-y-2 px-6'>
                        <PaginationComponent paginationprops={paginationprops}/>
                        <ListViewSearchSuggestionsComponent listviewprops={listviewprops}/>
                        <PaginationComponent paginationprops={paginationprops}/>
                      </main>
                    )}
                    {galleryView && (
                      <main className="flex flex-col w-full h-full space-y-2 px-6">
                        <PaginationComponent paginationprops={paginationprops}/>
                        <GalleryViewSearchSuggestionsComponent galleryviewprops={galleryviewprops}/>
                        <PaginationComponent paginationprops={paginationprops}/>
                      </main>
                  )}
                  
                </>   
              )}           
          </div>
          <div className={`fixed flex right-2 top-24 min-h-[80vh] ${expandStatus ? "w-[20%]" : "w-0 "}`}>
            {!clickedOnCard &&  (
              <FilterCardComponent filterprops={filterprops}/>
            )}
          </div>
        </main>   
        <Footer/>
      </div>
    </main>
  );
};


export default SearchBarPage;