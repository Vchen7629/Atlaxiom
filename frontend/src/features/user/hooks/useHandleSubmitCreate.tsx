import { useCreateNewDeckMutation, useGetAllOwnedDecksQuery } from "@/app/api-slices/decksapislice";
import { useSelector } from "react-redux";

export function useHandleSubmitCreate() {
    const userId = useSelector((state: { auth: { userId: string }}) => state.auth.userId);
    const [addNewDeck] = useCreateNewDeckMutation();
    const { refetch } = useGetAllOwnedDecksQuery(userId);
    
    return async function handleSubmitCreate() {
        const payload = { id: userId };
        const result = await addNewDeck(payload).unwrap();
        
        refetch()

        return { name: result.deck.deck_name}
    }
}