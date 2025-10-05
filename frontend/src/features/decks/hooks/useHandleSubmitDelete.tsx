import { useDeleteDeckMutation, useGetAllOwnedDecksQuery } from "@/app/api-slices/deckApiSlice";
import { useGetSpecificUserQuery } from "@/app/api-slices/usersApiSlice";

type handleDeckClick = {
    _id: string;
    deck_name: string;
}

export function useHandleSubmitDelete() {
    const [deleteDeck] = useDeleteDeckMutation();
    const { refetch } = useGetAllOwnedDecksQuery();
    const { refetch: refetchUser } = useGetSpecificUserQuery();
    
    return async function handleSubmitDelete(deck: handleDeckClick) {
        const deldeck = await deleteDeck({
            DeckData: { 
                deckId: deck._id 
            }
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