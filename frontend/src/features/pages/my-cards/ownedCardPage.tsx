import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faFilter, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useGetOwnedCardsQuery } from '../../api-slices/ownedCardapislice.tsx';
import { useLocation } from 'react-router-dom';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { ListViewCardDisplayComponent } from "./carddisplaycomponents/listviewcarddisplaycomponent"
import FilterOwnedCards from './filtersidebarcomponents/ownedCardFilter.tsx';
import CardCollectionStatistics from './filtersidebarcomponents/ownedCardStatistics.tsx';
import MyCardsSearchbarComponent from './components/searchbar';
import { Card } from './types/ownedcardpagetypes';
import GridListViewComponent from './components/grid_or_list_view';
import { GalleryViewCardDisplayComponent } from './carddisplaycomponents/galleryviewcarddisplaycomponent';


const UserOwnedCardPage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  //const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState(null);
  
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

  const [levelFilter, setLevelFilter] = useState<number>(0);

  const [uniqueRarity, setUniqueRarity] = useState<string[]>([]);
  const [rarityFilter, setRarityFilter] = useState<string>('');

  const [listView, setListView] = useState<boolean>(true);

  const [galleryView, setGalleryView] = useState<boolean>(false);

  const filterProps = {
    searchTerm,
    setSearchTerm,
    setCardTypeFilter,
    isMonsterFilterActive, 
    monsterCount, 
    setIsMonsterFilterActive,
    isSpellFilterActive,
    spellCount,
    setIsSpellFilterActive,
    isTrapFilterActive,
    trapCount,
    setIsTrapFilterActive,
    uniqueSubtype,
    subTypeFilter,
    setSubTypeFilter,
    uniqueAttribute,
    attributeFilter,
    setAttributeFilter,
    uniqueArchtype,
    archeTypeFilter,
    setArcheTypeFilter,
    uniqueSet,
    setFilter,
    setSetFilter,
    levelFilter,
    setLevelFilter,
    uniqueRarity,
    rarityFilter,
    setRarityFilter,
    setListView,
    listView,
    setGalleryView,
    galleryView,
    filterpage,
    setFilterPage,
    statisticspage,
    setStatisticsPage,
    expandStatus,
  };

  const gridlistviewprops = {
    setListView,
    setGalleryView,
    listView,
    galleryView
  }

  const searchbarprops = {
    searchTerm,
    setSearchTerm,
  }

  const {
    data: ownedCards,
    refetch
  } = useGetOwnedCardsQuery(userId);

  const cardsToDisplay = Object.values(ownedCards?.entities || {}).flat() as Card[];

  const filteredCards: Card[] = cardsToDisplay.filter((card): card is Card => {
    if (!card || !card.card_name) return false;
    const matchesSearchTerm = card.card_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = cardTypeFilter ? card.type?.toLowerCase().includes(cardTypeFilter) : true;
    const matchesSubTypeFilter = subTypeFilter ? card.race?.toLowerCase().trim() === subTypeFilter.toLowerCase().trim() : true
    const matchesAttributeFilter = attributeFilter ? card.attribute?.toLowerCase().trim() === attributeFilter.toLowerCase().trim() : true
    const matchesArcheTypeFilter = archeTypeFilter ? card.archetype?.toLowerCase().trim() === archeTypeFilter.toLowerCase().trim() : true
    const matchesLevelFilter = levelFilter ? card.level === levelFilter : true
    const matchesSetFilter = setFilter ? card.set_name?.toLowerCase().trim() === setFilter.toLowerCase().trim() : true
    const matchesRarityFilter = rarityFilter ? card.rarity?.toLowerCase().trim() === rarityFilter.toLowerCase().trim() : true

    return !!matchesSearchTerm && !!matchesTypeFilter && !!matchesSubTypeFilter && !!matchesAttributeFilter && !!matchesArcheTypeFilter && !!matchesLevelFilter && !!matchesSetFilter && !!matchesRarityFilter;
  });

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId])

  useEffect(() => {
    if (ownedCards) {
      const allCards: Card[] = Object.values(ownedCards?.entities || {}).flat().filter(card => card) as Card[];

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
  

  return (
    <main className="flex flex-col min-h-[100vh]  ">
        <Header/>
        <div className=" bg-[hsl(var(--background1))] flex items-center justify-center ">
          <div className="text-white relative flex flex-col w-full min-h-[120vh] p-5 pt-20">
            <header className="relative items-center flex max-w-[100vw]  mt-[1%] mx-[3vw]">
              <section className="flex flex-col w-1/4">
                <div className="text-[40px] text-goldenrod font-bold">My Collection</div>
                <div className="text-lg text-gray-400">Last Edited: </div>
              </section>
              <section className="relative flex items-center space-x-2 w-3/4 ">
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
                    <div className="flex w-20 h-11 bg-footer rounded-xl absolute right-0">
                      <GridListViewComponent gridlistviewprops={gridlistviewprops}/>
                    </div>
              </section>
              
            </header>
           
            <main className="flex justify-between">
              <div className='w-full'>
                  <div>
                    {listView ? (
                      <main className="flex mt-8 justify-between">
                        <main className={`bg-[hsl(var(--background1))] ${expandStatus ? "w-3/4" : "w-full"} max-h-full`}>
                          <div className="flex font-black w-full h-8 bg-[hsl(var(--background3))] text-lg rounded-lg items-center">
                            <div className="w-[5%] pl-4"> Qty </div>
                            <div className="w-[27%]"> Name</div>
                            <div className="w-[12%]"> Set Code</div>
                            <div className="w-[20%]">Set</div>
                            <div className="w-[15%] pl-14">Rarity</div>
                            <div className="w-[7%] text-center ">Price</div>
                            <div className="w-[10%] text-center ml-[2%]">Options</div>
                          </div>
                          <ListViewCardDisplayComponent filteredCards={filteredCards}/>                                           
                        </main>
                        
                        <div className={`flex flex-col ${expandStatus ? "w-[24%] border-gray-600 border-2" : "w-0"} items-center bg-[hsl(var(--background4))] rounded-xl pt-8`}>
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
                        <main className="flex mt-8 justify-between">
                          <main className={`bg-[hsl(var(--background1))] ${expandStatus ? "w-3/4" : "w-full"} min-h-full`}>
                            <div className="flex font-black w-full h-8 bg-[hsl(var(--background3))] text-lg rounded-lg items-center">
                              
                            </div>
                            <GalleryViewCardDisplayComponent filteredCards={filteredCards}/>                                           
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
              </div>
              
            </main>
          </div>
        </div>
        <Footer/>
    </main>              
  );
};

export default UserOwnedCardPage;