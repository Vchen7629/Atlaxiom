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
//import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';

const DeckBuilderPage = () => {
    const location = useLocation();
    const { userId, deckId } = location.state || {};
    const [getSpecificDeck, { data: deckData, isLoading }] = useGetSpecificOwnedDeckMutation(); 
    
    const [allCardsView, setAllCardsView] = useState(true);
    const [allCardsListResults, setAllCardsListResults] = useState<Card[]>([]);
    const [collectionCardsView, setCollectionCardsView] = useState(false);
    const [collectionCardData, setCollectionCardData] = useState<OwnedCard[]>([]);    
    const [listView, setListView] = useState(true);
    const [galleryView, setGalleryView] = useState(false);

    useEffect(() => {
        if (deckId && userId) {
            getSpecificDeck({ id: userId, DeckData: { deckId } });
            console.log("deck data", deckData)
        }
    }, [deckId, userId, getSpecificDeck]);

    const deck = deckData?.entities?.undefined?.[0];

    const [isDropped, setIsDropped] = useState(false);
    const [mainDeckCards, setMainDeckCards] = useState<any[]>([]);
    const [monsterCards, setMonsterCards] = useState<any[]>([]);
    const [spellCards, setSpellCards] = useState<any[]>([]);
    const [trapCards, setTrapCards] = useState<any[]>([]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!active.id) {
            console.log("Dragged item does not have a valid ID");
            return;
        }

        if (over) {
            console.log("snday")
            setIsDropped(true);

            const draggedCard = 
                allCardsListResults.find((card) => card.id === active.id) || 
                collectionCardData.find((card) => card._id === active.id);

            switch (over.id) {
                case "monstercard":
                    if (draggedCard.type?.includes("Monster")) {
                        setMainDeckCards((prev) => [...prev, draggedCard]);
                        setMonsterCards((prev) => [...prev, draggedCard]);
                    } else return;
                    break;
                case "spellcard":
                    if (draggedCard.type?.includes("Spell")) {
                        setMainDeckCards((prev) => [...prev, draggedCard]);
                        setSpellCards((prev) => [...prev, draggedCard]);
                    } else return;
                    break;
                case "trapcard":
                    if (draggedCard.type?.includes("Trap")) {
                        setMainDeckCards((prev) => [...prev, draggedCard]);
                        setTrapCards((prev) => [...prev, draggedCard]);
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
        monsterCards,
        spellCards,
        trapCards,
        listView, setListView,
        galleryView, setGalleryView
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
                    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
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
                                    <MainDeckCardZone maindeckprops={maindeckprops}/>
                                    <section className="min-h-[25vh] w-full p-4 justify-between flex flex-col">
                                        < header className="flex w-full px-[3vw] justify-between text-[hsl(var(--text))]">
                                            <div className="font-black">Extra Deck</div>
                                            <div className="font-bold">Total Extra Deck Cards: {deck?.total_cards_extra_deck}</div>
                                        </header>
                                        <div className="bg-deckpage w-full h-[80%] rounded-2xl"></div>
                                    </section>
                                    <section className="min-h-[25vh] w-full p-4 justify-between">
                                        <header className="flex w-full px-[3vw] justify-between text-[hsl(var(--text))]">
                                            <div className="font-black">Side Deck</div>
                                            <div className="font-bold">Total Side Cards: {deck?.total_cards_side_deck}</div>
                                        </header>
                                        <div className="bg-deckpage w-full h-[90%] rounded-2xl"></div>
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