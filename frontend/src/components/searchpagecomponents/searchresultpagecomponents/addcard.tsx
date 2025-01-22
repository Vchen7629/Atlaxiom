
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
import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { useAddNewOwnedCardMutation } from '../../../features/api-slices/ownedCardapislice';
import { CardSet, ComponentCardSetPopupProps } from "../types/searchresultcomptypes";
import { toast } from "sonner";
   
export const ComponentCardSetPopup = ({ addcardprops }: ComponentCardSetPopupProps) => {
    const {
        selectedCardData,
        userId, 
        cardSets, setCardSets
    } = addcardprops 
    
    const [addNewOwnedCard] = useAddNewOwnedCardMutation();

    useEffect(() => {
        setCardSets(selectedCardData?.card_sets || []);
    }, [cardSets])


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
                await addNewOwnedCard({ id: userId, CardData: cardToPost as any }).unwrap();
                return { name: selectedCardData.name, set: selectedCardData?.card_sets?.[index]?.set_name}
            } catch (error) {
                throw error
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
                            <>
                                <span className="flex w-[20%] pr-8 h-fit flex-grow">{set.set_name}</span>
                                <span className="w-[20%]">{set.set_code}</span>
                                <span className="w-[20%]">{set.set_rarity}</span>
                                <span className="w-[20%]">${set.set_price}</span>
                                <div className="w-[20%]">
                                    <button
                                        className="bg-[hsl(var(--background3))] text-[hsl(var(--text))] rounded-md justify-center flex items-center h-[30px] w-[78%] p-2 text-[12px]"
                                        onClick={() => {
                                            const promise = handleAddOwnedCardClick(set, index);
                                            toast.promise(promise, {
                                                loading: "loading...",
                                                success: (data: any) => `Card: ${data.name} from set: ${data.set} has been added`,
                                                error: (error: any) => {
                                                if (error?.status === 409) {
                                                    return error?.response?.message || "You already Own this Card";
                                                }
                                                    return "An Error occured while adding the Card"
                                                },
                                            })
                                        }}
                                    >   
                                    <span className="font-bold">Add Card</span>
                                    </button>
                                </div>
                            </>
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