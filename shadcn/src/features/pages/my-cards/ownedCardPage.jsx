import React, { useEffect, useState } from 'react';
import './styling/ownedcards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useGetOwnedCardsQuery } from '../../api-slices/ownedCardapislice';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { ComponentOwnedCardPopup } from "../../../components/shadcn_components/popups/ownedcarddetails"
import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';
import FilterOwnedCards from './ownedCardFilter';
import CardCollectionStatistics from './ownedCardStatistics';


const UserOwnedCardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');

  const [filterpage, setFilterPage] = useState(true);
  const [statisticspage, setStatisticsPage] = useState(false);

  const [cardTypeFilter, setCardTypeFilter] = useState('');
  const [isMonsterFilterActive, setIsMonsterFilterActive] = useState(false);
  const [isSpellFilterActive, setIsSpellFilterActive] = useState(false);
  const [isTrapFilterActive, setIsTrapFilterActive] = useState(false);
  
  const [monsterCount, setMonsterCount] = useState(0);
  const [spellCount, setSpellCount] = useState(0);
  const [trapCount, setTrapCount] = useState(0);

  const [uniqueSubtype, setUniqueSubtype] = useState([]);
  const [subTypeFilter, setSubTypeFilter] = useState('');

  const [uniqueArchtype, setUniqueArchetype] = useState([]);
  const [archeTypeFilter, setArcheTypeFilter] = useState('');

  const [uniqueSet, setUniqueSet] = useState([]);
  const [setFilter, setSetFilter] = useState('');

  const [uniqueRarity, setUniqueRarity] = useState([]);
  
  const [selectedCard, setSelectedCard] = useState(null)

  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);

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
    uniqueArchtype,
    archeTypeFilter,
    setArcheTypeFilter,
    uniqueSet,
    setFilter,
    setSetFilter,
    setListView,
    listView,
    setGalleryView,
    galleryView,
  };

  const {
    data: ownedCards,
    refetch
  } = useGetOwnedCardsQuery(userId);

  const cardsToDisplay = Object.values(ownedCards?.entities || {}).flat();

  const filteredCards = cardsToDisplay.filter((card) => {
    if (!card || !card.card_name || !card.type) return false;
    const matchesSearchTerm = card.card_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = cardTypeFilter ? card.type.toLowerCase().includes(cardTypeFilter) : true;
    const matchesSubTypeFilter = subTypeFilter ? card.race?.toLowerCase().trim() === subTypeFilter.toLowerCase().trim() : true
    const matchesArcheTypeFilter = archeTypeFilter ? card.archetype?.toLowerCase().trim() === archeTypeFilter.toLowerCase().trim() : true
    const matchesSetFilter = setFilter ? card.set_name?.toLowerCase().trim() === setFilter.toLowerCase().trim() : true

    return matchesSearchTerm && matchesTypeFilter && matchesSubTypeFilter && matchesArcheTypeFilter && matchesSetFilter;
  });

  useEffect(() => {
    if (userId) {
        refetch(); 
    }
  }, [userId, refetch]);

  useEffect(() => {
    if (ownedCards) {
      const allCards = Object.values(ownedCards?.entities || {}).flat().filter(card => card);

      const subtypeList = new Set(allCards.map(card => card.race).filter(race => race));
      setUniqueSubtype([...subtypeList])

      const archetypeList = new Set(allCards.map(card => card.archetype).filter(archetype => archetype));
      setUniqueArchetype([...archetypeList])

      const setList = new Set(allCards.map(card => card.set_name).filter(set_name => set_name));
      setUniqueSet([...setList])

      const rarityList = new Set(allCards.map(card => card.rarity).filter(rarity => rarity));
      setUniqueRarity([...rarityList])

      console.log("all data", allCards)
      console.log("Card rarity data", uniqueRarity)

      const monsterCount = allCards
        .filter(card => card.type?.toLowerCase().includes('monster'))
        .reduce((total, card) => total + (card.ownedamount || 0), 0); 
      setMonsterCount(monsterCount);
      
      const spellCount = allCards
        .filter(card => card.type?.toLowerCase().includes('spell'))
        .reduce((total, card) => total + (card.ownedamount || 0), 0); 
      setSpellCount(spellCount);
      
      const trapCount = allCards
        .filter(card => card.type?.toLowerCase().includes('trap'))
        .reduce((total, card) => total + (card.ownedamount || 0), 0);
      setTrapCount(trapCount);

    }
  }, [ownedCards]);

  const handleAddtoCollection = () => {
    navigate('/searchloggedin')
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleFilterClick = () => {
    setFilterPage(true)
    setStatisticsPage(false)
  }

  const handleStatisticsClick = () => {
    setFilterPage(false)
    setStatisticsPage(true)
  }
  

  return (
    <main className="flex flex-col min-h-[100vh] ">
        <Header/>
        <div className=" bg-[hsl(var(--background1))]  flex items-center justify-center ">
          <div className="text-white relative flex flex-col w-full min-h-[120vh] p-5 pt-20">
            <div className="relative items-center justify-between flex w-full mt-[1%]  ">
              <div className="text-[40px] ml-[5%] text-goldenrod"> 
                <strong>My Card Collection</strong> 
              </div>
             
              {!selectedCard && (
                <div className="relative right-[3vw]">
                  <div className="flex w-20 bg-footer rounded-xl justify-between">
                    <GridListViewComponent filterProps={filterProps}/>
                  </div>
                </div>
              )}
            </div>
           
            <main className="flex justify-between">
              <div className='w-full mb-[1%]'>
                  <div>
                    {listView ? (
                      <main className="flex mt-8">
                        <main className=" bg-[hsl(var(--background1))] w-[75%] max-h-full">
                          <div className="flex w-full h-8 bg-[hsl(var(--background3))] rounded-tr-xl rounded-tl-xl items-center">
                            <div className="font-black text-xl w-[30%] pl-24"> Name</div>
                            <div className="font-black text-xl w-[10%]  text-center "> Set Code</div>
                            <div className="font-black text-xl w-[15%] text-center ">Set</div>
                            <div className="font-black text-xl w-[25%] pl-44 ">Rarity</div>
                            <div className="font-black text-xl w-[7%] text-center ">Price</div>
                            <div className="font-black text-md w-[10%] text-center ml-[2%]">Owned Amount</div>
                          </div>
                          <ComponentOwnedCardPopup filteredCards={filteredCards} onCardClick={handleCardClick}/>                                           
                        </main>
                        <div className="flex flex-col w-1/4 items-center">
                          <div className="items-center h-8 flex mb-8 justify-between bg-gray-600 rounded-2xl">
                            <button className={`px-4 rounded-2xl w-fit h-8 font-black ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>Filter Cards</button>
                            <button className={`px-4 rounded-2xl w-fit h-8 font-black ${statisticspage ? "bg-[hsl(var(--background3))]" : "bg-transparent text-gray-400"}`} onClick={handleStatisticsClick}>Collection Statistics</button>
                          </div>
                            {filterpage && (
                              <FilterOwnedCards filterProps={filterProps}/>
                            )}

                            {statisticspage && (
                              <CardCollectionStatistics />
                            )}
                        </div>
                      </main>
                    ) : (
                      galleryView && (
                          <main className="My-Card-Display-Grid">
                            {filteredCards.length > 0 ? (
                              <>
                                {filteredCards.map((card, index) => (
                                  <div 
                                    key={index} 
                                    className="flex flex-col m-2.5"
                                  >
                                    <div 
                                      className="text-m text-goldenrod max-w-[130px] h-[50px] text-center"
                                      onClick={() => handleCardClick(card)}
                                    >
                                      {card.card_name}
                                    </div>
                                    <img 
                                      src={card.image_url} 
                                      alt={card.card_name} 
                                      className="max-h-[200px] my-2.5" 
                                      onClick={() => handleCardClick(card)}
                                    />
                                    <div className="flex w-full h-[10%] items-center">
                                      <div className="text-goldenrod mr-[5px]">owned:</div>
                                      <div className="mx-[5%]">{card.ownedamount}</div>
                                      <div className="flex flex-col mr-[5%]">
                                        <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleIncreaseClick((card.card_name))}>
                                          <FontAwesomeIcon icon={faChevronUp}/>
                                        </button>
                                        <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleDecreaseClick((card.card_name))}>
                                          <FontAwesomeIcon icon={faChevronDown}/>
                                        </button>
                                      </div>
                                      <button className="text-red-600 cursor-pointer"onClick={() => handleDeleteCardClick((card.card_name))}>
                                        <FontAwesomeIcon icon={faCircleXmark}/>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div className="flex h-full min-w-[90vw] justify-center pt-[25%] text-3xl text-gray-400 font-black">
                                <p>No cards available. Start adding to your <button className="text-cyan-400" onClick={handleAddtoCollection}>Collection</button></p>
                              </div>
                            )}                       
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