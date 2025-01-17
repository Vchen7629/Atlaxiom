import { useAddCardsMainDeckMutation, useAddNewCardtoExtraDeckMutation, useAddNewCardtoSideDeckMutation, useDeleteCardfromExtraDeckMutation, useDeleteCardfromMainDeckMutation, useDeleteCardfromSideDeckMutation, useModifyCardAmountinExtraDeckMutation, useModifyCardAmountinMainDeckMutation, useModifyCardAmountinSideDeckMutation } from "@/features/api-slices/decksapislice"
import { SaveDeckButton } from "../types/buttontypes";

const SaveDeckCardsButton = ({ savebuttonprops }: SaveDeckButton) => {
    const {
        userId,
        refetch,
        deck,
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

    const normalizeCard = (card: any) => ({
        addedOn: new Date().toISOString().split('T')[0],
        archetype: card.archetype || null,
        cardInDeckOwnedAmount: card.cardInDeckOwnedAmount,
        card_name: card.name || card.card_name,
        desc: card.desc || "",
        image_url: card.card_images?.[0]?.image_url || card?.image_url,
        price: card.card_prices?.[0]?.price || card.price,
        race: card.race || "",
        rarity: card.card_sets?.[0]?.set_rarity || card.rarity,
        set_code: card.card_sets?.[0]?.set_code || card.rarity,
        set_name: card.card_sets?.[0]?.set_name || card.set_name,
        type: card.type || "",
        user_id: userId,
    });

    const handleSaveClick = async() => {
        try {
            const deckId = deck?._id;
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
                await addCardsToMainDeck({ id: userId, deckId, main_deck_cards: normalizedMainCards});
                setCardsToAddMainDeckPlaceHolder([])
            } 

            if (normalizedExtraDeckCards.length > 0) {
                await addCardsToExtraDeck({ id: userId, deckId, extra_deck_cards: normalizedExtraDeckCards})
                setCardsToAddExtraDeckPlaceHolder([])
            }

            if (normalizedSideDeckCards.length > 0) {
                await addCardsToSideDeck({ id: userId, deckId, side_deck_cards: normalizedSideDeckCards})
                setCardsToAddSideDeckPlaceHolder([])
            }

            if (normalizedDeleteMainCards.length > 0) {
                await deleteCardsFromMainDeck({
                    id: userId,
                    DeckData: {
                        deckId,
                        cardUpdates: normalizedDeleteMainCards.map(card => ({
                            card_name: card.card_name
                        }))
                    }
                })
                setCardsToDeleteMainDeckPlaceHolder([])
            }

            if (normalizedDeleteExtraDeckCards.length > 0) {
                await deleteCardsFromExtraDeck({
                    id: userId,
                    DeckData: {
                        deckId,
                        cardUpdates: normalizedDeleteExtraDeckCards.map(card => ({
                            card_name: card.card_name
                        }))
                    }
                })
                setCardsToDeleteExtraDeckPlaceHolder([])
            }

            
            if (normalizedDeleteSideDeckCards.length > 0) {
                await deleteCardsFromSideDeck({
                    id: userId,
                    DeckData: {
                        deckId,
                        cardUpdates: normalizedDeleteSideDeckCards.map(card => ({
                            card_name: card.card_name
                        }))
                    }
                })
                setCardsToDeleteSideDeckPlaceHolder([])
            }

            if (normalizedModifyMainCards.length > 0) {
                await modifyMainDeckOwnedAmount({ 
                    id: userId, 
                    DeckData: {
                        deckId, 
                        cardUpdates: normalizedModifyMainCards.map(card => ({
                            card_name: card.card_name,
                            modifyAmount: card.cardInDeckOwnedAmount
                        }))
                    }
                })
                setModifyMainDeckCardAmountPlaceHolder([])
            }

            if (normalizedModifyExtraDeckCards.length > 0) {
                await modifyExtraDeckOwnedAmount({ 
                    id: userId, 
                    DeckData: {
                        deckId, 
                        cardUpdates: normalizedModifyExtraDeckCards.map(card => ({
                            card_name: card.card_name,
                            modifyAmount: card.cardInDeckOwnedAmount
                        }))
                    }
                })
                setModifyExtraDeckCardAmountPlaceHolder([])
            }

            
            if (normalizedModifySideDeckCards.length > 0) {
                await modifySideDeckOwnedAmount({ 
                    id: userId, 
                    DeckData: {
                        deckId, 
                        cardUpdates: normalizedModifySideDeckCards.map(card => ({
                            card_name: card.card_name,
                            modifyAmount: card.cardInDeckOwnedAmount
                        }))
                    }
                })
                setModifySideDeckCardAmountPlaceHolder([])
            }
            refetch()
        } catch  {
            console.error("error")
        }
    }

    return (
        <section>
            <button 
                className="flex text-sm flex-col px-8 py-2 items-center rounded-2xl bg-blue-400"
                onClick={handleSaveClick}
            >
                <div>Save</div>
                <div>{deck?.lastUpdated}</div>
            </button>
        </section>
    )
}

export default SaveDeckCardsButton