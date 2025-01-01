
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
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from '../../../features/api-slices/ownedCardapislice.ts';
import { Card, filteredListCards, SelectedCard } from "../types/ownedcarddetailstypes.ts";

export const ListViewCardDisplayComponent = ({ displaylistprops }: filteredListCards) => {
    const { currentListPageResults } = displaylistprops

    const [increaseOwnedCard] = useIncreaseOwnedCardMutation();
    const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    const location = useLocation();
    const { userId } = location.state || {};

    const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)

    const { refetch} = useGetOwnedCardsQuery(userId);

    useEffect(() => {
      if (userId) {
        refetch();
      }
    }, [userId])

    const handleIncreaseClick = async (cardName: string) => {
        const startTime = new Date().getTime();
        try {
          await increaseOwnedCard({ 
            id: userId, 
            CardData: { 
              card_name: cardName,
              increaseOwnedAmount: 1 
            } 
          });
          const endTime = new Date().getTime();
          const apiResponseTime = endTime - startTime; 
          console.log("res:", apiResponseTime, "ms");
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
                <div className="text-[hsl(var(--text))] ">
                
                    {currentListPageResults.length > 0 ? (
                        currentListPageResults.map((card: Card, index: number) => (
                            <div key={index} className="flex bg-transparent h-24 text-sm font-bold items-center hover:bg-blacktwo" onClick={() => setSelectedCard(card)}>
                                <div className="w-[5%] pl-6 ">{card.ownedamount}</div>
                                <img 
                                    src={card.image_url} 
                                    alt={card.card_name} 
                                    className="w-[3%]" 
                                />
                                <div className="w-[25%] overflow-y-auto h-full px-[2%] flex items-center">
                                    {card.card_name}
                                </div>
                                <div className="w-[10%] overflow-y-auto h-full flex items-center">
                                    {card.set_code}
                                </div>
                                <div className="w-[25%] overflow-y-auto h-full px-[2%] flex items-center">
                                    {card.set_name}
                                </div>
                                <div className="w-[15%] overflow-y-auto h-full px-[2%] flex items-center">
                                    {card.rarity}
                                </div>
                                <div className="w-[10%] overflow-y-auto h-fullpx-[2%] flex items-center">
                                    ${card.price}
                                </div>
                                <div className="flex w-[10%] space-x-1 h-[10%] items-center mr-6">
                                    <button 
                                      className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" 
                                      onClick={(e) => { e.stopPropagation(); handleIncreaseClick(card.card_name); }}
                                    >
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                    <button 
                                      className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" 
                                      onClick={(e) => { e.stopPropagation(); handleDecreaseClick(card.card_name); }}
                                    >
                                        <FontAwesomeIcon icon={faMinus}/>
                                    </button>
                                    <button 
                                      className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer"
                                      onClick={(e) => { e.stopPropagation(); handleDeleteCardClick(card.card_name); }}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </div>
                        </div>
                        ))
                    ) : (
                        <div className="flex h-full justify-center pt-[25%] text-3xl text-gray-400 font-black">
                          <span>No cards matching your Filters</span>
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