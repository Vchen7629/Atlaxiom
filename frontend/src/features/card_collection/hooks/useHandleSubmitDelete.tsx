import { useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice";
import { useSelector } from "react-redux";

export function useHandleSubmitDelete() {
    const userId = useSelector((state: { auth: { userId: string }}) => state.auth.userId);
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    const { refetch } = useGetOwnedCardsQuery(userId);

    return async function handleSubmitDelete(cardName: string) {
        await deleteOwnedCard({
            id: userId,
            CardData: { card_name: cardName }
        }).unwrap();
        refetch();
        return { name: cardName }
    };
};