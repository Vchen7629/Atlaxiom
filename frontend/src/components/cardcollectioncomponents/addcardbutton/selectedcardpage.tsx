import { SelectedCardData } from "@/components/searchpagecomponents/types/datastructuretypes";
import { CardSet } from "@/components/searchpagecomponents/types/searchresultcomptypes";
import { useAddNewOwnedCardMutation, useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { selectedcard } from "../types/addcardtypes";
import { toast } from "sonner";

const SelectedCardComponent = ({ selectedcardprops }: selectedcard) => {
    const {
        setSelectedCard,
        cardName,
        userId
    } = selectedcardprops

    const [selectedCardData, setSelectedCardData] = useState<SelectedCardData | null>(null);
    const [cardSets, setCardSets] = useState<CardSet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    const [addNewOwnedCard] = useAddNewOwnedCardMutation();
    const { refetch } = useGetOwnedCardsQuery(userId);

    const fetchSelectedCardData = async (cardName: string) => {
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}?name=${encodeURIComponent(cardName)}`);
          const data = await response.json();
    
          if (response.ok) {
            setLoading(false);
            setSelectedCardData(data.data[0]);
            setCardSets(data.data[0].card_sets || []);
          } else {
            console.error('Error fetching card data:');
          }
        } catch (error) {
          throw error
        }
        
    }

    useEffect(() => {
        fetchSelectedCardData(cardName)
    }, [cardName])

    const handleClick = () => {
        setSelectedCard(false)
    }

    const handleAddOwnedCardClick = async (set: CardSet, index: number) => {
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
                refetch();
                return { name: selectedCardData.name, set: selectedCardData?.card_sets?.[index]?.set_name};
            } catch (error) {
                throw error;
            }
        } else {
            console.error("No selected Card Data")
        }      
    }

    return (
        <>
            {loading ? (
                <span className="h-[50vh] w-full flex items-center justify-center text-3xl font-bold">Loading...</span>
            ) : (
                <main className="flex w-full  h-full">
                    <img className="w-[15vw] object-contain"
                        src={selectedCardData?.card_images?.[0]?.image_url}
                        alt={selectedCardData?.name}
                    /> 
                    <div className="flex flex-col h-full max-h-[40vh] justify-between w-[25vw] mx-[5%]">
                        <section className="flex flex-col h-fit w-full ">
                            <span className="text-2xl font-bold text-[hsl(var(--background3))]">{selectedCardData?.name}</span>
                            <span className="flex my-[3%] w-full max-h-[30vh] text-sm text-[hsl(var(--text))]">{selectedCardData?.desc}</span>
                        </section>
                        <section className="flex flex-col h-[20vh] justify-evenly">
                            <div className="flex mb-[4%] w-full space-x-4">
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
                                    <div className="flex  w-1/2 justify-between">
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
                                    <div className="flex w-1/2 justify-between">
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
                    </div>
                    <div className="flex flex-col w-[25vw] object-contain items-center">
                        <button onClick={handleClick} className="border-2 border-[hsl(var(--background3))] hover:bg-[hsl(var(--background3))] py-2 px-2 rounded-md text-[hsl(var(--text))] mb-4">
                            Back to Card Search
                        </button>
                        {cardSets.length > 0 ? (
                            <div className="flex flex-col max-h-[45vh] overflow-y-auto">
                                {cardSets.map((set, index) => (
                                    <div
                                        key={index}
                                        className="flex p-1 mb-2 text-xs items-center space-x-[5%] text-[hsl(var(--text))] border-2 border-[hsl(var(--background4))] rounded-xl"
                                    >
                                            <>
                                                <div className="w-[25%]">{set.set_name}</div>
                                                <div className="w-[18%]">{set.set_code}</div>
                                                <div className="w-[15%]">{set.set_rarity}</div>
                                                <div className="w-[13%]">${set.set_price}</div>
                                                <div className="w-[8%]">
                                                    <button
                                                        onClick={() => {
                                                            const promise = handleAddOwnedCardClick(set, index);
                                                            toast.promise(promise, {
                                                                loading: "loading...",
                                                                success: (data: any) => `Card: ${data.name} from set: ${data.set} has been added`,
                                                                error: (error: any) => {
                                                                    if (error?.status === 409) {
                                                                        return error?.response?.data?.message || "You already Own this Card";
                                                                    }
                                                                    return "An Error occured while adding the Card"
                                                                },
                                                            })
                                                        }}
                                                        className="bg-[hsl(var(--background3))] rounded-lg flex items-center p-2"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </>
                                    
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
        </>
    )
}

export default SelectedCardComponent