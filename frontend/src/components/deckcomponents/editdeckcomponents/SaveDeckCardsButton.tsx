import { useAddCardsMainDeckMutation, useModifyCardAmountinMainDeckMutation } from "@/features/api-slices/decksapislice"

const SaveDeckCardsButton = ({ savebuttonprops }) => {
    const {
        userId,
        refetch,
        deck,
        cardsToAddMainDeckPlaceHolder,
        modifyMainDeckCardAmountPlaceHolder
    } = savebuttonprops

    const [addCardsToMainDeck] = useAddCardsMainDeckMutation();
    const [modifyOwnedAmount] = useModifyCardAmountinMainDeckMutation();

    const normalizeCard = (card) => ({
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
            const normalizedCards = cardsToAddMainDeckPlaceHolder.map(normalizeCard);
            const normalizedModifyCard = modifyMainDeckCardAmountPlaceHolder.map(normalizeCard);
            console.log(normalizedModifyCard)
            if (normalizedCards.length > 0) {
                await addCardsToMainDeck({ id: userId, deckId, main_deck_cards: normalizedCards});
            } else if (normalizedModifyCard.length > 0) {
                await modifyOwnedAmount({ 
                    id: userId, 
                    DeckData: {
                        deckId, 
                        card_name: normalizedModifyCard[0].card_name, 
                        modifyAmount: normalizedModifyCard[0].cardInDeckOwnedAmount
                    }
                })
            }
            refetch()
        } catch  {
            console.log("error")
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