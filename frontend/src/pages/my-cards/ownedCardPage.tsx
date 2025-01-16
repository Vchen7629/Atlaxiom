import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useGetOwnedCardsQuery } from '../../features/api-slices/ownedCardapislice.ts';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import { ListViewCardDisplayComponent } from "../../components/cardcollectioncomponents/carddisplaycomponents/listviewcarddisplaycomponent.tsx"
import FilterOwnedCards from '../../components/cardcollectioncomponents/filtersidebar/components/ownedCardFilter.tsx';
import CardCollectionStatistics from '../../components/cardcollectioncomponents/filtersidebar/components/ownedCardStatistics.tsx';
import MyCardsSearchbarComponent from '../../components/cardcollectioncomponents/components/searchbar.tsx';
import { Card } from './ownedcardpagetypes.ts';
import GridListViewComponent from '../../components/cardcollectioncomponents/components/grid_or_list_view.tsx';
import { GalleryViewCardDisplayComponent } from '../../components/cardcollectioncomponents/carddisplaycomponents/galleryviewcarddisplaycomponent.tsx';
import { useGetSpecificUserQuery } from '@/features/api-slices/usersApiSlice.ts';
import PaginationComponent from '@/components/cardcollectioncomponents/paginationcomponents/pagination.tsx';
import { AddCardButton } from '@/components/cardcollectioncomponents/addcardbutton/addcardbutton.tsx';
import { OwnedCard } from '@/components/cardcollectioncomponents/types/dataStructures.ts';

