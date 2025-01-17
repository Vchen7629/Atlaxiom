import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Deck, DeckDisplayComponent, handleDeckClick } from '../types/homepagecomponentprops.ts';
import DeleteDeckButtonComponent from '../buttons/deletedeckbutton.tsx';
import DuplicateDeckButtonComponent from '../buttons/duplicatedeckbutton.tsx';

const DeckDisplay= ({ deckdisplayprops }: DeckDisplayComponent) => {
    const {
        decksToDisplay,
        listView,
        galleryView,
        userId,
        refetch,
        currentPageListDecksArray,
        currentPageGalleryDecksArray,
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
                                className="flex  h-[7vh] px-2 justify-between items-center mb-2 hover:bg-[hsl(var(--background5))]" 
                                key={index} 
                                onClick={() => handleDeckClick(deck)}
                            >  
                                <section className="flex flex-col">
                                    <div className="text-[hsl(var(--text))]"><strong>{deck.deck_name}</strong></div>
                                    <div className="text-gray-400">Last Updated {deck.lastUpdated}</div>
                                </section>
                                <section className="flex flex-col text-[hsl(var(--text))]">{deck.deck_desc}</section>
                                <section className="flex w-fit space-x-1">
                                    <button className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faStar}/></button>
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
                <main className='flex flex-col w-full '>
                    {currentPageGalleryDecksArray.length > 0 ? (
                        <div
                            className="grid grid-cols-6 gap-6 w-full h-full p-4 justify-items-center items-start"  
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {currentPageGalleryDecksArray.map((deck: any, index) => (
                                <div>
                                    <div key={index} className="relative bg-deckpage flex h-[12vh] w-[4.8vw] rounded-lg" onClick={() => handleDeckClick(deck)}>
                                        <span className="flex text-wrap text-white text-sm w-full h-full text-center items-center font-bold">{deck.deck_name}</span>
                                    </div>
                                    <section className="flex w-full mt-2 justify-center space-x-1">
                                        <button className='text-white h-7 w-7 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faStar}/></button>
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