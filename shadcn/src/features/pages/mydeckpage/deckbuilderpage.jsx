import React, { useEffect, useState} from 'react';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import "./styling/deck-creation.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetSpecificOwnedDeckMutation } from '../../api-slices/decksapislice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';

const DeckBuilderPage = () => {
    const location = useLocation();
    const { userId, deckId } = location.state || {};
    const navigate = useNavigate()
    const [getSpecificDeck, { data: deckData, error, isLoading }] = useGetSpecificOwnedDeckMutation();
    const [cardName, setCardName] = useState('');
    const [listView, setListView] = useState(true);
    const [galleryView, setGalleryView] = useState(false);

    useEffect(() => {
        if (deckId && userId) {
            getSpecificDeck({ id: userId, DeckData: { deckId } });
            console.log("deck data", deckData)
        }
    }, [deckId, userId, getSpecificDeck]);

    const deck = deckData?.entities?.undefined?.[0];

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setCardName(inputValue);
    };

    const handleClearClick = () => {
        setCardName('');
    };

    const filterProps = {
        setListView,
        listView,
        setGalleryView,
        galleryView,
      };

    return (
        <>  
        <Header/>
            <main className="flex w-full min-h-[100vh] bg-[hsl(var(--background1))]">           
                {!isLoading && deckData && (
                    <>
                    <section className="flex flex-col w-[80vw] pt-[76px]">
                        <header className="flex justify-between items-center p-5 w-full h-[15vh] bg-gradient-to-t from-[hsl(var(--homepagegradient1))] to-[hsl(var(--homepagegradient3))]">
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
                        <body className="flex flex-col h-[85vh] bg-transparent">
                            <section className="flex flex-col justify-between h-1/2 w-full  p-4">
                                <header className="flex w-full px-[3vw] justify-between text-[hsl(var(--text))]">
                                    <div className="font-black">Main Deck</div>
                                    <div className="font-bold">Total Main Deck Cards: {deck?.total_cards_main_deck}</div>
                                </header>
                                <div className="bg-deckpage w-full h-[90%] rounded-2xl"></div>
                            </section>
                            <section className="h-1/4 w-full p-4 justify-between flex flex-col">
                                < header className="flex w-full px-[3vw] justify-between text-[hsl(var(--text))]">
                                    <div className="font-black">Extra Deck</div>
                                    <div className="font-bold">Total Extra Deck Cards: {deck?.total_cards_extra_deck}</div>
                                </header>
                                <div className="bg-deckpage w-full h-[80%] rounded-2xl"></div>
                            </section>
                            <section className="h-1/4 w-full p-4 justify-between">
                                <header className="flex w-full px-[3vw] justify-between text-[hsl(var(--text))]">
                                    <div className="font-black">Side Deck</div>
                                    <div className="font-bold">Total Side Cards: {deck?.total_cards_side_deck}</div>
                                </header>
                                <div className="bg-deckpage w-full h-[90%] rounded-2xl"></div>
                            </section>
                        </body>
                    </section>
                    <section className="flex flex-col w-[20vw] pt-[76px] px-4 justify-between">
                        <header className="flex flex-col w-full h-[15%] pt-4 space-y-2">
                            <div className="flex justify-between items-center mb-2">
                                <div className="space-x-2">
                                    <button className="px-2 py-1 rounded bg-[hsl(var(--background3))]">All cards</button>
                                    <button className="px-2 py-1 rounded bg-[hsl(var(--background3))]">Owned Cards</button>
                                </div>
                                <div className="flex w-20 bg-footer rounded-xl">
                                    <GridListViewComponent filterProps={filterProps}/>
                                </div>
                            </div>
                            <div className="flex w-[15vw] h-[40px] pl-2 relative bg-gray-600 justify-start text-gold rounded-lg">                      
                                <div className="flex items-center w-full">
                                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                    <input
                                        className="bg-gray-600 rounded-lg w-full h-full text-xl text-white focus:outline-none"
                                        type="text"
                                        value={cardName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Card Name"
                                    />
                                    {cardName && (
                                        <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                                            <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </header>
                        <body className="flex w-full h-[85%] bg-deckpage rounded-2xl mb-4">

                        </body>
                    </section>
                    </>
                )}
            </main>
        <Footer/>
        </>
    );
};

export default  DeckBuilderPage