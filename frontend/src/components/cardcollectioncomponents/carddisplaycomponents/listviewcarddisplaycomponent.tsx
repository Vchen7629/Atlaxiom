
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useGetOwnedCardsQuery } from '../../../features/api-slices/ownedCardapislice.ts';
import { Card, filteredListCards, SelectedCard } from "../types/ownedcarddetailstypes.ts";
import { useGetSpecificUserQuery } from "@/features/api-slices/usersApiSlice.ts";
import { Toaster } from "sonner";
import IncreaseOwnedCardButtonComponent from "../buttons/increasedownedcardbutton.tsx";
import DecreaseOwnedCardButtonComponent from "../buttons/decreaseownedcardbutton.tsx";
import DeleteOwnedCardButtonComponent from "../buttons/deleteownedcardbutton.tsx";

export const ListViewCardDisplayComponent = ({ displaylistprops }: filteredListCards) => {
    const { currentListPageResults } = displaylistprops
    const location = useLocation();
    const { userId } = location.state || {};

    const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)

    const { refetch } = useGetOwnedCardsQuery(userId);
    const { data: ownedCardCount } = useGetSpecificUserQuery(userId);
      
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
              
                <div className="text-[hsl(var(--text))]">
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
                                
                                <Toaster richColors  expand visibleToasts={4}/>
                                <div className="flex w-[10%] space-x-1 h-[10%] items-center mr-6">
                                    <IncreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                    <DecreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                    <DeleteOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                </div>
                        </div>
                        ))
                    ) : ownedCardCount?.entities[userId].totalOwnedCards === 0 ? (
                      <div className="flex h-[80vh] justify-center pt-[25%] text-3xl text-gray-400 font-black">
                        <span>You have no owned Cards</span>
                      </div>
                    ) : (
                        <div className="flex h-[80vh] justify-center pt-[25%] text-3xl text-gray-400 font-black">
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