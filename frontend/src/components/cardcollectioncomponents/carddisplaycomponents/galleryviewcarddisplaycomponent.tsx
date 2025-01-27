
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
import { useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice.ts";
import { Toaster } from "sonner";
import { useGetSpecificUserQuery } from "@/app/api-slices/usersApiSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
                            className="grid grid-cols-2 sm-grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 p-4 justify-items-start items-start hover:border-10 hover-border-blacktwo"  
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
                        <div className="flex h-[80vh] w-full justify-center text-center pt-[25%] text-xl lg:text-3xl text-gray-400 font-black">
                          <span>You have no owned Cards</span>
                        </div>
                    ) : (
                        <div className="flex w-full h-full justify-center text-center pt-[25%] text-xl lg:text-3xl text-gray-400 font-black">
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
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </AlertDialogCancel>
                </div>
                <AlertDialogDescription className="flex flex-col">
                {selectedCard ? (
                        <div className="text-white p-2">
                            <div className="flex mb-4">
                                <img
                                    src={selectedCard.image_url}
                                    alt={selectedCard.card_name}
                                    className="hidden lg:flex w-[30%] max-w-[30%] lg:mr-4"
                                />
                                <div className="flex flex-col space-y-2 w-1/2 lg:hidden">
                                    <img
                                        src={selectedCard.image_url}
                                        alt={selectedCard.card_name}
                                        className="w-full"
                                    />
                                    <div className="flex flex-col text-left space-y-[1vh]">
                                        <span><strong className="font-bold">Owned Amount:</strong> {selectedCard.ownedamount}</span>
                                        <span><strong className="font-bold">Set Name:</strong> {selectedCard.set_name}</span>
                                        <span><strong className="font-bold">Price:</strong> ${selectedCard.price}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-[1vh] ml-[5vw] lg:ml-2">
                                    <div className="hidden lg:flex flex-col space-y-[2vh] w-full">
                                        <div className="flex w-full justify-between">
                                            <span><strong className="mr-2">Type:</strong>{selectedCard.type}</span>
                                            <span><strong className="mr-2">race:</strong> {selectedCard.race}</span>
                                            <span><strong className="mr-2">Archetype:</strong> {selectedCard.archetype}</span>
                                        </div>
                                        {selectedCard.attribute || selectedCard.level && (
                                            <div className="flex w-full justfiy-between">
                                                <span><strong>attribute:</strong> {selectedCard.attribute}</span>
                                                <span><strong>level:</strong> {selectedCard.level}</span>
                                            </div>
                                        )}
                                        <span><strong>Desc:</strong> {selectedCard.desc}</span>
                                        {selectedCard.atk || selectedCard.def && (
                                            <div className="flex w-full justify-between">
                                                <span><strong>Atk:</strong> {selectedCard.atk}</span>
                                                <span><strong>Def:</strong> {selectedCard.def}</span>
                                            </div>
                                        )}
                                        <div className="flex w-full justify-between">
                                            <span><strong>Set Name:</strong> {selectedCard.set_name}</span>
                                            <span><strong>Set Code:</strong> {selectedCard.set_code}</span>
                                        </div>
                                        <div><strong>Rarity:</strong> {selectedCard.rarity}</div>
                                        <div><strong>Owned Amount:</strong> {selectedCard.ownedamount}</div>
                                        <div><strong>Price:</strong> ${selectedCard.price}</div>
                                    </div>
                                    <div className="flex flex-col space-y-[2vh] text-left lg:hidden w-[45vw] justify-between ">
                                        <span><strong className="mr-2">Type:</strong> {selectedCard.type}</span>
                                        <span><strong className="mr-2">race:</strong> {selectedCard.race}</span>
                                        <span><strong className="mr-2">Archetype:</strong> {selectedCard.archetype}</span>
                                        {selectedCard.attribute || selectedCard.level && (
                                            <div className="flex flex-col space-y-[2vh]">
                                                <span><strong>attribute:</strong> {selectedCard.attribute}</span>
                                                <span><strong>level:</strong> {selectedCard.level}</span>
                                            </div>
                                        )}
                                        <span className="max-w-full text-wrap"><strong>Desc:</strong> {selectedCard.desc}</span>
                                        {selectedCard.atk || selectedCard.def && (
                                            <div className="flex flex-col w-full space-y-[2vh]">
                                                <span><strong>Atk:</strong> {selectedCard.atk}</span>
                                                <span><strong>Def:</strong> {selectedCard.def}</span>
                                            </div>
                                        )}
                                        <span><strong>Set Code:</strong> {selectedCard.set_code}</span>
                                        <div><strong>Rarity:</strong> {selectedCard.rarity}</div>
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