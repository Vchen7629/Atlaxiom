
import {
    AlertDialog,
    //AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from '../../../api-slices/ownedCardapislice.tsx';
import { Card, filteredCards, SelectedCard } from "../types/ownedcarddetailstypes.ts";

export const GalleryViewCardDisplayComponent: React.FC<filteredCards> = ({ filteredCards }) => {
    const [increaseOwnedCard] = useIncreaseOwnedCardMutation();
    const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    const location = useLocation();
    const { userId } = location.state || {};

    const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)

    const {refetch} = useGetOwnedCardsQuery(userId);

    const handleIncreaseClick = async (cardName: string) => {
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
    
      const handleDecreaseClick = async (cardName: string) => {
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
    
      const handleDeleteCardClick = async (cardName: string) => {
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
      
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex w-full min-h-[100vh]">
                    {filteredCards.length > 0 ? (
                        <div 
                            className="grid grid-cols-10 gap-4 w-full h-full p-4 justify-items-start items-start"  
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {filteredCards.map((card: Card, index: number) => (
                                <div key={index} className="flex h-full w-full" onClick={() => setSelectedCard(card)}>
                                    <img src={card.image_url} alt={card.card_name} className="h-[80%] object-contain"/>                
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full justify-center pt-[25%] text-3xl text-gray-400 font-black">
                            <p>No cards matching your Filters</p>
                        </div>
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