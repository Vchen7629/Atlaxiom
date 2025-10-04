import { useAddCardsMainDeckMutation, useAddNewCardtoExtraDeckMutation, useAddNewCardtoSideDeckMutation, useDeleteCardfromExtraDeckMutation, useDeleteCardfromMainDeckMutation, useDeleteCardfromSideDeckMutation, useModifyCardAmountinExtraDeckMutation, useModifyCardAmountinMainDeckMutation, useModifyCardAmountinSideDeckMutation } from "@/app/api-slices/decksapislice"
import { SaveDeckButton, UpdatedCard } from "../types/buttontypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const SaveDeckCardsButton = ({ savebuttonprops }: SaveDeckButton) => {
    const {
        userId,
        refetch,
        deckData,
        cardsToAddMainDeckPlaceHolder, setCardsToAddMainDeckPlaceHolder,
        cardsToDeleteMainDeckPlaceHolder, setCardsToDeleteMainDeckPlaceHolder,
        modifyMainDeckCardAmountPlaceHolder, setModifyMainDeckCardAmountPlaceHolder,
        cardsToAddExtraDeckPlaceHolder, setCardsToAddExtraDeckPlaceHolder,
        cardsToDeleteExtraDeckPlaceHolder, setCardsToDeleteExtraDeckPlaceHolder,
        modifyExtraDeckCardAmountPlaceHolder, setModifyExtraDeckCardAmountPlaceHolder,
        cardsToAddSideDeckPlaceHolder, setCardsToAddSideDeckPlaceHolder,
        cardsToDeleteSideDeckPlaceHolder, setCardsToDeleteSideDeckPlaceHolder,
        modifySideDeckCardAmountPlaceHolder, setModifySideDeckCardAmountPlaceHolder
    } = savebuttonprops

    const [addCardsToMainDeck] = useAddCardsMainDeckMutation();
    const [addCardsToExtraDeck] = useAddNewCardtoExtraDeckMutation();
    const [addCardsToSideDeck] = useAddNewCardtoSideDeckMutation();
    const [deleteCardsFromMainDeck] = useDeleteCardfromMainDeckMutation();
    const [deleteCardsFromExtraDeck] = useDeleteCardfromExtraDeckMutation();
    const [deleteCardsFromSideDeck] = useDeleteCardfromSideDeckMutation();
    const [modifyMainDeckOwnedAmount] = useModifyCardAmountinMainDeckMutation();
    const [modifyExtraDeckOwnedAmount] = useModifyCardAmountinExtraDeckMutation();
    const [modifySideDeckOwnedAmount] = useModifyCardAmountinSideDeckMutation();

    const normalizeCard = (card: UpdatedCard) => ({
        card_name: card.name || card.card_name,
        archetype: card.archetype || null,
        cardInDeckOwnedAmount: card.cardInDeckOwnedAmount,
        desc: card.desc || "",
        image_url: card.card_images?.[0]?.image_url || card?.image_url,
        price: card.card_prices?.[0]?.price || card.price,
        race: card.race || "",
        rarity: card.card_sets?.[0]?.set_rarity || card.rarity,
        set_code: card.card_sets?.[0]?.set_code || card.rarity,
        set_name: card.card_sets?.[0]?.set_name || card.set_name,
        type: card.type || "",
    });

    async function handleSaveClick() {
        try {
            const deckId = deckData?._id;
            const normalizedMainCards = cardsToAddMainDeckPlaceHolder.map(normalizeCard);
            const normalizedDeleteMainCards = cardsToDeleteMainDeckPlaceHolder.map(normalizeCard);
            const normalizedModifyMainCards = modifyMainDeckCardAmountPlaceHolder.map(normalizeCard);
            const normalizedExtraDeckCards = cardsToAddExtraDeckPlaceHolder.map(normalizeCard);
            const normalizedDeleteExtraDeckCards = cardsToDeleteExtraDeckPlaceHolder.map(normalizeCard);
            const normalizedModifyExtraDeckCards = modifyExtraDeckCardAmountPlaceHolder.map(normalizeCard);
            const normalizedSideDeckCards = cardsToAddSideDeckPlaceHolder.map(normalizeCard);
            const normalizedDeleteSideDeckCards = cardsToDeleteSideDeckPlaceHolder.map(normalizeCard);
            const normalizedModifySideDeckCards = modifySideDeckCardAmountPlaceHolder.map(normalizeCard);

            if (normalizedMainCards.length > 0) {
                await addCardsToMainDeck({ id: userId, deckId: deckId as string,  main_deck_cards: normalizedMainCards as UpdatedCard[]});
                setCardsToAddMainDeckPlaceHolder([])
            } 

            if (normalizedExtraDeckCards.length > 0) {
                await addCardsToExtraDeck({ id: userId, deckId: deckId as string,  extra_deck_cards: normalizedExtraDeckCards as UpdatedCard[]})
                setCardsToAddExtraDeckPlaceHolder([])
            }

            if (normalizedSideDeckCards.length > 0) {
                await addCardsToSideDeck({ id: userId, deckId: deckId as string, side_deck_cards: normalizedSideDeckCards as UpdatedCard[] })
                setCardsToAddSideDeckPlaceHolder([])
            }

            if (normalizedDeleteMainCards.length > 0) {
                const filteredCards = normalizedDeleteMainCards
                    .filter(card => card.card_name !== undefined)
                    .map(card => ({
                        card_name: card.card_name as string
                    }));

                if (filteredCards.length > 0) {
                    await deleteCardsFromMainDeck({
                        id: userId,
                        DeckData: {
                            deckId: deckId as string,
                            cardUpdates: filteredCards
                        }
                    });

                    setCardsToDeleteMainDeckPlaceHolder([]);
                }
            }

            if (normalizedDeleteExtraDeckCards.length > 0) {
                const filteredCards = normalizedDeleteExtraDeckCards
                    .filter(card => card.card_name !== undefined)
                    .map(card => ({
                        card_name: card.card_name as string
                    }));

                if (filteredCards.length > 0) {
                    await deleteCardsFromExtraDeck({
                        id: userId,
                        DeckData: {
                            deckId: deckId as string,
                            cardUpdates: filteredCards
                        }
                    });

                    setCardsToDeleteExtraDeckPlaceHolder([]);
                }
            }

            
            if (normalizedDeleteSideDeckCards.length > 0) {
                const filteredCards = normalizedDeleteSideDeckCards
                    .filter(card => card.card_name !== undefined)
                    .map(card => ({
                        card_name: card.card_name as string
                    }));

                if (filteredCards.length > 0) {
                    await deleteCardsFromSideDeck({
                        id: userId,
                        DeckData: {
                            deckId: deckId as string,
                            cardUpdates: filteredCards
                        }
                    });

                    setCardsToDeleteSideDeckPlaceHolder([]);
                }
            }

            if (normalizedModifyMainCards.length > 0) {
                const filteredCards = normalizedModifyMainCards
                    .filter(card => card.card_name !== undefined)
                    .map(card => ({
                        card_name: card.card_name as string,
                        modifyAmount: card.cardInDeckOwnedAmount as number
                    }));
                if (filteredCards.length > 0) {
                    await modifyMainDeckOwnedAmount({ 
                        id: userId, 
                        DeckData: {
                            deckId: deckId as string, 
                            cardUpdates: filteredCards
                        }
                    });

                    setModifyMainDeckCardAmountPlaceHolder([])
                }
            }

            if (normalizedModifyExtraDeckCards.length > 0) {
                const filteredCards = normalizedModifyExtraDeckCards
                    .filter(card => card.card_name !== undefined)
                    .map(card => ({
                        card_name: card.card_name as string,
                        modifyAmount: card.cardInDeckOwnedAmount as number
                    }));
                if (filteredCards.length > 0) {
                    await modifyExtraDeckOwnedAmount({ 
                        id: userId, 
                        DeckData: {
                            deckId: deckId as string, 
                            cardUpdates: filteredCards
                        }
                    });
                    
                    setModifyExtraDeckCardAmountPlaceHolder([])
                }
            }

            
            if (normalizedModifySideDeckCards.length > 0) {
                const filteredCards = normalizedModifySideDeckCards
                    .filter(card => card.card_name !== undefined)
                    .map(card => ({
                        card_name: card.card_name as string,
                        modifyAmount: card.cardInDeckOwnedAmount as number
                    }));
                if (filteredCards.length > 0) {
                    await modifySideDeckOwnedAmount({ 
                        id: userId, 
                        DeckData: {
                            deckId: deckId as string, 
                            cardUpdates: filteredCards
                        }
                    });
                    
                    setModifySideDeckCardAmountPlaceHolder([])
                }
            }
            refetch()
        } catch  {
            console.error("error")
        }
    }

    return (
        <section>
            <button 
                className="flex text-sm lg:text-md flex-col px-6 py-3 lg:py-4 items-center rounded-xl bg-blue-400"
                onClick={handleSaveClick}
            >
                <span>
                    <FontAwesomeIcon icon={faSave} className="fa-xl mr-4"/>
                    Save
                </span>
            </button>
        </section>
    )
}

export default SaveDeckCardsButton