const UserOwnedCardPage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [filterpage, setFilterPage] = useState<boolean>(true);
  const [expandStatus, setExpandStatus] = useState<boolean>(true);
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [statisticspage, setStatisticsPage] = useState<boolean>(false);

  const [cardTypeFilter, setCardTypeFilter] = useState<string>('');
  const [isMonsterFilterActive, setIsMonsterFilterActive] = useState<boolean>(false);
  const [isSpellFilterActive, setIsSpellFilterActive] = useState<boolean>(false);
  const [isTrapFilterActive, setIsTrapFilterActive] = useState<boolean>(false);

  const [subTypeFilter, setSubTypeFilter] = useState<string>('');
  const [attributeFilter, setAttributeFilter] = useState<string>('');
  const [archeTypeFilter, setArcheTypeFilter] = useState<string>('');
  const [setFilter, setSetFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<number | null>(0);
  const [rarityFilter, setRarityFilter] = useState<string>('');

  const [listView, setListView] = useState<boolean>(true);
  const [galleryView, setGalleryView] = useState<boolean>(false);

  const { data: ownedCards, refetch } = useGetOwnedCardsQuery(userId);
  const { data: userData, refetch: refetchOnUpdate} = useGetSpecificUserQuery(userId)
  const suggestionsPerGalleryPage = 45;
  const suggestionsPerListPage = 7;
  const [totalListPages, setTotalListPages] = useState<number>(1);
  const [totalGalleryPages, setTotalGalleryPages] = useState<number>(1);
  const updateTotalPages = (filteredCardsLength: number) => {
    setTotalListPages(Math.ceil(filteredCardsLength / suggestionsPerListPage));
    setTotalGalleryPages(Math.ceil(filteredCardsLength / suggestionsPerGalleryPage));
  }
  const [currentListPage, setListCurrentPage] = useState<number>(1);  
  const [currentGalleryPage, setGalleryCurrentPage] = useState<number>(1);

  const [currentListPageResults, setCurrentListPageResults] = useState<OwnedCard[]>([])
  const [currentGalleryPageResults, setCurrentGalleryPageResults] = useState<OwnedCard[]>([])

  useEffect(() => {
    if (userId) {
      refetch();
      refetchOnUpdate();
    }
  }, [userId, ownedCards, userData])

  const cardsToDisplay = useMemo(() => {
    return Object.values(ownedCards?.entities?.defaultId?.ownedCards || {}).flat() as Card[];
  }, [ownedCards]);

  console.log(cardsToDisplay)
            
  const filteredCards = useMemo(() => {
        return cardsToDisplay.filter((card): card is Card => {
            if (!card || !card.card_name) return false;
            const matchesSearchTerm = card.card_name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTypeFilter = cardTypeFilter ? card.type?.toLowerCase().includes(cardTypeFilter) : true;
            const matchesSubTypeFilter = subTypeFilter ? card.race?.toLowerCase().trim() === subTypeFilter.toLowerCase().trim() : true;
            const matchesAttributeFilter = attributeFilter ? card.attribute?.toLowerCase().trim() === attributeFilter.toLowerCase().trim() : true;
            const matchesArcheTypeFilter = archeTypeFilter ? card.archetype?.toLowerCase().trim() === archeTypeFilter.toLowerCase().trim() : true;
            const matchesLevelFilter = levelFilter ? card.level === levelFilter : true;
            const matchesSetFilter = setFilter ? card.set_name?.toLowerCase().trim() === setFilter.toLowerCase().trim() : true;
            const matchesRarityFilter = rarityFilter ? card.rarity?.toLowerCase().trim() === rarityFilter.toLowerCase().trim() : true;
        
            return (
                !! matchesSearchTerm &&
                !! matchesTypeFilter &&
                !! matchesSubTypeFilter &&
                !! matchesAttributeFilter &&
                !! matchesArcheTypeFilter &&
                !! matchesLevelFilter &&
                !! matchesSetFilter &&
                !! matchesRarityFilter
            );
                
        });
    }, [
        ownedCards,
        cardsToDisplay,
        searchTerm,
        cardTypeFilter,
        subTypeFilter,
        attributeFilter,
        archeTypeFilter,
        levelFilter,
        setFilter,
        rarityFilter,
    ]);

  const handleClickFilter = () => {
    setExpandStatus(!expandStatus)
    setFilterActive(!filterActive)
  }

  const searchbarprops = { 
    searchTerm, setSearchTerm,
  }

  const paginationprops = {
    filteredCards,
    listView,
    galleryView,
    currentListPage, setListCurrentPage,
    currentGalleryPage, setGalleryCurrentPage,
    suggestionsPerListPage,
    suggestionsPerGalleryPage,
    setCurrentListPageResults,
    setCurrentGalleryPageResults,
    totalListPages,
    totalGalleryPages,
    updateTotalPages
  }

  const filterProps = {
    ownedCards,
    expandStatus,
    setCardTypeFilter,
    isMonsterFilterActive, setIsMonsterFilterActive, 
    setIsSpellFilterActive, isSpellFilterActive,
    isTrapFilterActive, setIsTrapFilterActive,
    subTypeFilter, setSubTypeFilter,
    attributeFilter, setAttributeFilter,
    archeTypeFilter, setArcheTypeFilter,
    setLevelFilter,
    setFilter, setSetFilter,
    rarityFilter, setRarityFilter,
    filterpage, setFilterPage,
    statisticspage, setStatisticsPage,
    totalListPages,
    totalGalleryPages,
    currentListPage, setListCurrentPage,
    currentGalleryPage, setGalleryCurrentPage
  };

  const gridlistviewprops = {
    listView, setListView,
    galleryView, setGalleryView
  }

  const displaylistprops = { currentListPageResults } 
  const displaygalleryprops = { currentGalleryPageResults } 

  return (
    <main className="flex flex-col min-h-[100vh]  ">
        <Header/>
        <div className=" bg-[hsl(var(--background1))] flex items-center justify-center ">
          <div className="text-white relative flex flex-col w-full min-h-[130vh] p-5 pt-20">
            <header className="relative items-center flex w-full mt-[1%]">
              <section className="flex flex-col w-1/4">
                <div className="text-[40px] text-goldenrod font-bold">My Collection</div>
                <div className="text-lg text-gray-400">Last Edited: {userData?.entities[userId]?.lastCardUpdated}</div>
              </section>
              <section className="relative flex items-center space-x-2 w-full">
                  <div className="flex w-1/2">
                      <MyCardsSearchbarComponent searchbarprops={searchbarprops}/>
                    </div>
                    <button className={`flex justify-center items-center rounded-md h-9 w-24 ${expandStatus ? "bg-[hsl(var(--background3))]" : "bg-footer"}`} onClick={handleClickFilter}>
                      <FontAwesomeIcon className="mr-2" icon={faFilter}/>Filter
                    </button>
                    <AddCardButton userId={userId}/>
                    <button className="flex rounded-md px-4 items-center justify-center w-20 h-9 bg-footer">
                      <FontAwesomeIcon icon={faEllipsisVertical} className="mr-2 text-gray-400"/>More
                    </button>
                    <div className="flex w-20 h-11 bg-footer rounded-xl absolute right-[2vw]">
                      <GridListViewComponent gridlistviewprops={gridlistviewprops}/>
                    </div>
              </section>
              
            </header>
           
            <main className="flex justify-between"> 
                <div className='w-full'>
                    {listView ? (
                      <main className="flex justify-between">
                        <main className={`bg-[hsl(var(--ownedcardcollection))] ${expandStatus ? "w-3/4" : "w-full"} h-full rounded-xl`}>
                          <PaginationComponent paginationprops={paginationprops} />
                          <div className="flex font-black w-full h-8 bg-[hsl(var(--background3))] text-lg rounded-lg items-center">
                            <div className="w-[5%] pl-4"> Qty </div>
                            <div className="w-[27%]"> Name</div>
                            <div className="w-[12%]"> Set Code</div>
                            <div className="w-[20%]">Set</div>
                            <div className="w-[15%] pl-14">Rarity</div>
                            <div className="w-[7%] text-center ">Price</div>
                            <div className="w-[10%] text-center ml-[2%]">Options</div>
                          </div>
                          <ListViewCardDisplayComponent displaylistprops={displaylistprops}/>
                          <PaginationComponent paginationprops={paginationprops} />                                           
                        </main>
                        
                        <div className={`flex flex-col h-fit ${expandStatus ? "w-[24%] border-gray-600 border-2" : "w-0"} items-center bg-[hsl(var(--ownedcardcollection))] rounded-xl py-8`}>
                            {filterpage && (
                              <FilterOwnedCards filterProps={filterProps}/>
                            )}

                            {statisticspage && (
                              <CardCollectionStatistics filterProps={filterProps}/>
                            )}
                        </div>
                      </main>
                    ) : (
                      galleryView && (
                        <main className="flex justify-between">
                          <main className={`bg-[hsl(var(--ownedcardcollection))] ${expandStatus ? "w-3/4" : "w-full"} min-h-full rounded-xl`}>
                            <PaginationComponent paginationprops={paginationprops} />
                            <GalleryViewCardDisplayComponent displaygalleryprops={displaygalleryprops}/>                                           
                          </main>
                          
                          <div className={`flex flex-col ${expandStatus ? "w-[24%] border-gray-600 border-2" : "w-0"} items-center bg-[hsl(var(--background4))] rounded-3xl pt-8`}>
                              {filterpage && (
                                <FilterOwnedCards filterProps={filterProps}/>
                              )}

                              {statisticspage && (
                                <CardCollectionStatistics filterProps={filterProps}/>
                              )}
                          </div>
                      </main>                           
                        
                      )
                    )}
              </div>
            </main>
          </div>
        </div>
        <Footer/>
    </main>              
  );
};

export default UserOwnedCardPage;