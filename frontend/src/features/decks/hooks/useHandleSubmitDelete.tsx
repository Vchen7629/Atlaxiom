import { useDeleteDeckMutation, useGetAllOwnedDecksQuery } from "@/app/api-slices/decksapislice";
import { useGetSpecificUserQuery } from "@/app/api-slices/usersApiSlice";
import { useSelector } from "react-redux";

type handleDeckClick = {
    _id: string;
    deck_name: string;
}

export function useHandleSubmitDelete() {
    const userId = useSelector((state: { auth: { userId: string }}) => state.auth.userId);
    const [deleteDeck] = useDeleteDeckMutation();
    const { refetch } = useGetAllOwnedDecksQuery(userId);
    const { refetch: refetchUser } = useGetSpecificUserQuery(userId);
    
    return async function handleSubmitDelete(deck: handleDeckClick) {
        const deldeck = await deleteDeck({
            id: userId, 
            DeckData: { deckId: deck._id }
        });
        if (deldeck) {
            refetch();
            if (refetchUser) {
                refetchUser();
                console.log("refetched")
            }
            return { name: deck.deck_name}
        } 
        return undefined
    }
}