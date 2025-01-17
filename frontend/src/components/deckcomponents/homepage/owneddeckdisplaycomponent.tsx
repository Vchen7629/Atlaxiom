import { useEffect, useState } from 'react';
import { useGetAllOwnedDecksQuery, useDeleteDeckMutation } from '../../../features/api-slices/decksapislice.ts';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Deck, DeckDisplayComponent, DeckError, handleDeckClick } from '../types/homepagecomponentprops.ts';

const DeckDisplay= ({ listView, galleryView, userId, deckName }: DeckDisplayComponent) => {
    const navigate = useNavigate();

    const { data: modifyDecks, refetch } = useGetAllOwnedDecksQuery(userId);
    const [deleteDeck] = useDeleteDeckMutation();
    
    const decksToDisplay = modifyDecks?.entities?.undefined?.ownedDecks || [];
    
    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId]);

    const filteredDecks = decksToDisplay.filter((deck: Deck) =>
        deck?.deck_name?.toLowerCase().includes(deckName.toLowerCase())
    );

    const handleDeckClick = async (deck: handleDeckClick) => {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId: userId } });   
    };

    const handleDeleteDeckClick = async(deck: handleDeckClick) => {
        try {
            const deldeck = await deleteDeck({
                id: userId, 
                DeckData: { deckId: deck._id }
            });
            if (deldeck) {
                refetch();
            } else {
                console.log("deleted deck error")
            }
        } catch (error) {
            const err = error as DeckError
            console.error("Error deleting deck:", err.message || error);
        }
    }

    return (
        <>  
            {listView && (
                <main className='flex flex-col w-full'>
                    {filteredDecks.map((deck: Deck) => (
                        <>
                            <div 
                                className="flex  h-[7vh] px-2 justify-between items-center mb-2 hover:bg-[hsl(var(--background5))]" 
                                key={deck._id} 
                                onClick={() => handleDeckClick(deck)}
                            >  
                                <section className="flex flex-col">
                                    <div className="text-[hsl(var(--text))]"><strong>{deck.deck_name}</strong></div>
                                    <div className="text-gray-400">Last Updated {deck.lastUpdated}</div>
                                </section>
                                <section className="flex flex-col text-[hsl(var(--text))]">{deck.deck_desc}</section>
                                <section className="flex w-fit space-x-1">
                                    <button className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faStar}/></button>
                                    <button className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]'><FontAwesomeIcon icon={faCopy}/></button>
                                    <button 
                                        className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]'
                                        onClick={(event) => {
                                            event.stopPropagation(); 
                                            handleDeleteDeckClick(deck);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </section>    
                            </div>
                        </>
                    ))}               
                </main>
            )}        
            {galleryView && (
                        <>
                            <div className="My-Decks-Gallery-List">
                                Gallery View
                            </div>
                        </>
                    )}               
            
        </>
    );
};

export default DeckDisplay