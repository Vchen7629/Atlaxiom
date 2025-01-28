import { useNavigate } from 'react-router-dom';
import { Deck, DeckDisplayComponent, handleDeckClick } from '../types/homepagecomponentprops.ts';
import DeleteDeckButtonComponent from '../../deckbuttons/deletedeckbutton.tsx';
import DuplicateDeckButtonComponent from '../../deckbuttons/duplicatedeckbutton.tsx';
import FavoriteDeckButtonComponent from '../../deckbuttons/makefavoritedeckbutton.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const DeckDisplay= ({ deckdisplayprops }: DeckDisplayComponent) => {
    const {
        decksToDisplay,
        listView,
        galleryView,
        userId,
        refetch,
        currentPageListDecksArray, setCurrentPageListDecksArray,
        currentPageGalleryDecksArray, setCurrentPageGalleryDecksArray,
    } = deckdisplayprops
    const navigate = useNavigate();

    const handleDeckClick = async (deck: handleDeckClick) => {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId: userId } });   
    };

    return (
        <>  
            {listView && (
                <main className='flex flex-col w-full'>
                    {currentPageListDecksArray.length > 0 ? (
                        currentPageListDecksArray.map((deck: Deck, index) => (
                            <div 
                                key={index}
                                className="flex  h-[7vh] px-2 justify-between items-center mb-2 hover:bg-[hsl(var(--background5))]" 
                                onClick={() => handleDeckClick(deck)}
                            >  
                                <section className='flex w-1/4 space-x-8'>
                                    <div className="flex flex-col">
                                        <div className="text-[hsl(var(--text))] text-xs lg:text-lg"><strong>{deck.deck_name}</strong></div>
                                        <div className="text-gray-400 hidden md:text-md lg:text-lg lg:flex">Last Updated {deck.lastUpdated}</div>
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
                            </div>
                        ))
                    ) : decksToDisplay.length === 0 ? (
                        <div className="flex h-[45vh] w-full items-center justify-center">
                            <span className="text-xl font-bold text-[hsl(var(--text))]">
                                You Don't Own any Decks, Click the New Deck Button To add a new deck
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
                    {currentPageGalleryDecksArray.length > 0 ? (
                        <div
                            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full h-full p-4 justify-items-center items-start"  
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {currentPageGalleryDecksArray.map((deck: any) => (
                                <div key={deck._id} className="flex flex-col items-center">
                                    <div className="relative bg-deckpage flex flex-col h-[20vh] w-[28vw] md:h-[18vh] md:w-[15vw] lg:h-[12vh] lg:w-[4.8vw] rounded-lg" role="listitem" onClick={() => handleDeckClick(deck)}>
                                        {deck.favorite === true && (
                                            <span className='absolute left-1/2 top-2 translate-x-[-50%] text-[hsl(var(--background3))] flex'>
                                                <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                                            </span>
                                        )}
                                        <span className="flex text-wrap text-white text-sm w-[90%] h-full text-center items-center font-bold">{deck.deck_name}</span>
                                    </div>
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
                                </div>   
                            ))}
                        </div>
                    ) : decksToDisplay.length === 0 ? (
                        <div className="flex h-[45vh] w-full items-center justify-center">
                            <span className="text-xl font-bold text-[hsl(var(--text))]">
                                You Don't Own any Decks, Click the New Deck Button To add a new deck
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