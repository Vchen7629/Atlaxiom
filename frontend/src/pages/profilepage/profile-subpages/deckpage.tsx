
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeckProps, FilteredDecks, handleDeckClick, UserId } from '../types/subpagetypes';
import DeleteDeckButtonComponent from '@/components/deckbuttons/deletedeckbutton';
import { Toaster } from 'sonner';
import DuplicateDeckButtonComponent from '@/components/deckbuttons/duplicatedeckbutton';
import FavoriteDeckButtonComponent from '@/components/deckbuttons/makefavoritedeckbutton';
import { waveform } from 'ldrs'
import { useEffect, useState } from 'react';

const ViewDecks = ({ deckprops }: DeckProps) => {
    const {
        isLoading,
        usersData,
        listView,
        galleryView,
        refetch,
        refetchdecks,
        currentListPageResults, setCurrentListPageResults,
        currentGalleryPageResults, setCurrentGalleryPageResults,
    } = deckprops 

    const [showLoading, setShowLoading] = useState(true);
    
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    waveform.register()
    const userId = useSelector((state: UserId) => state.auth.userId);
    const navigate = useNavigate();
    const totalOwnedDecks = usersData?.totalOwnedDecks;
        
    const handleDeckClick = async (deck: handleDeckClick) => {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId: userId } });   
    };

    const handleClick = (deck: handleDeckClick) => {
        return () => handleDeckClick(deck);
    };

        
        return (
            <div className="bg-[hsl(var(--profilebackground))] p-4 rounded-xl min-h-[60vh]">
                <Toaster richColors  expand visibleToasts={4}/>  
                {listView && (
                    <main className='flex flex-col w-full'>
                        {showLoading ? (
                            <div className="flex flex-col h-[55vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                                <span>Loading</span>
                                <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                            </div>
                        ) : currentListPageResults.length > 0 ? (
                            currentListPageResults.map((deck: FilteredDecks) => (
                                <article
                                    className="flex  h-[7vh] px-2 justify-between items-center mb-2 hover:bg-[hsl(var(--background5))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--background3))] rounded-md" 
                                    key={deck._id} 
                                    onClick={handleClick(deck)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleClick(deck)();
                                            }
                                        }}
                                        tabIndex={0}
                                        aria-label={`Select deck ${deck.deck_name}`}
                                        >  
                                            <section className='flex w-1/4 space-x-8'>
                                                <div className="flex flex-col">
                                                    <div className="text-[hsl(var(--text))]"><strong>{deck.deck_name}</strong></div>
                                                    <div className="hidden lg:flex text-gray-400">Last Updated {deck.lastUpdated}</div>
                                                </div>
                                                {deck.favorite === true && (
                                                    <span className='text-[hsl(var(--background3))] hidden md:flex items-center justify-center'>
                                                        <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                                                    </span>
                                                )}
                                            </section>
                                            <section className="flex text-[hsl(var(--text))]">
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
                                                    refetch={refetchdecks}
                                                    setCurrentPageListDecksArray={setCurrentListPageResults}
                                                    setCurrentPageGalleryDecksArray={setCurrentGalleryPageResults}
                                                />
                                                <DuplicateDeckButtonComponent userId={userId} refetch={refetchdecks} refetchUser={refetch} deck={deck}/>
                                                <DeleteDeckButtonComponent userId={userId} refetch={refetchdecks} refetchUser={refetch} deck={deck}/>
                                            </section>      
                                </article>
                            ))       
                        ) : totalOwnedDecks === 0 ? (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">You don&apos;t have any owned Decks</span>
                            </section>
                        ) : (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">Deck of this search name doesn&apos;t exist</span>
                            </section>
                        )}
                               
                    </main>
                )}

                {galleryView && (
                    <main className='flex flex-col w-full'>
                        {showLoading ? (
                            <div className="flex flex-col h-[55vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                                <span>Loading</span>
                                <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                            </div>
                        ) : currentGalleryPageResults.length > 0 ? (
                            <div
                                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 w-full h-full p-4 justify-items-center items-start"  
                                style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                            >
                                {currentGalleryPageResults.map((deck: FilteredDecks) =>
                                    <article key={deck._id} className="flex flex-col items-center">
                                        <div className="relative bg-deckpage flex flex-col items-center h-[20vh] md:h-[16vh] lg:h-[15vh] lg:w-[8vw] xl:h-[13vh] xl:w-[5.4vw] rounded-lg" onClick={handleClick(deck)}>
                                            {deck.favorite === true && (
                                                <span className='absolute left-1/2 top-2 translate-x-[-50%] text-[hsl(var(--background3))] flex'>
                                                    <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                                                </span>
                                            )}
                                            <span className="flex text-wrap text-white text-sm w-[90%] h-full text-center items-center font-bold">{deck.deck_name}</span>
                                        </div>
                                        <section className="flex w-full h-fit mt-2 space-x-1">
                                            <FavoriteDeckButtonComponent 
                                                deck={deck} 
                                                userId={userId} 
                                                refetch={refetchdecks} 
                                                setCurrentPageListDecksArray={setCurrentListPageResults}
                                                setCurrentPageGalleryDecksArray={setCurrentGalleryPageResults}
                                            />
                                            <DuplicateDeckButtonComponent userId={userId} refetch={refetchdecks} refetchUser={refetch} deck={deck}/>
                                            <DeleteDeckButtonComponent userId={userId} refetch={refetchdecks}  refetchUser={refetch} deck={deck}/>
                                        </section>
                                    </article>
                                )}
                            </div>
                        ) : totalOwnedDecks === 0 ? (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">You don&apos;t have any owned Decks</span>
                            </section>
                        ) : (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">Deck of this search name doesn&apos;t exist</span>
                            </section>
                        )}
                    </main>
                )}
            </div>
        );
    };


export default ViewDecks