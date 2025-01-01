import { SelectedCardData } from "@/components/searchpagecomponents/types/datastructuretypes";
import { CardSet } from "@/components/searchpagecomponents/types/searchresultcomptypes";
import { useAddNewOwnedCardMutation, useGetOwnedCardsQuery } from "@/features/api-slices/ownedCardapislice";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { selectedcard } from "../types/addcardtypes";

const SelectedCardComponent = ({ selectedcardprops }: selectedcard) => {
    const {
        setSelectedCard,
        cardName,
        userId
    } = selectedcardprops

    const [selectedCardData, setSelectedCardData] = useState<SelectedCardData | null>(null);
    const [cardSets, setCardSets] = useState<CardSet[]>([]);
    const [cardMessages, setCardMessages] = useState<{ [key: number]: string }>({})
    const [loading, setLoading] = useState<boolean>(true);


    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    const [addNewOwnedCard] = useAddNewOwnedCardMutation();
    const { refetch } = useGetOwnedCardsQuery(userId);

    const fetchSelectedCardData = async (cardName: string) => {
        setLoading(true);
        try {
          const response = await fetch(`${apiUrl}?name=${encodeURIComponent(cardName)}`);
          const data = await response.json();
          console.log('Fetched data:', data);
    
          if (response.ok) {
            setLoading(false);
            setSelectedCardData(data.data[0]);
            setCardSets(data.data[0].card_sets || []);
          } else {
            console.error('Error fetching card data:', data.message);
          }
        } catch  {
          console.error('Error fetching card data:', Error);
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
                setCardMessages(prev => ({...prev, [index]: "Card successfully added to Collection!"}));
                refetch()
            } catch (error) {
                setCardMessages(prev => ({...prev, [index]: "Error adding Card to Collection."}));
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
                <main className="flex w-full max-h-[55vh]">
                    <img className="w-[15vw] object-contain"
                        src={selectedCardData?.card_images?.[0]?.image_url}
                        alt={selectedCardData?.name}
                    /> 
                    <div className="flex flex-col h-[55vh] w-[25vw] mx-[5%]">
                        <div className="text-xl text-goldenrod h-[5vh] w-full">{selectedCardData?.name}</div>
                        <div className="flex my-[3%] text-sm text-gray-300 w-full max-h-[30vh]">{selectedCardData?.desc}</div>
                        <div className="flex flex-col h-[20vh] pt-[4%] text-md">
                            <div className="flex mb-[4%] w-full space-x-4">
                                <div className="flex flex-col w-full text-white">
                                    <div className="text-gold mb-1">Card Type</div> 
                                    <div className="text-gray-200"> {selectedCardData?.type}</div>
                                </div>
                                {selectedCardData?.archetype && (
                                    <div className="flex flex-col w-full text-white">
                                    <div className="text-gold mb-1">Archetype</div>
                                    <div className="text-gray-200">{selectedCardData.archetype}</div>
                                    </div>
                                )}
                                <div className="flex flex-col w-full text-white">
                                    <div className="text-gold mb-1">Race:</div>
                                    <div className="text-gray-200">{selectedCardData?.race}</div>
                                </div>
                            </div>
                            {(selectedCardData?.scale || selectedCardData?.linkval || selectedCardData?.atk || selectedCardData?.def)&& (
                                <>
                                    <div className="flex flex-col mb-[4%] w-[90%]">
                                        <div className="flex space-x-2">
                                            {selectedCardData.scale && (
                                                <>
                                                    <div className="flex text-white">
                                                        <div className="mr-2 text-gold">Pend-Scale:</div>
                                                        <div>{selectedCardData.scale}</div>
                                                    </div>
                                                </>
                                            )}
                                            {selectedCardData.linkval && (
                                                <>
                                                    <div className="flex text-white">
                                                        <div className="mr-2 text-gold">Link-value:</div>
                                                        <div>{selectedCardData.linkval}</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            {(selectedCardData.atk || selectedCardData.atk === 0)&& (
                                                <>
                                                    <div className="flex text-white">
                                                        <div className="mr-2 text-gold">Attack:</div>
                                                        <div>{selectedCardData.atk}</div>
                                                    </div>
                                                </>
                                            )}
                                            {(selectedCardData.def || selectedCardData.def === 0)&& (
                                                <>
                                                    <div className="flex text-white">
                                                        <div className="mr-2 text-gold">Defense:</div>
                                                        <div>{selectedCardData.def}</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </>
                                )}
                        </div>
                    </div>
                    <div className="flex flex-col w-[25vw] object-contain items-center">
                        <button onClick={handleClick} className="bg-[hsl(var(--background3))] py-1 px-2 rounded-md text-[hsl(var(--text))] mb-4">
                            Back to Card Search
                        </button>
                        {cardSets.length > 0 ? (
                            <div className="flex flex-col max-h-[45vh] overflow-y-auto">
                                {cardSets.map((set, index) => (
                                    <div
                                        key={index}
                                        className="flex p-2 mb-2 text-xs items-center space-x-[5%] text-gold bg-[hsl(var(--background4))] rounded-xl"
                                    >
                                        {!cardMessages[index] ? (
                                            <>
                                                <div className="w-[25%]">{set.set_name}</div>
                                                <div className="w-[18%]">{set.set_code}</div>
                                                <div className="w-[15%]">{set.set_rarity}</div>
                                                <div className="w-[13%]">${set.set_price}</div>
                                                <div className="w-[8%]">
                                                    <button
                                                        onClick={() => handleAddOwnedCardClick(set, index)}
                                                        className="bg-blue-500 rounded-lg flex items-center p-2"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className={`h-full w-full flex justify-center p-2 text-[12px] ${
                                                    cardMessages[index].includes("successfully") ? 'text-green-500' : 'text-red-600'
                                                }`}
                                            >
                                                {cardMessages[index]}
                                            </div>
                                        )}
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