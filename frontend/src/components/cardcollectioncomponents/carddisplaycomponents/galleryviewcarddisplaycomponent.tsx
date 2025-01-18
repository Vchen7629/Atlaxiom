
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
import { Card, filteredGalleryCards, SelectedCard } from "../types/ownedcarddetailstypes.ts";
import IncreaseOwnedCardButtonComponent from "../buttons/increasedownedcardbutton.tsx";
import DecreaseOwnedCardButtonComponent from "../buttons/decreaseownedcardbutton.tsx";
import DeleteOwnedCardButtonComponent from "../buttons/deleteownedcardbutton.tsx";
import { useLocation } from "react-router-dom";
import { useGetOwnedCardsQuery } from "@/features/api-slices/ownedCardapislice.ts";
import { Toaster } from "sonner";
import { useGetSpecificUserQuery } from "@/features/api-slices/usersApiSlice.ts";

export const GalleryViewCardDisplayComponent = ({ displaygalleryprops }: filteredGalleryCards) => {
    const { currentGalleryPageResults } = displaygalleryprops
    const location = useLocation();
    const { userId } = location.state || {};

    const { refetch } = useGetOwnedCardsQuery(userId);

    const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)
    const { data: ownedCardCount } = useGetSpecificUserQuery(userId);
          
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex">
                    {currentGalleryPageResults.length > 0 ? (
                        <div 
                            className="grid grid-cols-10 gap-4 p-4 justify-items-start items-start hover:border-10 hover-border-blacktwo"  
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {currentGalleryPageResults.map((card: Card, index: number) => (
                                <div key={index} className="flex flex-col w-fit group relative items-center space-y-2" onClick={() => setSelectedCard(card)}>
                                    <label className="bg-[hsl(var(--background3))] w-fit  font-bold text-[hsl(var(--text))] px-4 text-sm rounded-xl">{card?.ownedamount}x</label>
                                    <img src={card.image_url} alt={card.card_name} className="h-full object-contain group-hover:blur-xs"/>
                                    <span className="absolute inset-0 flex items-center justify-center h-[73%] top-5 bg-black bg-opacity-50 text-white text-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {card.card_name}
                                    </span>
                                    <Toaster richColors  expand visibleToasts={4}/>  
                                    <div className="flex space-x-2">
                                        <IncreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                        <DecreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                        <DeleteOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                    </div>              
                                </div>
                            ))}
                        </div>
                    ) : ownedCardCount?.entities[userId].totalOwnedCards === 0 ? (
                        <div className="flex h-[80vh] w-full justify-center pt-[25%] text-3xl text-gray-400 font-black">
                          <span>You have no owned Cards</span>
                        </div>
                    ) : (
                        <div className="flex w-full h-full justify-center pt-[25%] text-3xl text-gray-400 font-black">
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