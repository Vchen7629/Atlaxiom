import React, { useEffect } from 'react';
import { useGetAllOwnedDecksQuery } from '../../api-slices/decksapislice';
import "./styling/view-decks.css"

const DeckDisplay= ({ listView, galleryView, userId, deckName }) => {
    const {
        data: modifyDecks,
        refetch
    } = useGetAllOwnedDecksQuery(userId);
    
    const decksToDisplay = modifyDecks?.entities?.undefined?.ownedDecks || [];
    
    useEffect(() => {
        if (userId) {
            refetch(); 
        }
    }, [userId, refetch]);

    const filteredDecks = decksToDisplay.filter(deck =>
        deck?.deck_name?.toLowerCase().includes(deckName.toLowerCase())
    );

    return (
        <>  
                {listView && (
                    <main className='flex flex-col w-full'>
                        {filteredDecks.map((deck) => (
                        <>
                            <div className="flex  h-[5vh] justify-between" key={deck._id}>
                                <div className="text-[hsl(var(--text))]"><strong>{deck.deck_name}</strong></div>
                                <div className="text-[hsl(var(--text))]">{deck.deck_desc}</div>
                                <div>{deck.lastUpdated}</div>
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