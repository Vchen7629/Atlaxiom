import React, { useEffect, useState } from 'react';
import './styling/ownedcards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faCircleXmark,  faLeftLong, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useGetOwnedCardsQuery } from '../../api-slices/ownedCardapislice';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { AttributeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/attributedropdown"
import { ArchetypeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/archetypedropdown"
import { SubTypeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/subtypedrowndown"
import { CardSetDropDownComponent } from "../../../components/shadcn_components/dropdown_components/cardsetdropdown"
import { RarityRadialChartComponent } from "../../../components/shadcn_components/charts/rarityradialchart"
import { ComponentOwnedCardPopup } from "../../../components/shadcn_components/popups/ownedcarddetails"
import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';


const UserOwnedCardTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  const [searchTerm, setSearchTerm] = useState('');

  const [cardTypeFilter, setCardTypeFilter] = useState('');
  const [isMonsterFilterActive, setIsMonsterFilterActive] = useState(false);
  const [isSpellFilterActive, setIsSpellFilterActive] = useState(false);
  const [isTrapFilterActive, setIsTrapFilterActive] = useState(false);
  
  const [monsterCount, setMonsterCount] = useState(0);
  const [spellCount, setSpellCount] = useState(0);
  const [trapCount, setTrapCount] = useState(0);

  const handleMonsterFilter = () => {
    setCardTypeFilter('monster');
    setIsMonsterFilterActive(true);
    setIsSpellFilterActive(false);
    setIsTrapFilterActive(false);
  }

  const handleSpellFilter = () => {
    setCardTypeFilter('spell');
    setIsMonsterFilterActive(false);
    setIsSpellFilterActive(true);
    setIsTrapFilterActive(false);
  }

  const handleTrapFilter = () => {
    setCardTypeFilter('trap');
    setIsMonsterFilterActive(false);
    setIsSpellFilterActive(false);
    setIsTrapFilterActive(true);
  }
  const clearFilter = () => {
    setCardTypeFilter('');
    setIsMonsterFilterActive(false);
    setIsSpellFilterActive(false);
    setIsTrapFilterActive(false);
  }
  
  const [selectedCard, setSelectedCard] = useState(null)

  const [listView, setListView] = useState(true);

  const [galleryView, setGalleryView] = useState(false);


  const {
    data: ownedCards,
    refetch
  } = useGetOwnedCardsQuery(userId);


  const cardsToDisplay = Object.values(ownedCards?.entities || {}).flat();

  const filteredCards = cardsToDisplay.filter((card) => {
    if (!card || !card.card_name || !card.type) return false;
    const matchesSearchTerm = card.card_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = cardTypeFilter ? card.type.toLowerCase().includes(cardTypeFilter) : true;
    return matchesSearchTerm && matchesTypeFilter;
  });

  useEffect(() => {
    if (userId) {
        refetch(); 
    }
  }, [userId, refetch]);

  useEffect(() => {
    if (ownedCards) {
      const allCards = Object.values(ownedCards?.entities || {}).flat().filter(card => card);

      setMonsterCount(allCards.filter(card => card.type?.toLowerCase().includes('monster')).length);
      setSpellCount(allCards.filter(card => card.type?.toLowerCase().includes('spell')).length);
      setTrapCount(allCards.filter(card => card.type?.toLowerCase().includes('trap')).length);

    }
  }, [ownedCards]);

  const handleAddtoCollection = () => {
    navigate('/searchloggedin')
  }

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleClearClick = () => {
    setSearchTerm('')
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleBackToGridClick = () => {
    setSelectedCard(null)
  }

  return (
    <main className="flex flex-col min-h-[100vh] ">
        <Header/>
        <div className=" bg-[#1f1d1d] flex items-center justify-center ">
          <div className="text-white relative flex flex-col w-full min-h-[120vh] p-5 pt-20">
            <div className="relative items-center justify-between flex w-full mt-[1%]  ">
              <div className="text-[40px] ml-[5%] text-goldenrod"> 
                <strong>My Card Collection</strong> 
              </div>
             
              {!selectedCard && (
                <div className="relative right-[3vw]">
                  <div className="flex w-20 justify-between">
                    <GridListViewComponent 
                      setListView={setListView}
                      setGalleryView={setGalleryView}
                      listView={listView}
                      galleryView={galleryView}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-3/4 h-8 bg-goldenrod items-center">
              <div className="font-black text-xl w-[30%] pl-24"> Name</div>
              <div className="font-black text-xl w-[10%]  text-center "> Set Code</div>
              <div className="font-black text-xl w-[25%] text-center ">Set</div>
              <div className="font-black text-xl w-[15%]  text-center ">Rarity</div>
              <div className="font-black text-xl w-[7%] text-center ">Price</div>
              <div className="font-black text-md w-[10%] text-center ml-[2%]">Owned Amount</div>
            </div>
            <main className="flex justify-between">
              <div className='w-full mb-[1%]'>
                  <div>
                    {listView ? (
                      <main className="flex">
                        <main className=" bg-[#1f1d1d] w-[75%] max-h-full border-r-2 border-footer">
                          <ComponentOwnedCardPopup  filteredCards={filteredCards} onCardClick={handleCardClick}/>                                           
                        </main>
                        <div className="flex flex-col w-[25%] items-center py-[1%]">
                          <div className="relative w-[90%] flex h-11 items-center  rounded-2xl border-2 border-gray-500">
                            <FontAwesomeIcon icon={faSearch} className="text-xl ml-4"/>
                              <input 
                                className="pl-[3%] w-full bg-transparent outline-none"
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchTerm}
                                placeholder="Search Cards... "
                              />
                              <button className="curser-pointer absolute right-[3%] top-[19%] text-gray-400 bg-transparent border-transparent fa-xl" onClick={handleClearClick}>
                                <FontAwesomeIcon icon={faTimes}/>
                              </button>
                          </div>
                          <button className="w-[30%] rounded-3xl h-6 bg-footer my-[5%]"onClick={clearFilter}>Clear</button>
                          <div className="flex w-[92%] max-w-[100%] h-10">
                              <button
                                className={`w-[37%] flex ${isMonsterFilterActive ? 'text-gold' : 'text-white'} focus:outline-none`}
                                onClick={handleMonsterFilter}
                              >
                                <div className="bg-[url('../img/monstercardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                                <div className='w-fit h-full text-[14px] flex items-center'>Monster Cards ({monsterCount})</div>
                              </button>
                              <button
                                className={`w-[32%] flex ${isSpellFilterActive ? 'text-gold' : 'text-white'} focus:outline-none`}
                                onClick={handleSpellFilter}
                              >
                                <div className="bg-[url('../img/spellcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                                <div className='w-fit h-full text-[14px] flex items-center'>Spell Cards ({spellCount})</div>
                              </button>
                              <button
                                 className={`w-[31%] flex ${isTrapFilterActive ? 'text-gold' : 'text-white'} focus:outline-none`}
                                onClick={handleTrapFilter}
                              >
                                <div className="bg-[url('../img/trapcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                                <div className='w-fit h-full text-[14px] flex items-center'>Trap Cards ({trapCount})</div>
                              </button>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Subtype:</div>
                            <SubTypeDropDownComponent/>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Attribute:</div>
                            <AttributeDropDownComponent/>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center ">Card Archetype:</div>
                            <ArchetypeDropDownComponent/>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between items-center bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Level:</div>
                          </div>
                          <div className="flex mt-[5%] w-[22vw] justify-between bg-footer rounded-2xl">
                            <div className="flex h-full w-[7vw] text-sm justify-center items-center">Card Set:</div>
                            <CardSetDropDownComponent/>
                          </div>
                          <div className="mt-[5%]">
                            <RarityRadialChartComponent/>
                          </div>
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



export default UserOwnedCardTable;