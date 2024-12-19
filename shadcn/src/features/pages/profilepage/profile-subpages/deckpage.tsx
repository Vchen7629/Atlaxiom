
import { useDeleteDeckMutation, useGetAllOwnedDecksQuery, useGetSpecificOwnedDeckMutation } from '@/features/api-slices/decksapislice.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Deck, DeckError, DeckProps, FilteredDecks, handleDeckClick, UserId } from '../types/subpagetypes';
import { useEffect } from 'react';



const ViewDecks = ({ deckprops, user }: DeckProps) => {
    const {
        deckName,
        listView,
        galleryView
    } = deckprops 

    const userId = useSelector((state: UserId) => state.auth.userId);
    const navigate = useNavigate();
    const { totalOwnedDecks } = user;

    const {
        data: modifyDecks,
        refetch
    } = useGetAllOwnedDecksQuery(userId);
    
    const [getSpecificDeck] = useGetSpecificOwnedDeckMutation();
    
    const [deleteDeck] = useDeleteDeckMutation();
    
    const decksToDisplay = modifyDecks?.entities?.undefined?.ownedDecks || [];

        
    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId, refetch]);
    
        const filteredDecks = decksToDisplay.filter((deck: Deck) =>
            deck?.deck_name?.toLowerCase().includes(deckName.toLowerCase()
        ));
    
        const handleDeckClick = async (deck: handleDeckClick) => {
            try {
                const result = await getSpecificDeck({
                    id: userId,
                    DeckData: { deckId: deck._id }
                });
    
                if (result) {
                    const deckData = (result as {data: any}).data.entities.undefined[0];
                    navigate('/modifyDeck', { state: { deckId: deckData._id, userId: userId }
                    });
                } else {
                    console.log("Deck data not found in the response.");
                }
            } catch (error) {
                console.error("Failed to fetch the deck data:", error);
            }
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
                        {totalOwnedDecks === 0 ? (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">You don't have any owned Decks</span>
                            </section>
                        ) : filteredDecks.length > 0 ? (
                            <>
                                {filteredDecks.map((deck: FilteredDecks) => (
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
                        ) : filteredDecks.length > 0 ? (
                            <>
                            </>
                        ) : (
                            <section className="flex w-full h-[50vh] justify-center items-center">
                                <span className="text-[hsl(var(--text))] font-bold text-2xl">Deck of this search name doesn't exist</span>
                            </section>
                        )}
                    </main>
                )}
            </>
        );
    };


export default ViewDecks