import { SelectedCardData } from "@/features/search/types/dataStructures";
import { CardSet } from "@/features/search/types/searchresultcomptypes";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { waveform } from 'ldrs'
import { toastSuccessTwoMessage } from "@/shared/types/toast";
import ModifyDataDB from "@/shared/buttons/modifyDataDB";
import { UseHandleAddNewCardClick } from "../hooks/useHandleAddOwnedCardClick";
import FormatCardApiResponse from "@/shared/utils/formatCardApiResponse";

// This component implements the popup window when you click add card in the
// user card collection page
const SelectedCardMiniPage = ({ cardName }: { cardName: string }) => {
    waveform.register()
    const [selectedCardData, setSelectedCardData] = useState<SelectedCardData | null>(null);
    const [cardSets, setCardSets] = useState<CardSet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const handleAddCard = UseHandleAddNewCardClick();
    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';


    async function fetchSelectedCardData(cardName: string) {
        setLoading(true);
        const response = await fetch(`${apiUrl}?name=${encodeURIComponent(cardName)}`);
        const data = await response.json();
    
        if (response.ok) {
            setLoading(false);
            setSelectedCardData(data.data[0]);
            setCardSets(data.data[0].card_sets || []);
        } else {
            console.error('Error fetching card data:');
        }
    }
    
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
          const timer = setTimeout(() => {
            setShowLoading(false);
          }, 250);
          return () => clearTimeout(timer);
        }
        return undefined;
    }, [loading]);

    useEffect(() => {
        fetchSelectedCardData(cardName)
    }, [cardName])

    return (
        <div>
            {(loading || showLoading) ? (
                <div className="flex flex-col h-[40vh] w-[42vw] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                    <span>Loading</span>
                    <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                </div>
            ) : (
                <main className="flex flex-col xl:flex-row w-full items-center space-y-[2vh] sm:space-y-[1vh] xl:space-y-0 xl:items-start h-full">
                    <span className="flex lg:hidden text-2xl font-bold text-[hsl(var(--background3))]">{selectedCardData?.name}</span>
                    <img className="w-1/2 lg:w-[25%] object-contain"
                        src={selectedCardData?.card_images?.[0]?.image_url}
                        alt={selectedCardData?.name}
                    /> 
                    <div className="flex flex-col h-full space-y-[3vh] w-full lg:w-[40%] mx-[5%]">
                        <section className="hidden lg:flex flex-col h-fit w-full ">
                            <span className="text-2xl font-bold text-[hsl(var(--background3))]">{selectedCardData?.name}</span>
                            <span className="flex my-[3%] w-full max-h-[30vh] text-sm text-[hsl(var(--text))]">{selectedCardData?.desc}</span>
                        </section>
                        <section className="flex flex-col w-full h-fit xl:px-0 justify-evenly">
                            <div className="flex xl:mb-[4%] w-full justify-between">
                                <div className="flex flex-col w-full">
                                    <div className="font-bold text-[hsl(var(--background3))] mb-1">Card Type</div> 
                                    <div className="text-[hsl(var(--text))]"> {selectedCardData?.type}</div>
                                </div>
                                {selectedCardData?.archetype && (
                                    <div className="flex flex-col w-full">
                                        <span className="font-bold text-[hsl(var(--background3))] mb-1">Archetype</span>
                                        <span className="text-[hsl(var(--text))]">{selectedCardData.archetype}</span>
                                    </div>
                                )}
                                <div className="flex flex-col w-full">
                                    <span className="text-[hsl(var(--background3))] font-bold mb-1">Race:</span>
                                    <div className="text-[hsl(var(--text))]">{selectedCardData?.race}</div>
                                </div>
                            </div>
                            {(selectedCardData?.scale || selectedCardData?.linkval || selectedCardData?.atk || selectedCardData?.atk === 0 || selectedCardData?.def || selectedCardData?.def === 0 )&& (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex w-full space-x-[5%]">
                                        {selectedCardData.scale && (
                                            <div className="flex">
                                                <span className="mr-2 font-bold text-[hsl(var(--background3))]">Pend-Scale:</span>
                                                <span className="text-[hsl(var(--text))]">{selectedCardData.scale}</span>
                                            </div>
                                        )}
                                        {selectedCardData.linkval && (
                                            <div className="flex">
                                                <span className="mr-2 font-bold text-[hsl(var(--background3))]">Link-value:</span>
                                                <span className="text-[hsl(var(--text))]">{selectedCardData.linkval}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex w-full space-x-[5%]">
                                        {(selectedCardData.atk || selectedCardData.atk === 0) && (
                                            <div className="flex">
                                                <span className="mr-2 font-bold text-[hsl(var(--background3))]">Attack:</span>
                                                <span className="text-[hsl(var(--text))]">{selectedCardData.atk}</span>
                                            </div>
                                        )}
                                        {(selectedCardData.def || selectedCardData.def === 0)&& (
                                            <div className="flex">
                                                <span className="mr-2 font-bold text-[hsl(var(--background3))]">Defense:</span>
                                                <span className="text-[hsl(var(--text))]">{selectedCardData.def}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </section>
                        <section className="flex flex-col w-full space-y-[5%] lg:hidden justify-evenly px-[5%]">
                            <div className="w-full flex flex-col text-left">
                                <span className="mb-1 font-bold text-[hsl(var(--background3))]">Card Desc</span> 
                                <span className="flex text-[hsl(var(--text))]">{selectedCardData?.desc}</span>
                            </div>
                            <div className="flex flex-col w-full object-contain items-center">
                                <span className="text-lg text-[hsl(var(--background3))] font-bold">Card Sets</span>
                                {cardSets.length > 0 ? (
                                    <div className="flex flex-col w-full max-h-[45vh] overflow-y-auto">
                                        {cardSets.map((set, index) => (
                                            <div
                                                key={set.id}
                                                className="grid grid-cols-[30%_20%_20%_20%_5%] items-center w-full"
                                            >
                                                <div className="text-xs">{set.set_name}</div>
                                                <div className="text-xs">{set.set_code}</div>
                                                <div className="text-xs">{set.set_rarity}</div>
                                                <div className="text-xs">${set.set_price}</div>
                                                <div className="">
                                                <ModifyDataDB
                                                    onModify={() => handleAddCard(selectedCardData, set, index)}
                                                    successMessage={(data: toastSuccessTwoMessage) => `Card: ${data?.name} from set: ${data?.set} has been added`}
                                                    errorHandler={(error) => FormatCardApiResponse(error, "add")}
                                                    className="bg-[hsl(var(--background3))] rounded-lg flex items-center p-2"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </ModifyDataDB>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <main className="flex items-center text-3xl justify-center w-full h-[150px]">
                                    Card Not released in TCG
                                </main>
                            )}
                            </div>
                        </section>
                    </div>
                    <div className="hidden lg:flex flex-col w-[25%] object-contain items-center">
                        <span className="text-lg text-[hsl(var(--background3))] font-bold">Card Sets</span>
                        {cardSets.length > 0 ? (
                            <div className="flex flex-col max-h-[45vh] overflow-y-auto">
                                {cardSets.map((set, index) => (
                                    <div
                                        key={set.id}
                                        className="flex p-1 mb-2 text-xs items-center space-x-[5%] text-[hsl(var(--text))] border-2 border-[hsl(var(--background4))] rounded-xl"
                                    >
                                        <div className="w-[23%]">{set.set_name}</div>
                                        <div className="w-[18%]">{set.set_code}</div>
                                        <div className="w-[15%]">{set.set_rarity}</div>
                                        <div className="w-[13%]">${set.set_price}</div>
                                        <div className="w-[8%]">
                                        <ModifyDataDB
                                            onModify={() => handleAddCard(selectedCardData, set, index)}
                                            successMessage={(data: toastSuccessTwoMessage) => `Card: ${data?.name} from set: ${data?.set} has been added`}
                                            errorHandler={(error) => FormatCardApiResponse(error, "add")}
                                            className="bg-[hsl(var(--background3))] rounded-lg flex items-center p-2"
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </ModifyDataDB>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <main className="flex items-center text-3xl justify-center w-full h-[150px]">
                            Card Not released in TCG
                        </main>
                    )}
                    </div>
                </main>
            )}
        </div>
    )
}

export default SelectedCardMiniPage