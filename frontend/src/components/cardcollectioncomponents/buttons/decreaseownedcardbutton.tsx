import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import { useDecreaseOwnedCardMutation } from "@/features/api-slices/ownedCardapislice";
import { DecreaseCard } from "../types/buttontypes";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


const DecreaseOwnedCardButtonComponent = ({ userId, refetch, card }: DecreaseCard) => {
    const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
    
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
          return { name: cardName };
        } catch (error) {
          throw error
        }
    };

    return (
        <button 
            className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" 
            onClick={(e) => {
                e.stopPropagation(); 
                const promise = handleDecreaseClick(card.card_name);
                toast.promise(promise, {
                    loading: "loading...",
                    success: (data: any) => `Decreased Owned Amount for Card: ${data.name}`,
                    error: (error: any) => {
                      if (error?.status === 404) {
                            return error?.response?.data?.message || "Card Not Found";
                      } else if (error?.status === 400) {
                          return error?.response?.data?.message || "Missing UserId, Card Name or Valid IncreaseOwnedAmount";
                      }
                      return
                    },
                })
            }}
        >
            <FontAwesomeIcon icon={faMinus}/>
        </button>
    )
}

export default DecreaseOwnedCardButtonComponent