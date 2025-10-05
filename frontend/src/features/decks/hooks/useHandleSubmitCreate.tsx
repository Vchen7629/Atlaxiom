import { useCreateNewDeckMutation, useGetAllOwnedDecksQuery } from "@/app/api-slices/deckApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useHandleSubmitCreate() {
    const userId = useSelector((state: { auth: { userId: string }}) => state.auth.userId);
    const [addNewDeck] = useCreateNewDeckMutation();
    const { refetch } = useGetAllOwnedDecksQuery();
    const navigate = useNavigate();
    
    return async function handleSubmitCreate() {
        const result = await addNewDeck().unwrap();
    
        navigate('/modifyDeck', { state: { deckId: result.deck._id, userId } });
        refetch()

        return { name: result.deck.deck_name}
    }
}