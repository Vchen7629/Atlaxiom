import { useEffect, useState } from 'react';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import { useLocation } from 'react-router-dom';
import { useGetSpecificOwnedDeckQuery } from '../../app/api-slices/decksapislice.ts';
import DeckBuilderPageSidebarComponent from '../../components/editdeckpagecomponents/sidebar/deckbuilderpagesidebar.tsx';
import MainDeckCardZone from '@/components/editdeckpagecomponents/carddropzones/MainDeckCardsZone.tsx';
import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core';
import { Card } from '../../components/editdeckpagecomponents/types/datatypes.ts';
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import ExtraDeckCardZone from '@/components/editdeckpagecomponents/carddropzones/ExtraDeckCardsZone.tsx';
import SideDeckCardZone from '@/components/editdeckpagecomponents/carddropzones/SideDeckCardsZone.tsx';
import SaveDeckCardsButton from '@/components/editdeckpagecomponents/buttons/SaveDeckCardsButton.tsx';
import { GetOwnedCardsResponse } from '@/app/api-slices/types/ownedcardtypes.ts';
import { waveform } from 'ldrs';
import { EditDeckPageSidebarSkeleton } from '@/components/loadingcomponents/skeletons/components/editdeckpagesidebar.tsx';
import { EditDeckHeaderSkeleton } from '@/components/loadingcomponents/skeletons/components/editdeckpageheaderskeleton.tsx';

