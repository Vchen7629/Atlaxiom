
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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { useAddNewOwnedCardMutation } from '../../../features/api-slices/ownedCardapislice';
import { CardSet, ComponentCardSetPopupProps } from "../types/searchresultcomptypes";
   
export const ComponentCardSetPopup = ({ addcardprops }: ComponentCardSetPopupProps) => {
    const {
        selectedCardData,
        userId, 
        cardSets, setCardSets
    } = addcardprops 
    
    const [cardMessages, setCardMessages] = useState<{ [key: number]: string }>({});
    const [addNewOwnedCard] = useAddNewOwnedCardMutation();

    useEffect(() => {
        setCardSets(selectedCardData?.card_sets || []);
    }, [cardSets])

    console.log(cardSets)

    const handleBackClick = () => {
        setCardMessages({});
    };

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
          <Button className="bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))] shadow-custom hover:text-gold">Add Card to Collection</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[hsl(var(--atkdefcomponent))] min-w-[40vw] border-transparent ">
          <AlertDialogHeader>
            <div className="flex justify-between text-[hsl(var(--text))]">
                <AlertDialogTitle>All printings</AlertDialogTitle>
                <AlertDialogCancel 
                    className="bg-transparent shadow-custom border-transparent hover:bg-footer hover:text-gold"
                    onClick={handleBackClick}
                >
                    Back
                </AlertDialogCancel>
            </div>
            <AlertDialogDescription className="flex flex-col">
                <div className="flex text-[hsl(var(--text))] p-2 border-b-[1px] border-black">
                    <div className="w-[20%]">Set Name</div>
                    <div className="w-[20%]">Set Code</div>
                    <div className="w-[20%]">Rarity</div>
                    <div className="w-[20%]">Price</div>
                    <div className="w-[20%]">Action</div>
                </div>
                {cardSets.length > 0 ? (
                    <>
                    {cardSets.map((set, index) => (
                        <div key={index} className="flex p-2 mb-2 items-center text-[hsl(var(--background3))]">
                            {(!cardMessages[index]) ? (
                                <>
                                    <div className="flex w-[20%] pr-8 h-fit flex-grow">{set.set_name}</div>
                                    <div className="w-[20%]">{set.set_code}</div>
                                    <div className="w-[20%]">{set.set_rarity}</div>
                                    <div className="w-[20%]">${set.set_price}</div>
                                    <div className="w-[20%]">
                                        <button
                                            onClick={() => handleAddOwnedCardClick(set, index)}
                                            className="bg-[hsl(var(--background3))] text-[hsl(var(--text))] rounded-md flex items-center h-[30px] w-fit p-2 text-[12px]"
                                        >   
                                            Add to Collection
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className={`flex h-full w-full text-md justify-center ${cardMessages[index].includes("successfully") ? 'text-green-500' : 'text-red-600'}`}>
                                    {cardMessages[index]}
                                </div>
                            )}
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