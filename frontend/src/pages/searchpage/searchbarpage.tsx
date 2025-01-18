import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import GridListViewComponent from '../../components/searchpagecomponents/searchbar/grid_or_list_view';
import FilterCardComponent from '../../components/searchpagecomponents/searchresultfilter/FilterComponent';
import SearchBarComponent from '../../components/searchpagecomponents/searchbar/searchbar';
import ListViewSearchSuggestionsComponent from '../../components/searchpagecomponents/display/listviewsearchsuggestions';
import { ApiCardData } from '../../components/searchpagecomponents/types/datastructuretypes';
import GalleryViewSearchSuggestionsComponent from '../../components/searchpagecomponents/display/galleryviewsearchsuggestions';
import ClearFilterButton from '../../components/searchpagecomponents/buttons/clearfilterbutton';
import FilterButton from '../../components/searchpagecomponents/buttons/filterbutton';
import PaginationComponent from '@/components/searchpagecomponents/pagination/pagination';
import { Toaster } from 'sonner';

const SearchBarPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cardData, setCardData] = useState<ApiCardData[]>([]);

  const [currentPageListNamesArray, setCurrentPageListNamesArray] = useState<string[]>([]);
  const [currentPageGalleryNamesArray, setCurrentPageGalleryNamesArray] = useState<string[]>([]);

  const [/*errorMessage*/, setErrorMessage] = useState<string>('');
  const [expandStatus, setExpandStatus] = useState<boolean>(true);
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [canClearFilters, setCanClearFilters] = useState<boolean>(false);

  const [monsterType, setMonsterType] = useState<string>("");
  const [spellType, setSpellType] = useState<string>("");
  const [trapType, setTrapType] = useState<string>("");
  const [attributeType, setAttributeType] = useState<string>("");
  const [setName, setSetName] = useState<string>("");

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

  const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  const fetchAllCardData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setCardData(data.data);
      } else {
        setCardData([]);
      }
    } catch (error) {
      setCardData([]);
    }
  };

  useEffect(() => {
      fetchAllCardData();
    }, []);

  const filteredCards = useMemo(() => { 
    const normalizedInput = searchTerm.toString().toLowerCase().replace(/[-\s]/g, '');
    const normalizedSpellType = spellType ? spellType.toLowerCase() : "";
    const normalizedTrapType = trapType ? trapType.toLowerCase() : "";
    const normalizedAttributeType = attributeType ? attributeType.toLowerCase() : "";

    return cardData.filter((card) => {
      if (!searchTerm) return false;
          
      const normalizedCardName = card.name.toString().toLowerCase().replace(/[-\s]/g, ''); 

      const matchesname = normalizedCardName.includes(normalizedInput);
      const matchesMonsterType = monsterType ? card.type?.toLowerCase() === monsterType.toLowerCase() : true ;
      const matchesSpellType = spellType? card.race?.toLowerCase() === normalizedSpellType && card.frameType?.toLowerCase() === 'spell' : true;
      const matchesTrapType = trapType ? card.race?.toLowerCase() == normalizedTrapType && card.frameType?.toLowerCase() === "trap" : true;
      const matchesAttributeType = attributeType? card.attribute?.toLowerCase() == normalizedAttributeType : true;
      const matchesSetName = setName ? card.card_sets?.some(set => set.set_name?.toLowerCase() === setName.toLowerCase()) : true;
          
      const matchesLevelFilter = levelFilter ?
        (lessThanEqual && card.level !== undefined && card.level <= levelFilter) ||
        (equal && card.level !== undefined && card.level === levelFilter) ||
        (greaterThanEqual && card.level !== undefined && card.level >= levelFilter)
      : true;
  
      const matchesPendFilter = pendFilter ? 
        (pendLessThanEqual && card.scale !== undefined && card.scale <= pendFilter) ||
        (pendEqual && card.scale !== undefined && card.scale === pendFilter) || 
        (pendGreaterThanEqual && card.scale !== undefined && card.scale >= pendFilter)
      : true;
  
      const matchesLinkFilter = linkFilter ? 
        (linkLessThanEqual && card.linkval !== undefined && card.linkval <= linkFilter) ||
        (linkEqual && card.linkval !== undefined && card.linkval === linkFilter) || 
        (linkGreaterThanEqual && card.linkval !== undefined && card.linkval >= linkFilter)
      : true;
  
      const matchesAtkFilter = atkFilter ?
        (atkLessThanEqual && card.atk !== undefined && card.atk <= atkFilter) ||
        (atkEqual && card.atk !== undefined && card.atk === atkFilter) ||
        (atkGreaterThanEqual && card.atk !== undefined && card.atk >= atkFilter) 
      : true;
  
      const matchesDefFilter = defFilter ?
        (defLessThanEqual && card.def !== undefined && card.def <= defFilter) ||
        (defEqual && card.def !== undefined && card.def === defFilter) ||
        (defGreaterThanEqual && card.def !== undefined && card.def >= defFilter) 
      : true;
  
      return (
        !! matchesname &&
        matchesMonsterType &&
        matchesSpellType && 
        matchesTrapType && 
        matchesAttributeType && 
        matchesLevelFilter && 
        matchesPendFilter && 
        matchesLinkFilter && 
        matchesAtkFilter &&
        matchesDefFilter && 
        matchesSetName
      ) 
    });
  }, [
    searchTerm,
    cardData, 
    monsterType, 
    spellType, 
    trapType, 
    attributeType,
    setName, 
    levelFilter, equal, greaterThanEqual, lessThanEqual, 
    pendFilter, pendLessThanEqual, pendEqual, pendGreaterThanEqual, 
    linkFilter, linkLessThanEqual, linkEqual, linkGreaterThanEqual, 
    atkFilter, atkLessThanEqual, atkEqual, atkGreaterThanEqual,
    defFilter, defLessThanEqual, defEqual, defGreaterThanEqual,
  ]);

  const gridlistviewprops = {
    listView, setListView,
    galleryView, setGalleryView,

  };

  const searchbarprops = {
    searchTerm, setSearchTerm,
    setListCurrentPage,
    setGalleryCurrentPage,
    setErrorMessage,
  }

  const clearfilterprops = {
    canClearFilters, setCanClearFilters,
    setMonsterType,
    setSpellType,
    setTrapType,
    setAttributeType,
    setLevelFilter, setLessThanEqual, setEqual, setGreaterThanEqual,
    setPendFilter, setPendLessThanEqual, setPendEqual, setPendGreaterThanEqual,
    setLinkFilter, setLinkLessThanEqual, setLinkEqual, setLinkGreaterThanEqual,
    setAtkFilter, setAtkLessThanEqual, setAtkEqual, setAtkGreaterThanEqual,
    setDefFilter, setDefLessThanEqual, setDefEqual, setDefGreaterThanEqual,
    setSetName
  }

  const filterbuttonprops = {
    expandStatus, setExpandStatus,
    filterActive, setFilterActive
  }

  const listviewprops = {
    searchTerm,
    currentPageListNamesArray,
    setErrorMessage,
  } 

  const galleryviewprops = {
    searchTerm,
    currentPageGalleryNamesArray,
    setErrorMessage,
  } 

  const filterprops = {
    cardData,
    setCanClearFilters,
    expandStatus,
    monsterType, setMonsterType,
    spellType, setSpellType,
    trapType, setTrapType,
    attributeType, setAttributeType,
    setName, setSetName,
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
    filteredCards,
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
  }


  return (
    <main className="min-h-[100vh]">
      <div className="flex flex-col min-h-[120vh] bg-[hsl(var(--background1))] justify-between overflow-auto" >
        <Header/>
        <main className="flex flex-grow py-[15vh] items-start ">
          <Toaster richColors  expand visibleToasts={4}/>            
          <div className={`flex flex-col ${expandStatus ? "w-[77.5%]" : "w-full"}`}>
                <main>
                  <div className="flex w-full items-center justify-between mb-[5vh]">
                    <div className="text-4xl text-goldenrod pl-8">
                      <strong>Card Search</strong>
                    </div>
                    <section className="flex">
                      <div className="w-[30vw]"><SearchBarComponent searchbarprops={searchbarprops}/></div>
                      <div className="flex ml-2 items-center">
                        <ClearFilterButton clearfilterprops={clearfilterprops}/>
                        <FilterButton filterbuttonprops={filterbuttonprops}/>
                      </div>
                    </section>
                    <div className="flex w-20 bg-footer rounded-xl ml-4">
                      <GridListViewComponent gridlistviewprops={gridlistviewprops}/>
                    </div>
                  </div>
                  {listView && (
                    <main className='flex flex-col w-full justify-center space-y-2 pl-8'>
                      <PaginationComponent paginationprops={paginationprops}/>
                      <ListViewSearchSuggestionsComponent listviewprops={listviewprops}/>
                      <PaginationComponent paginationprops={paginationprops}/>
                    </main>
                  )}

                  {galleryView && (
                    <main className="flex flex-col w-full h-full space-y-2 pl-8">
                      <PaginationComponent paginationprops={paginationprops}/>
                      <GalleryViewSearchSuggestionsComponent galleryviewprops={galleryviewprops}/>
                      <PaginationComponent paginationprops={paginationprops}/>
                    </main>
                  )}
                </main>       
          </div>
          <div className={`fixed flex right-2 top-24 min-h-[80vh] ${expandStatus ? "w-[20.5%]" : "w-0 "}`}>
            <FilterCardComponent filterprops={filterprops}/>
          </div>      
        </main>   
        <Footer/>
      </div>
    </main>
  );
};


export default SearchBarPage;