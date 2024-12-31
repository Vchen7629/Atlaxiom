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
import { useAddNewOwnedCardMutation } from '../../../features/api-slices/ownedCardapislice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
   
export const AddCardButton = () => {
    const [cardMessages, setCardMessages] = useState<{ [key: number]: string }>({});
    const [cardName, setCardName] = useState("");
    const [addNewOwnedCard] = useAddNewOwnedCardMutation();

    const handleBackClick = () => {
        setCardMessages({});
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setCardName(inputValue);
        //setSelectedCardData(null);
    };

    const handleClearClick = () => {
        setCardName('');
        //setSelectedCardData(null);
    };

    const handleAddOwnedCardClick = async () => {
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
            <Button className="flex items-center justify-center rounded-md w-28 h-9 bg-blue-500">
                <FontAwesomeIcon className="mr-1" icon={faPlusCircle}/>Add Card
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[hsl(var(--background1))] min-w-[60vw] min-h-[60vh] border-transparent ">
          <AlertDialogHeader>
            <div className="flex justify-between w-full">
                <AlertDialogTitle>Add Card to collection</AlertDialogTitle>
                <AlertDialogCancel 
                    className="bg-footer shadow-custom border-transparent hover:bg-footer hover:text-gold"
                    onClick={handleBackClick}
                >
                    Back
                </AlertDialogCancel>
            </div>
            <AlertDialogDescription className="flex justify-center pt-8">
                <div className="flex w-[90%] h-[50px] pl-5 relative border-[1px] border-gray-400 justify-start text-[hsl(var(--text))]">                      
                    <div className="flex items-center w-full">
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        <input
                            className="bg-transparent w-full h-full text-xl focus:outline-none"
                            type="text"
                            value={cardName}
                            onChange={handleInputChange}
                            placeholder="Enter card name"
                        />
                        {cardName && (
                            <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                                <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                            </button>
                        )}
                    </div>
                </div>
            </AlertDialogDescription>   
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }