import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFilter, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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
import { OwnedCard } from '@/components/cardcollectioncomponents/types/paginationtypes.ts';

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
  
  const [monsterCount, setMonsterCount] = useState<number>(0);
  const [spellCount, setSpellCount] = useState<number>(0);
  const [trapCount, setTrapCount] = useState<number>(0);

  const [uniqueSubtype, setUniqueSubtype] = useState<string[]>([]);
  const [subTypeFilter, setSubTypeFilter] = useState<string>('');

  const [uniqueAttribute, setUniqueAttribute] = useState<string[]>([]);
  const [attributeFilter, setAttributeFilter] = useState<string>('');

  const [uniqueArchtype, setUniqueArchetype] = useState<string[]>([]);
  const [archeTypeFilter, setArcheTypeFilter] = useState<string>('');

  const [uniqueSet, setUniqueSet] = useState<string[]>([]);
  const [setFilter, setSetFilter] = useState<string>('');

  const [levelFilter, setLevelFilter] = useState<number | null>(0);

  const [uniqueRarity, setUniqueRarity] = useState<string[]>([]);
  const [rarityFilter, setRarityFilter] = useState<string>('');

  const [listView, setListView] = useState<boolean>(true);
  const [galleryView, setGalleryView] = useState<boolean>(false);

  const { data: ownedCards, refetch } = useGetOwnedCardsQuery(userId);
  const {data: userData, refetch: refetchOnUpdate} = useGetSpecificUserQuery(userId)
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
  }, [userId])

  useEffect(() => {
    if (ownedCards) {
      const allCards: Card[] = Object.values(ownedCards?.entities?.defaultId?.ownedCards || {}).flat().filter(card => card) as Card[];

      const subtypeList = new Set(allCards.map((card: any) => card.race).filter(race => race));
      setUniqueSubtype([...subtypeList])

      const attributeList = new Set(allCards.map((card: any) => card.attribute).filter(attribute => attribute));
      setUniqueAttribute([...attributeList])

      const archetypeList = new Set(allCards.map((card: any) => card.archetype).filter(archetype => archetype));
      setUniqueArchetype([...archetypeList])

      const setList = new Set(allCards.map((card: any) => card.set_name).filter(set_name => set_name));
      setUniqueSet([...setList])

      const rarityList = new Set(allCards.map((card: any) => card.rarity).filter(rarity => rarity));
      setUniqueRarity([...rarityList])

      const monsterCount = allCards
        .filter((card: any): card is Card => card.type?.toLowerCase().includes('monster'))
        .reduce((total, card) => total + (card.ownedamount || 0), 0); 
      setMonsterCount(monsterCount);
      
      const spellCount = allCards
        .filter((card: any) => card.type?.toLowerCase().includes('spell'))
        .reduce((total, card) => total + (card.ownedamount || 0), 0); 
      setSpellCount(spellCount);
      
      const trapCount = allCards
        .filter((card: any) => card.type?.toLowerCase().includes('trap'))
        .reduce((total, card) => total + (card.ownedamount || 0), 0);
      setTrapCount(trapCount);

    }
  }, [ownedCards]);

  const handleClickFilter = () => {
    setExpandStatus(!expandStatus)
    setFilterActive(!filterActive)
  }

  const searchbarprops = { 
    searchTerm, setSearchTerm,
    ownedCards,
    setCurrentListPageResults,
    cardTypeFilter,
    subTypeFilter,
    attributeFilter,
    archeTypeFilter,
    levelFilter,
    setFilter,
    rarityFilter
  }

  const paginationprops = {
    listView,
    galleryView,
    searchTerm,
    ownedCards,
    currentListPage, setListCurrentPage,
    currentGalleryPage, setGalleryCurrentPage,
    suggestionsPerListPage,
    suggestionsPerGalleryPage,
    setCurrentListPageResults,
    setCurrentGalleryPageResults,
    cardTypeFilter,
    subTypeFilter,
    attributeFilter,
    archeTypeFilter,
    levelFilter,
    setFilter,
    rarityFilter,
    totalListPages,
    totalGalleryPages,
    updateTotalPages
  }

  const filterProps = {
    expandStatus,
    searchTerm, setSearchTerm,
    setCardTypeFilter,
    isMonsterFilterActive, setIsMonsterFilterActive,
    monsterCount, 
    setIsSpellFilterActive, isSpellFilterActive,
    spellCount,
    isTrapFilterActive, setIsTrapFilterActive,
    trapCount,
    uniqueSubtype,
    subTypeFilter, setSubTypeFilter,
    uniqueAttribute,
    attributeFilter, setAttributeFilter,
    uniqueArchtype,
    archeTypeFilter, setArcheTypeFilter,
    setLevelFilter,
    uniqueSet,
    setFilter, setSetFilter,
    uniqueRarity,
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
            <header className="relative items-center flex w-full  mt-[1%]">
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
                    <button className="flex items-center justify-center rounded-md w-28 h-9 bg-blue-500">
                      <FontAwesomeIcon className="mr-2" icon={faPlusCircle}/>Add Card
                    </button>
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
                        
                        <div className={`flex flex-col ${expandStatus ? "w-[24%] border-gray-600 border-2" : "w-0"} items-center bg-[hsl(var(--background4))] rounded-xl py-8`}>
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