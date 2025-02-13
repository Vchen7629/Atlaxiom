
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
import { useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice.ts";
import { Toaster } from "sonner";
import { useGetSpecificUserQuery } from "@/app/api-slices/usersApiSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { OwnedCard } from "../types/dataStructures.ts";
import { useSelector } from "react-redux";
import { AuthenticationState } from "@/components/accountbuttons/accounttypes.ts";

export const GalleryViewCardDisplayComponent = ({ displaygalleryprops }: filteredGalleryCards) => {
    const { currentGalleryPageResults, expandStatus } = displaygalleryprops
    const userId = useSelector((state: AuthenticationState) => state.auth.userId);

    const { refetch } = useGetOwnedCardsQuery(userId);

    const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)

    const handleClick = (card: Card) => () => {
        setSelectedCard(card);
    };

    const { data: ownedCardCount } = useGetSpecificUserQuery(userId);
          
    console.log(currentGalleryPageResults)
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex">
                    {currentGalleryPageResults.length > 0 ? (
                        <div 
                            className={`animate-fade-in-up w-full grid grid-cols-2 sm-grid-cols-4 ${expandStatus ? "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8" : "md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10"} gap-4 p-4 justify-items-start items-start hover:border-10 hover-border-blacktwo`}
                            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                        >
                            {currentGalleryPageResults.map((card: OwnedCard) => (
                                <div
                                    key={card.id} 
                                    className="flex flex-col w-[35vw] sm:w-[20vw] md:w-[16vw] lg:w-[12vw] xl:w-[7vw] group relative items-center space-y-2 bg-[hsl(var(--contrast))] p-3 rounded-xl shadow-lg shadow-[hsl(var(--shadow))]" 
                                    onClick={handleClick(card)}
                                    role="button"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleClick(card)();
                                        }
                                    }}
                                    tabIndex={0}
                                    aria-label={`Select card ${card.card_name}`}
                                >
                                    <label className="w-fit font-bold text-[hsl(var(--text))]  text-sm">{card?.ownedamount}x</label>
                                    <div className="relative xl:w-[75%]">
                                        <img 
                                            src={card.image_url} 
                                            alt={card.card_name} 
                                            className="w-full object-contain group-hover:blur-xs"
                                        />
                                        {/* Overlay div perfectly aligned with image */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {card.card_name}
                                        </div>
                                    </div>
                                    <Toaster richColors  expand visibleToasts={4}/>  
                                    <div className="flex items-center space-x-2">
                                        <IncreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                        <DecreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                        <DeleteOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                    </div>              
                                </div>
                            ))}
                        </div>
                    ) : ownedCardCount?.totalOwnedCards === 0 ? (
                        <div className="flex h-[90vh] w-full justify-center text-center pt-[25%] text-xl lg:text-3xl text-gray-400 font-black">
                          <span>You have no owned Cards</span>
                        </div>
                    ) : (
                        <div className="flex w-full h-[90vh] justify-center text-center pt-[25%] text-xl lg:text-3xl text-gray-400 font-black">
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