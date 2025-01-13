import { useEffect, useState } from 'react';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import { useLocation } from 'react-router-dom';
import { useGetSpecificOwnedDeckMutation } from '../../features/api-slices/decksapislice.ts';
import DeckBuilderPageSidebarComponent from '../../components/deckcomponents/decksidebar/deckbuilderpagesidebar.tsx';
import MainDeckCardZone from '@/components/deckcomponents/editdeckcomponents/MainDeckCardsZone.tsx';
import { DndContext } from '@dnd-kit/core';
import { Card, OwnedCard } from '../../components/deckcomponents/types/datatypes.ts';
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import ExtraDeckCardZone from '@/components/deckcomponents/editdeckcomponents/ExtraDeckCardsZone.tsx';
import SideDeckCardZone from '@/components/deckcomponents/editdeckcomponents/SideDeckCardsZone.tsx';

const DeckBuilderPage = () => {
    const location = useLocation();
    const { userId, deckId } = location.state || {};
    const [getSpecificDeck, { data: deckData, isLoading }] = useGetSpecificOwnedDeckMutation(); 
    
    const [allCardsView, setAllCardsView] = useState(true);
    const [allCardsListResults, setAllCardsListResults] = useState<Card[]>([]);
    const [collectionCardsView, setCollectionCardsView] = useState(false);
    const [collectionCardData, setCollectionCardData] = useState<OwnedCard[]>([]);    

    useEffect(() => {
        if (deckId && userId) {
            getSpecificDeck({ id: userId, DeckData: { deckId } });
            console.log("deck data", deckData)
        }
    }, [deckId, userId, getSpecificDeck]);

    const deck = deckData?.entities?.undefined?.[0];

    const [hoveredCard, setHoveredCard] = useState<any>(null);
    const [mainDeckCards, setMainDeckCards] = useState<any[]>([]);
    const [extraDeckCards, setExtraDeckCards] = useState<any[]>([]);
    const [sideDeckCards, setSideDeckCards] = useState<any[]>([]);
    const [monsterCards, setMonsterCards] = useState<any[]>([]);
    const [spellCards, setSpellCards] = useState<any[]>([]);
    const [trapCards, setTrapCards] = useState<any[]>([]);

    const handleDragMove = (event: any) => {
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

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!active.id) {
            console.log("Dragged item does not have a valid ID");
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
                        addOrUpdateCard(setMainDeckCards);
                        addOrUpdateCard(setMonsterCards);
                    } else return
                    break;
                case "spellcard":
                    if (draggedCard.type?.includes("Spell")) {
                        addOrUpdateCard(setMainDeckCards);
                        addOrUpdateCard(setSpellCards);
                    } else return;
                    break;
                case "trapcard":
                    if (draggedCard.type?.includes("Trap")) {
                        addOrUpdateCard(setMainDeckCards);
                        addOrUpdateCard(setTrapCards);
                    } else return;
                    break;
                case "extradeckcard":
                    if (["Synchro Monster", "Fusion Monster", "XYZ Monster"].some(type => draggedCard.type?.includes(type))) {
                        addOrUpdateCard(setExtraDeckCards);
                    } else return;
                    break;
                case "sidedeckcard":
                    if (draggedCard) {
                        addOrUpdateCard(setSideDeckCards);
                    } else return;
                    break;
                default:
                    return;
            }
        } 
    }

    useEffect(() => {
        console.log("new array", monsterCards)
        console.log("new array", spellCards)
        console.log("new array", trapCards)
    }, [monsterCards, spellCards, trapCards])

    const sidebarprops = {
        userId,
        allCardsView, setAllCardsView,
        allCardsListResults, setAllCardsListResults,
        collectionCardsView, setCollectionCardsView,
        collectionCardData, setCollectionCardData
    }

    const maindeckprops = {
        deck,
        monsterCards, setMonsterCards,
        spellCards, setSpellCards,
        trapCards, setTrapCards,
        hoveredCard
    }

    const extradeckprops = {
        deck,
        extraDeckCards, setExtraDeckCards,
        hoveredCard
    }

    const sidedeckprops = {
        deck,
        sideDeckCards, setSideDeckCards,
        hoveredCard
    }

    /*const filterProps = {
        setListView,
        listView,
        setGalleryView,
        galleryView
    }*/

    return (
        <>  
        <Header/>
            <main className="flex w-full min-h-[110vh] bg-[hsl(var(--background1))]">           
                {!isLoading && deckData && (
                    <DndContext onDragCancel={handleDragLeave} onDragMove={handleDragMove} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
                        <section className="flex flex-col w-[80vw] pt-[76px]">
                            <header className="flex justify-between items-center p-5 w-full h-[17vh] bg-gradient-to-t from-[hsl(var(--homepagegradient1))] to-[hsl(var(--homepagegradient3))]">
                                <section className="flex flex-col h-full justify-between">
                                    <div className='text-3xl font-black text-[hsl(var(--text))]'>{deck?.deck_name}</div>
                                    <div>Created On: {deck?.createdOn}</div>
                                </section>
                                <section>
                                    <button className="flex text-sm flex-col px-8 py-2 items-center rounded-2xl bg-blue-400">
                                        <div>Save</div>
                                        <div>{deck?.lastUpdated}</div>
                                    </button>
                                </section>
                            </header>
                            <main className="flex flex-col flex-grow min-h-[87vh] bg-transparent">
                                    <section className="flex mb-[10vh]">
                                        <MainDeckCardZone maindeckprops={maindeckprops}/>
                                    </section>
                                    <section className="flex w-full mb-[10vh]">
                                        <div className="flex w-1/2">
                                            <ExtraDeckCardZone extradeckprops={extradeckprops}/>
                                        </div>
                                        <div className="flex w-1/2">
                                            <SideDeckCardZone sidedeckprops={sidedeckprops}/>
                                        </div>
                                    </section>
                            </main>
                        </section>
                        <section className="flex flex-col max-h-[110vh] w-[20vw] pt-[76px] px-4 justify-between">
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