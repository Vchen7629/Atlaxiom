import { useAddNewOwnedCardMutation, useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice";
import { CardSet } from "@/features/search/types/searchresultcomptypes";
import { toastSuccessTwoMessage } from "@/shared/types/toast";
import { useSelector } from "react-redux";


export function UseHandleAddNewCardClick() {
    const [addNewOwnedCard] = useAddNewOwnedCardMutation();
    const userId = useSelector((state: { auth: {userId: string }}) => state.auth.userId);
    const { refetch } = useGetOwnedCardsQuery(userId);
    
    return async function HandleAddNewCardClick(selectedCardData: any, set: CardSet, index: number): Promise<toastSuccessTwoMessage> {
        if (selectedCardData) {
            const cardToPost = {
                card_name: selectedCardData.name,
                image_url: selectedCardData.card_images?.[0]?.image_url || 'fallback-image-url',
                ownedprop: 'True',
                ownedamount: 1,
                type: selectedCardData.type,
                race: selectedCardData.race,
                attribute: selectedCardData.attribute,
                archetype: selectedCardData.archetype,
                    level: selectedCardData.level,
                    linkval: selectedCardData.linkval,
                    scale: selectedCardData.scale,
                    atk: selectedCardData.atk,
                    def: selectedCardData.def,
                    desc: selectedCardData.desc || selectedCardData.pend_desc || selectedCardData.monster_desc,
                    set_name: set.set_name || 0,
                    rarity: set.set_rarity || 0,
                    set_code: set.set_code || 0,
                    price: set.set_price || 0,
            };
            await addNewOwnedCard({ id: userId, CardData: cardToPost }).unwrap();
            refetch();
            return { name: selectedCardData.name, set: selectedCardData?.card_sets?.[index]?.set_name};
        } else {
            console.error("No selected Card Data")
        }
    }
}
