import { useNavigate } from 'react-router-dom';
import { Deck, DeckDisplayComponent, handleDeckClick } from '../types/homepagecomponentprops.ts';
import DeleteDeckButtonComponent from '../../deckbuttons/deletedeckbutton.tsx';
import DuplicateDeckButtonComponent from '../../deckbuttons/duplicatedeckbutton.tsx';
import FavoriteDeckButtonComponent from '../../deckbuttons/makefavoritedeckbutton.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { waveform } from 'ldrs';

const DeckDisplay= ({ deckdisplayprops }: DeckDisplayComponent) => {
    const {
        isLoading,
        decksToDisplay,
        listView,
        galleryView,
        userId,
        refetch,
        currentPageListDecksArray, setCurrentPageListDecksArray,
        currentPageGalleryDecksArray, setCurrentPageGalleryDecksArray,
    } = deckdisplayprops
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(true);

    waveform.register()
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const handleDeckClick = async (deck: handleDeckClick) => {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId: userId } });   
    };

    const handleDeckClickWrapper = (deck: handleDeckClick) => {
        return () => handleDeckClick(deck);
    };


    return (
        <>  
            {listView && (
                <main className='flex flex-col w-full'>
                    {(showLoading ||isLoading) ? (
                        <div className="flex flex-col h-[45vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                            <span>Loading</span>
                            <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                        </div>
                    ) : currentPageListDecksArray.length > 0 ? (
                        currentPageListDecksArray.map((deck: Deck) => (
                            <article 
                                key={deck._id}
                                className="flex  h-[7vh] px-2 justify-between items-center mb-2 hover:bg-[hsl(var(--background5))]" 
                                onClick={() => handleDeckClick(deck)}
                            >  
                                <section className='flex w-[30%] space-x-8'>
                                    <div className="flex flex-col">
                                        <div className="text-[hsl(var(--text))] text-xs lg:text-lg"><strong>{deck.deck_name}</strong></div>
                                        <div className="text-gray-400 hidden md:text-md lg:text-lg lg:flex">Updated: {deck.lastUpdated}</div>
                                    </div>
                                    {deck.favorite === true && (
                                        <span className=' text-[hsl(var(--background3))] hidden md:flex items-center justify-center'>
                                            <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                                        </span>
                                    )}
                                </section>
                                <section className="flex w-1/2 h-full items-center space-x-2 text-[hsl(var(--text))]">
                                    {deck.favorite === true && (
                                        <span className=' text-[hsl(var(--background3))] flex md:hidden items-center justify-center'>
                                            <FontAwesomeIcon icon={faStar} className='fa-sm'/>
                                        </span>
                                    )}
                                    <span className="text-xs md:text-md lg:text-lg">{deck.deck_desc}</span>
                                </section>
                                <section className="flex w-fit space-x-1">
                                    <FavoriteDeckButtonComponent 
                                        deck={deck} 
                                        userId={userId} 
                                        refetch={refetch} 
                                        setCurrentPageListDecksArray={setCurrentPageListDecksArray}
                                        setCurrentPageGalleryDecksArray={setCurrentPageGalleryDecksArray}
                                    />
                                    <DuplicateDeckButtonComponent deck={deck} userId={userId} refetch={refetch}/>
                                    <DeleteDeckButtonComponent deck={deck} userId={userId} refetch={refetch}/>
                                </section>    
                            </article>
                        ))
                    ) : decksToDisplay.length === 0 ? (
                        <div className="flex h-[45vh] w-full items-center justify-center">
                            <span className="text-xl font-bold text-[hsl(var(--text))]">
                                You Don&apos;t Own any Decks, Click the New Deck Button To add a new deck
                            </span>
                        </div>
                    ) : (
                        <div className="flex h-[45vh] w-full items-center justify-center">
                            <span className="text-xl font-bold text-[hsl(var(--text))]">
                                No Decks matching the Search Input found
                            </span>
                        </div>
                    )}            
                </main>
            )}        
            {galleryView && (
                <main className='flex flex-col w-full'>
                    {(showLoading ||isLoading) ? (
                        <div className="flex flex-col h-[45vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                            <span>Loading</span>
                            <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                        </div>
                    ) : currentPageGalleryDecksArray.length > 0 ? (
                        <div
                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full h-full p-4 justify-items-center items-start"  
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {currentPageGalleryDecksArray.map((deck: any) => (
                                <article 
                                    key={deck._id} 
                                    className="flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[hsl(var(--background3))] rounded-md"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleDeckClickWrapper(deck)();
                                        }
                                        }}
                                    tabIndex={0}
                                    aria-label={`Select deck ${deck.deck_name}`}
                                >
                                    <button className="relative bg-deckpage flex flex-col h-[20vh] w-[28vw] md:h-[18vh] md:w-[15vw] lg:h-[12vh] lg:w-[4.8vw] rounded-lg" onClick={handleDeckClickWrapper(deck)}>
                                        {deck.favorite === true && (
                                            <span className='absolute left-1/2 top-2 translate-x-[-50%] text-[hsl(var(--background3))] flex'>
                                                <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                                            </span>
                                        )}
                                        <span className="flex text-wrap text-white text-sm w-[90%] h-full text-center items-center font-bold">{deck.deck_name}</span>
                                    </button>
                                    <section className="flex w-full mt-2 space-x-1">
                                        <FavoriteDeckButtonComponent 
                                            deck={deck} 
                                            userId={userId} 
                                            refetch={refetch} 
                                            setCurrentPageListDecksArray={setCurrentPageListDecksArray}
                                            setCurrentPageGalleryDecksArray={setCurrentPageGalleryDecksArray}
                                        />
                                        <DuplicateDeckButtonComponent deck={deck} userId={userId} refetch={refetch}/>
                                        <DeleteDeckButtonComponent deck={deck} userId={userId} refetch={refetch}/>
                                    </section>
                                </article>   
                            ))}
                        </div>
                    ) : decksToDisplay.length === 0 ? (
                        <div className="flex h-[45vh] w-full items-center justify-center">
                            <span className="text-xl font-bold text-[hsl(var(--text))]">
                                You Don&apos;t Own any Decks, Click the New Deck Button To add a new deck
                            </span>
                        </div>
                    ) : (
                        <div className="flex h-[45vh] w-full items-center justify-center">
                            <span className="text-xl font-bold text-[hsl(var(--text))]">
                                No Decks matching the Search Input found
                            </span>
                        </div>
                    )}          
                </main>
            )}               
            
        </>
    );
};

export default DeckDisplay