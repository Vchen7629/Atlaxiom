
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeckProps, FilteredDecks, handleDeckClick, UserId } from '../types/subpagetypes';
import DeleteDeckButtonComponent from '@/components/deckbuttons/deletedeckbutton';
import { Toaster } from 'sonner';
import DuplicateDeckButtonComponent from '@/components/deckbuttons/duplicatedeckbutton';
import FavoriteDeckButtonComponent from '@/components/deckbuttons/makefavoritedeckbutton';

const ViewDecks = ({ deckprops, user }: DeckProps) => {
    const {
        listView,
        galleryView,
        refetchdecks,
        currentListPageResults, setCurrentListPageResults,
        currentGalleryPageResults, setCurrentGalleryPageResults,
    } = deckprops 

    const userId = useSelector((state: UserId) => state.auth.userId);
    const navigate = useNavigate();
    const { totalOwnedDecks } = user;
        
    const handleDeckClick = async (deck: handleDeckClick) => {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId: userId } });   
    };
        
        return (
            <div className="bg-[hsl(var(--profilebackground))] p-4 rounded-xl min-h-[60vh]">
                <Toaster richColors  expand visibleToasts={4}/>  
                {listView && (
                    <main className='flex flex-col w-full'>
                        {totalOwnedDecks === 0 ? (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">You don't have any owned Decks</span>
                            </section>
                        ) : currentListPageResults.length > 0 ? (
                            <>
                                {currentListPageResults.map((deck: FilteredDecks) => (
                                    <>
                                        <div 
                                            className="flex  h-[7vh] px-2 justify-between items-center mb-2 hover:bg-[hsl(var(--background5))]" 
                                            key={deck._id} 
                                            onClick={() => handleDeckClick(deck)}
                                        >  
                                            <section className='flex w-1/4 space-x-8'>
                                                <div className="flex flex-col">
                                                    <div className="text-[hsl(var(--text))]"><strong>{deck.deck_name}</strong></div>
                                                    <div className="text-gray-400">Last Updated {deck.lastUpdated}</div>
                                                </div>
                                                {deck.favorite === true && (
                                                    <span className=' text-[hsl(var(--background3))] flex items-center justify-center'>
                                                        <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                                                    </span>
                                                )}
                                            </section>
                                            <section className="flex flex-col text-[hsl(var(--text))]">{deck.deck_desc}</section>
                                            <section className="flex w-fit space-x-1">
                                                <FavoriteDeckButtonComponent 
                                                    deck={deck} 
                                                    userId={userId} 
                                                    refetch={refetchdecks} 
                                                    setCurrentPageListDecksArray={setCurrentListPageResults}
                                                    setCurrentPageGalleryDecksArray={setCurrentGalleryPageResults}
                                                />
                                                <DuplicateDeckButtonComponent userId={userId} refetch={refetchdecks} deck={deck}/>
                                                <DeleteDeckButtonComponent userId={userId} refetch={refetchdecks} deck={deck}/>
                                            </section>      
                                        </div>
                                    </>
                                ))}        
                            </>
                        ) : (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">Deck of this search name doesn't exist</span>
                            </section>
                        )}
                               
                    </main>
                )}

                {galleryView && (
                    <main className='flex flex-col w-full'>
                        {totalOwnedDecks === 0 ? (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">You don't have any owned Decks</span>
                            </section>
                        ) : currentGalleryPageResults.length > 0 ? (
                            <>
                            </>
                        ) : (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">Deck of this search name doesn't exist</span>
                            </section>
                        )}
                    </main>
                )}
            </div>
        );
    };


export default ViewDecks