const DeckBuilderPage = () => {
    const location = useLocation();
    const { userId, deckId } = location.state || {};
    const { refetch, data: deckData, isLoading } = useGetSpecificOwnedDeckQuery({
        id: userId,
        DeckId: deckId
    })

    waveform.register()
    const [allCardsView, setAllCardsView] = useState<boolean>(true);
    const [allCardsListResults, setAllCardsListResults] = useState<Card[]>([]);
    const [collectionCardsView, setCollectionCardsView] = useState<boolean>(false);
    const [collectionCardData, setCollectionCardData] = useState<GetOwnedCardsResponse[]>([]); 
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
          const timer = setTimeout(() => {
            setShowLoading(false);
          }, 300);
          return () => clearTimeout(timer);
        }
    }, [isLoading]);

    useEffect(() => {
        if (deckId && userId) {
            refetch()
        }
    }, [deckId, userId]);

    const [hoveredCard, setHoveredCard] = useState<Card | null>(null);
    const [monsterCards, setMonsterCards] = useState<Card[]>([]);
    const [spellCards, setSpellCards] = useState<Card[]>([]);
    const [trapCards, setTrapCards] = useState<Card[]>([]);
    const [cardsToAddMainDeckPlaceHolder, setCardsToAddMainDeckPlaceHolder] = useState<Card[]>([]);
    const [cardsToDeleteMainDeckPlaceHolder, setCardsToDeleteMainDeckPlaceHolder] = useState<Card[]>([]);
    const [modifyMainDeckCardAmountPlaceHolder, setModifyMainDeckCardAmountPlaceHolder] = useState<Card[]>([]);
    const [extraDeckCards, setExtraDeckCards] = useState<Card[]>([]);
    const [cardsToAddExtraDeckPlaceHolder, setCardsToAddExtraDeckPlaceHolder] = useState<Card[]>([]);
    const [cardsToDeleteExtraDeckPlaceHolder, setCardsToDeleteExtraDeckPlaceHolder] = useState<Card[]>([]);
    const [modifyExtraDeckCardAmountPlaceHolder, setModifyExtraDeckCardAmountPlaceHolder] = useState<Card[]>([]);
    const [sideDeckCards, setSideDeckCards] = useState<Card[]>([]);
    const [cardsToAddSideDeckPlaceHolder, setCardsToAddSideDeckPlaceHolder] = useState<Card[]>([]);
    const [cardsToDeleteSideDeckPlaceHolder, setCardsToDeleteSideDeckPlaceHolder] = useState<Card[]>([]);
    const [modifySideDeckCardAmountPlaceHolder, setModifySideDeckCardAmountPlaceHolder] = useState<Card[]>([]);

    useEffect(() => {
        if (deckData) {  
            const mainCards: Card[] = (deckData as { main_deck_cards?: Card[]})?.main_deck_cards || [];
            const extraDeckCards: Card[] = (deckData as { extra_deck_cards?: Card[]})?.extra_deck_cards || [];
            const sideDeckCards: Card[] = (deckData as { side_deck_cards?: Card[]})?.side_deck_cards || [];
    
            const monsters = mainCards.filter(card => card.type && !["Spell Card", "Trap Card"].includes(card.type));
            const spells = mainCards.filter(card => card.type?.includes("Spell"));
            const traps = mainCards.filter(card => card.type?.includes("Trap"));
    
            setMonsterCards(monsters);
            setSpellCards(spells);
            setTrapCards(traps);
            setExtraDeckCards(extraDeckCards);
            setSideDeckCards(sideDeckCards);
        }
    }, [deckData]);

    const handleDragMove = (event: DragMoveEvent) => {
        const { active } = event;
    
        if (!active?.id) {
            setHoveredCard(null);
            return;
        }
    
        const draggedCard: any =
            allCardsListResults.find((card) => card.id === active.id) ||
            collectionCardData.find((card) => card._id === active.id);
    
        setHoveredCard(draggedCard);
    };

    const handleDragLeave = () => {
        setHoveredCard(null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!active.id) {
            return;
        }

        if (over) {
            const originalDraggedCard: any = 
                allCardsListResults.find((card) => card.id === active.id) || 
                collectionCardData.find((card) => card._id === active.id);

            if (!originalDraggedCard) return;

            const draggedCard = { ...originalDraggedCard };

            const addOrUpdateCard = (setDeckFunction: React.Dispatch<React.SetStateAction<any[]>>) => {
                setDeckFunction((prevDeck) => {
                    const existingCardIndex = prevDeck.findIndex(
                        (card) => (card.name || card.card_name) === (draggedCard.name || draggedCard.card_name)
                    );
    
                    if (existingCardIndex !== -1) {
                        const updatedDeck = [...prevDeck];
                        updatedDeck[existingCardIndex] = {
                            ...updatedDeck[existingCardIndex],
                            cardInDeckOwnedAmount: (updatedDeck[existingCardIndex].cardInDeckOwnedAmount || 1) + 1,
                        };
                        return updatedDeck;
                    } else {
                        return [...prevDeck, { ...draggedCard, cardInDeckOwnedAmount: 1 }];
                    }
                });

            };

            switch (over.id) {
                case "monstercard":
                    if (["Fusion", "Synchro", "XYZ", "Spell", "Trap"].every(type => !draggedCard.type?.includes(type))) {
                        addOrUpdateCard(setCardsToAddMainDeckPlaceHolder);
                        addOrUpdateCard(setMonsterCards);
                    } else return
                    break;
                case "spellcard":
                    if (draggedCard.type?.includes("Spell")) {
                        addOrUpdateCard(setCardsToAddMainDeckPlaceHolder);
                        addOrUpdateCard(setSpellCards);
                    } else return;
                    break;
                case "trapcard":
                    if (draggedCard.type?.includes("Trap")) {
                        addOrUpdateCard(setCardsToAddMainDeckPlaceHolder);
                        addOrUpdateCard(setTrapCards);
                    } else return;
                    break;
                case "extradeckcard":
                    if (["Synchro Monster", "Fusion Monster", "XYZ Monster"].some(type => draggedCard.type?.includes(type))) {
                        addOrUpdateCard(setExtraDeckCards);
                        addOrUpdateCard(setCardsToAddExtraDeckPlaceHolder);
                    } else return;
                    break;
                case "sidedeckcard":
                    if (draggedCard) {
                        addOrUpdateCard(setSideDeckCards);
                        addOrUpdateCard(setCardsToAddSideDeckPlaceHolder);
                    } else return;
                    break;
                default:
                    return;
            }
        } 
    }

    const sidebarprops = {
        userId,
        allCardsView, setAllCardsView,
        allCardsListResults, setAllCardsListResults,
        collectionCardsView, setCollectionCardsView,
        collectionCardData, setCollectionCardData
    }

    const maindeckprops = {
        userId,
        deckData,
        setModifyMainDeckCardAmountPlaceHolder,
        setCardsToDeleteMainDeckPlaceHolder,
        monsterCards, setMonsterCards,
        spellCards, setSpellCards,
        trapCards, setTrapCards,
        hoveredCard,
        allCardsView, setAllCardsView,
        collectionCardsView, setCollectionCardsView,
        allCardsListResults, setAllCardsListResults,
    }

    const extradeckprops = {
        deckData,
        extraDeckCards, setExtraDeckCards,
        hoveredCard,
        setModifyExtraDeckCardAmountPlaceHolder,
        setCardsToDeleteExtraDeckPlaceHolder,
    }

    const sidedeckprops = {
        deckData,
        sideDeckCards, setSideDeckCards,
        hoveredCard,
        setModifySideDeckCardAmountPlaceHolder,
        setCardsToDeleteSideDeckPlaceHolder,
    }

    const savebuttonprops = {
        userId,
        refetch,
        deckData,
        cardsToAddMainDeckPlaceHolder, setCardsToAddMainDeckPlaceHolder,
        cardsToDeleteMainDeckPlaceHolder, setCardsToDeleteMainDeckPlaceHolder,
        modifyMainDeckCardAmountPlaceHolder, setModifyMainDeckCardAmountPlaceHolder,
        cardsToAddExtraDeckPlaceHolder, setCardsToAddExtraDeckPlaceHolder,
        cardsToDeleteExtraDeckPlaceHolder, setCardsToDeleteExtraDeckPlaceHolder,
        modifyExtraDeckCardAmountPlaceHolder, setModifyExtraDeckCardAmountPlaceHolder,
        cardsToAddSideDeckPlaceHolder, setCardsToAddSideDeckPlaceHolder,
        cardsToDeleteSideDeckPlaceHolder, setCardsToDeleteSideDeckPlaceHolder,
        modifySideDeckCardAmountPlaceHolder, setModifySideDeckCardAmountPlaceHolder
    }

    return (
        <>  
        <Header/>
            <main className="flex flex-col md:flex-row  w-full min-h-[110vh] bg-[hsl(var(--background1))]">           
                {showLoading ? (
                    <div className='flex'>
                        <section className="flex flex-col w-full md:w-[80vw] pt-[76px]">
                            <EditDeckHeaderSkeleton />
                            <div className="flex flex-col h-[70vh] w-full space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                                <span>Loading</span>
                                <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                            </div>
                        </section>
                        <section className="hidden md:flex md:flex-col max-h-[110vh] w-[19vw] pt-[76px] px-4 justify-between">
                            <EditDeckPageSidebarSkeleton />
                        </section>
                    </div>
                ) : deckData && (
                    <DndContext onDragCancel={handleDragLeave} onDragMove={handleDragMove} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
                        <section className="flex flex-col w-full md:w-[80vw] pt-[76px]">
                            <header className="flex justify-between items-center p-5 w-full h-[17vh] bg-gradient-to-t from-[hsl(var(--homepagegradient1))] to-[hsl(var(--homepagegradient3))]">
                                <section className="flex flex-col h-full justify-between">
                                    <div className='text-2xl md:text-3xl font-black text-[hsl(var(--text))]'>{deckData?.deck_name}</div>
                                    <div>Created On: {deckData?.createdOn}</div>
                                    <span>Last Updated: {deckData?.lastUpdated}</span>
                                </section>
                                <SaveDeckCardsButton savebuttonprops={savebuttonprops}/>
                            </header>
                            <main className="flex flex-col flex-grow min-h-[87vh] bg-transparent">
                                    <section className="flex mb-[3vh] md:mb-[10vh]">
                                        <MainDeckCardZone maindeckprops={maindeckprops}/>
                                    </section>
                                    <section className="flex flex-col md:flex-row w-full mb-[3vh] md:mb-[10vh]">
                                        <div className="flex w-full md:w-1/2">
                                            <ExtraDeckCardZone extradeckprops={extradeckprops}/>
                                        </div>
                                        <div className="flex w-full md:w-1/2">
                                            <SideDeckCardZone sidedeckprops={sidedeckprops}/>
                                        </div>
                                    </section>
                            </main>
                        </section>
                        <section className="hidden md:flex md:flex-col max-h-[110vh] w-[20vw] pt-[76px] px-4 justify-between">
                            <DeckBuilderPageSidebarComponent sidebarprops={sidebarprops}/>
                        </section>
                    </DndContext>
                )}
            </main>
        <Footer/>
        </>
    );
};

export default  DeckBuilderPage