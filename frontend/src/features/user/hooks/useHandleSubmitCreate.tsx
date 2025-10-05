import { useCreateNewDeckMutation, useGetAllOwnedDecksQuery } from "@/app/api-slices/deckApiSlice";

export function useHandleSubmitCreate() {
    const [addNewDeck] = useCreateNewDeckMutation();
    const { refetch } = useGetAllOwnedDecksQuery();
    
    return async function handleSubmitCreate() {
        const result = await addNewDeck().unwrap();
        
        refetch()

        return { name: result.deck.deck_name}
    }
}