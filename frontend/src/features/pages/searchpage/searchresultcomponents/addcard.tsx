
import {
    AlertDialog,
    //AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    //AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { useAddNewOwnedCardMutation } from '../../../api-slices/ownedCardapislice';
import { CardSet, ComponentCardSetPopupProps } from "../types/searchresultcomptypes";
   
export const ComponentCardSetPopup = ({ selectedCardData, userId, cardSets }: ComponentCardSetPopupProps) => {
    const [cardMessages, setCardMessages] = useState<{ [key: number]: string }>({});
    const [addNewOwnedCard] = useAddNewOwnedCardMutation();

    const handleBackClick = () => {
        setCardMessages({});
    }

    const handleAddOwnedCardClick = async (set: CardSet, index: number) => {
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
            try {
                await addNewOwnedCard({ id: userId, CardData: cardToPost }).unwrap();
                setCardMessages(prev => ({...prev, [index]: "Card successfully added to Collection!"}));
            } catch (error) {
                setCardMessages(prev => ({...prev, [index]: "Error adding Card to Collection."}));
            }
        } else {
            console.error("No selected Card Data")
        }      
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-footer shadow-custom hover:text-gold hover:bg-footer">Add Card to Collection</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-blackone min-w-[35vw] border-transparent ">
          <AlertDialogHeader>
            <div className="flex justify-between">
                <AlertDialogTitle>All printings</AlertDialogTitle>
                <AlertDialogCancel 
                    className="bg-footer shadow-custom border-transparent hover:bg-footer hover:text-gold"
                    onClick={handleBackClick}
                >
                    Back
                </AlertDialogCancel>
            </div>
            <AlertDialogDescription className="flex flex-col">
                <div className="flex text-white p-2 ">
                    <div className="w-[20%] max-w-[25%] mr-4">Set Name</div>
                    <div className="w-[17%]">Set Code</div>
                    <div className="w-[20%]">Rarity</div>
                    <div className="w-[10%] mr-3">Price</div>
                    <div className="w-[25%]">Action</div>
                </div>
                {cardSets.length > 0 ? (
                    <>
                    {cardSets.map((set, index) => (
                        <div key={index} className="flex p-2 mb-2 items-center text-gold">
                            <div className="w-[20%] max-w-[25%] mr-4">{set.set_name}</div>
                            <div className="w-[17%]">{set.set_code}</div>
                            <div className="w-[20%]">{set.set_rarity}</div>
                            <div className="w-[10%]">${set.set_price}</div>
                            <div className="w-[20%] ">
                            {(!cardMessages[index]) && (
                                <button
                                    onClick={() => handleAddOwnedCardClick(set, index)}
                                    className="bg-blue-500 rounded-xl flex items-center h-[30px] w-fit p-2 text-[12px]"
                                >   
                                    Add to Collection
                                </button>
                            )}
                            {cardMessages[index] && (
                                <div className={`h-12 w-fit p-2 text-[12px] ${cardMessages[index].includes("successfully") ? 'text-green-500' : 'text-red-600'}`}>
                                    {cardMessages[index]}
                                </div>
                            )}
                        </div>
                    </div>
                    ))}
                    </>
                ) : (
                    <main className="flex items-center text-3xl justify-center w-full h-[150px]">
                        Card Not released in TCG
                    </main>
                )}
            </AlertDialogDescription>   
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }