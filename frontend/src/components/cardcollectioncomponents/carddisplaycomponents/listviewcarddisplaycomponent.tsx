
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { useGetOwnedCardsQuery } from '../../../app/api-slices/ownedCardapislice.ts';
import { Card, filteredListCards, SelectedCard } from "../types/ownedcarddetailstypes.ts";
import { useGetSpecificUserQuery } from "@/app/api-slices/usersApiSlice.ts";
import { Toaster } from "sonner";
import IncreaseOwnedCardButtonComponent from "../buttons/increasedownedcardbutton.tsx";
import DecreaseOwnedCardButtonComponent from "../buttons/decreaseownedcardbutton.tsx";
import DeleteOwnedCardButtonComponent from "../buttons/deleteownedcardbutton.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { waveform } from 'ldrs'
import { AuthenticationState } from "@/components/accountbuttons/accounttypes.ts";
import { useSelector } from "react-redux";
import { OwnedCard } from "../types/dataStructures.ts";

export const ListViewCardDisplayComponent = ({ displaylistprops }: filteredListCards) => {
    waveform.register()
    const { currentListPageResults, isLoading } = displaylistprops
    const userId = useSelector((state: AuthenticationState) => state.auth.userId);

    const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)

    const handleClick = (card: Card) => () => {
        setSelectedCard(card);
    };

    const { refetch } = useGetOwnedCardsQuery(userId);
    const { data: ownedCardCount } = useGetSpecificUserQuery(userId);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (!isLoading) {
          const timer = setTimeout(() => {
            setShowLoading(false);
          }, 250);
          return () => clearTimeout(timer);
        }
        return undefined;
    }, [isLoading]);
      
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>       
                <div className="text-[hsl(var(--text))] bg-[hsl(var(--ownedcardcollection))] rounded-b-lg h-full flex flex-col">
                    {showLoading ? (
                        <div className="flex flex-col h-[65vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                            <span>Loading</span>
                            <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                        </div>
                    ) : currentListPageResults.length > 0 ? (
                        currentListPageResults.map((card: OwnedCard) => (
                            <div 
                                key={card.id} 
                                className="grid grid-cols-[30%_35%_35%] lg:grid-cols-[5%_3%_25%_10%_25%_15%_9%_8%] bg-transparent min-h-24 text-sm font-bold items-center hover:bg-blacktwo focus:outline-none focus:ring-2 focus:ring-[hsl(var(--background3))]" 
                                onClick={handleClick(card)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleClick(card)();
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label={`Select card ${card.card_name}`}
                            >
                                <div className="hidden lg:flex pl-6 ">{card.ownedamount}</div>
                                <div className="flex items-center justify-center h-24">
                                    <img src={card.image_url} alt={card.card_name} className="w-3/4 h-[65%] lg:w-full lg:h-[90%] object-contain" />
                                </div>
                                <div className="flex flex-col items-center overflow-auto space-y-2 md:space-y-[4vh] py-[2vh] w-full h-full lg:hidden">
                                    <span className="text-xs md:text-xl text-center">{card.card_name}</span>
                                    <span className="text-xs md:text-xl text-center">{card.set_name}</span>
                                    <div className="space-x-2"> 
                                        <span className="text-xs md:text-xl text-center">{card.rarity}</span>
                                        <span className="text-xs md:text-xl text-center">${card.price}</span>
                                    </div>
                                </div>
                                <div className="hidden lg:flex overflow-y-auto h-full px-[2vw] items-center">
                                    {card.card_name}
                                </div>
                                <div className="hidden lg:flex overflow-y-auto h-full items-center">
                                    {card.set_code}
                                </div>
                                <div className="hidden lg:flex overflow-y-auto h-full items-center">
                                    {card.set_name}
                                </div>
                                <div className="hidden lg:flex overflow-y-auto h-full items-center">
                                    {card.rarity}
                                </div>
                                <div className="hidden lg:flex overflow-y-auto h-full items-center">
                                    ${card.price}
                                </div>
                                <div className="flex space-x-1 h-[10%] w-[90%] justify-center items-center mr-6">
                                    <IncreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                    <DecreaseOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                    <DeleteOwnedCardButtonComponent card={card} userId={userId} refetch={refetch}/>
                                </div>
                                
                                <Toaster richColors  expand visibleToasts={4}/>
                                
                            </div>
                        ))
                    ) : ownedCardCount?.totalOwnedCards === 0 ? (
                      <div className="flex fkex-col h-[65vh] justify-center items-center text-xl lg:text-3xl text-gray-400 font-black">
                        <span>You have no owned Cards</span>
                      </div>
                    ) : (
                        <div className="flex flex-col h-[65vh] justify-center items-center text-xl lg:text-3xl text-gray-400 font-black">
                          <span>No cards matching your Filters</span>
                        </div>
                    )}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[hsl(var(--ownedcardcollection))] min-w-[40vw] border-transparent ">
            <AlertDialogHeader>
                <div className="flex justify-between">
                    <AlertDialogTitle className="w-full flex justify-center items-center">
                        {selectedCard ? (
                        <div className="text-[hsl(var(--background3))] font-bold lg:text-3xl">{selectedCard.card_name}</div>
                        ) : (
                            <div>No card</div>
                        )}
                    </AlertDialogTitle>
                    <AlertDialogCancel 
                        className="bg-[hsl(var(--background3))] shadow-custom border-transparent hover:bg-footer hover:text-gold"
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
                                    className="hidden lg:flex w-[29%] max-w-[30%] lg:mr-4"
                                />
                                <div className="flex flex-col space-y-2 w-1/2 lg:hidden">
                                    <img
                                        src={selectedCard.image_url}
                                        alt={selectedCard.card_name}
                                        className="max-w-[10px]"
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
                                            <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Type:</strong>{selectedCard.type}</span>
                                            <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">race:</strong> {selectedCard.race}</span>
                                            <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Archetype:</strong> {selectedCard.archetype}</span>
                                        </div>
                                        {selectedCard.attribute || selectedCard.level && (
                                            <div className="flex w-full justfiy-between">
                                                <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">attribute:</strong> {selectedCard.attribute}</span>
                                                <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">level:</strong> {selectedCard.level}</span>
                                            </div>
                                        )}
                                        <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Desc:</strong> {selectedCard.desc}</span>
                                        {selectedCard.atk || selectedCard.def && (
                                            <div className="flex w-full justify-between">
                                                <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Atk:</strong> {selectedCard.atk}</span>
                                                <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Def:</strong> {selectedCard.def}</span>
                                            </div>
                                        )}
                                        <div className="flex w-full space-x-[1vw]">
                                            <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Set Name:</strong> {selectedCard.set_name}</span>
                                            <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Set Code:</strong> {selectedCard.set_code}</span>
                                        </div>
                                        <div className="flex w-full space-x-[1vw]">
                                            <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Rarity:</strong> {selectedCard.rarity}</span>
                                            <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Price:</strong> ${selectedCard.price}</span>
                                        </div>
                                        <span className="text-[hsl(var(--text))] text-md"><strong className="mr-2">Owned Amount:</strong> {selectedCard.ownedamount}</span>
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