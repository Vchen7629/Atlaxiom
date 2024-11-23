
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronDown, faChevronUp, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from '../../../features/api-slices/ownedCardapislice';


   
export const ComponentOwnedCardPopup: React.FC<ComponentCardSetPopupProps> = ({ filteredCards }) => {
    const [increaseOwnedCard] = useIncreaseOwnedCardMutation();
    const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    const location = useLocation();
    const { userId } = location.state || {};

    const [selectedCard, setSelectedCard] = useState(null)

    const {
        data: ownedCards,
        refetch
      } = useGetOwnedCardsQuery(userId);

    const handleIncreaseClick = async (cardName) => {
        try {
          await increaseOwnedCard({ 
            id: userId, 
            CardData: { 
              card_name: cardName,
              increaseOwnedAmount: 1 
            } 
          });
          refetch();
        } catch (err) {
          console.error('Failed to increase card amount:', err);
        }
      };
    
      const handleDecreaseClick = async (cardName) => {
        try {
          await decreaseOwnedCard({ 
            id: userId, 
            CardData: { 
              card_name: cardName,
              decreaseOwnedAmount: 1 
            } 
          });
          refetch();
        } catch (err) {
          console.error('Failed to decrease card amount:', err);
        }
      };
    
      const handleDeleteCardClick = async (cardName) => {
        try {
          await deleteOwnedCard({
            id: userId,
            CardData: { card_name: cardName }
          });
          refetch();
        } catch (err) {
          console.error('Failed to delete card:', err);
        }
      }
      console.log("selected Card Data", selectedCard)

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="border-x-2 border-b-2 pl-4 border-gray-500 ">
                    {filteredCards.length > 0 ? (
                        filteredCards.map((card, index) => (
                            <div key={index} className="flex bg-transparent h-32 items-center hover:bg-blacktwo" onClick={() => setSelectedCard(card)}>
                                <img 
                                    src={card.image_url} 
                                    alt={card.card_name} 
                                    className="w-[5%]" 
                                />
                                <div className="w-[25%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                    {card.card_name}
                                </div>
                                <div className="w-[10%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                    {card.set_code}
                                </div>
                                <div className="w-[25%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                    {card.set_name}
                                </div>
                                <div className="w-[15%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                    {card.rarity}
                                </div>
                                <div className="w-[10%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                    ${card.price}
                                </div>
                                <div className="flex w-[10%] h-[10%] items-center">
                                    <div className="mx-[5%]">{card.ownedamount}</div>
                                    <div className="flex flex-col mr-[5%]">
                                        <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleIncreaseClick((card.card_name))}>
                                        <FontAwesomeIcon icon={faChevronUp}/>
                                        </button>
                                        <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleDecreaseClick((card.card_name))}>
                                        <FontAwesomeIcon icon={faChevronDown}/>
                                        </button>
                                    </div>
                                    <button className="text-red-600 cursor-pointer"onClick={() => handleDeleteCardClick((card.card_name))}>
                                        <FontAwesomeIcon icon={faCircleXmark}/>
                                    </button>
                                </div>
                        </div>
                        ))
                    ) : (
                        <div>No cards available</div>
                    )}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blackone min-w-[40vw] border-transparent ">
            <AlertDialogHeader>
                <div className="flex justify-between">
                    <AlertDialogTitle className="w-full flex justify-center items-center">
                        {selectedCard ? (
                        <div className="text-gold ml-8">{selectedCard.card_name}</div>
                        ) : (
                            <div>No card</div>
                        )}
                    </AlertDialogTitle>
                    <AlertDialogCancel 
                        className="bg-footer shadow-custom border-transparent hover:bg-footer hover:text-gold"
                    >
                        Back
                    </AlertDialogCancel>
                </div>
                <AlertDialogDescription className="flex flex-col">
                    {selectedCard ? (
                        <div className="text-white p-2">
                            <div className="flex mb-4">
                            <img
                                src={selectedCard.image_url}
                                alt={selectedCard.card_name}
                                className="w-[30%] max-w-[30%] mr-4"
                            />
                            <div className="flex flex-col">
                                <div className="flex w-full justify-between">
                                    <strong>Type:</strong> {selectedCard.type}
                                    <strong>race:</strong> {selectedCard.race}
                                    <strong>Archetype:</strong> {selectedCard.archetype}
                                </div>
                                <div>
                                <strong>attribute:</strong> {selectedCard.attribute}
                                </div>
                                <div>
                                <strong>level:</strong> {selectedCard.level}
                                </div>
                                <div>
                                <strong>Desc:</strong> {selectedCard.desc}
                                </div>
                                <div>
                                <strong>Atk:</strong> {selectedCard.atk}
                                </div>
                                <div>
                                <strong>Def:</strong> {selectedCard.def}
                                </div>
                                <div>
                                <strong>Set Code:</strong> {selectedCard.set_code}
                                </div>
                                <div>
                                <strong>Set Name:</strong> {selectedCard.set_name}
                                </div>
                                <div>
                                <strong>Rarity:</strong> {selectedCard.rarity}
                                </div>
                                <div>
                                <strong>Owned Amount:</strong> {selectedCard.ownedamount}
                                </div>
                                <div>
                                <strong>Price:</strong> ${selectedCard.price}
                                </div>
                                
                            </div>
                            </div>
                        </div>
                        ) : (
                        <div>Select a card to view its details</div>
                        )}
                </AlertDialogDescription>   
            </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
  }