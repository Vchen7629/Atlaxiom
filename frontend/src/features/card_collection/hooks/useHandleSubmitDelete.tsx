import { useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice";

export function useHandleSubmitDelete() {
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    const { refetch } = useGetOwnedCardsQuery();

    return async function handleSubmitDelete(cardName: string) {
        await deleteOwnedCard({ CardData: { card_name: cardName } }).unwrap();
        refetch();
        return { name: cardName }
    };
};