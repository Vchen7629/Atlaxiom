import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useIncreaseOwnedCardMutation } from "@/app/api-slices/ownedCardapislice";
import { IncreaseCard } from "../types/buttontypes";


const IncreaseOwnedCardButtonComponent = ({ userId, refetch, card }: IncreaseCard) => {
    const [increaseOwnedCard] = useIncreaseOwnedCardMutation()
    
    const handleIncreaseClick = async (cardName: string) => {
        try {
          await increaseOwnedCard({ 
            id: userId, 
            CardData: { 
              card_name: cardName,
              increaseOwnedAmount: 1 
            } 
          }).unwrap();
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
                e.stopPropagation()
                const promise = handleIncreaseClick(card.card_name);
                toast.promise(promise, {
                    loading: "loading...",
                    success: (data: any) => `Increased Owned Amount for Card: ${data.name}`,
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
            <FontAwesomeIcon icon={faPlus}/>
        </button>
    )
}

export default IncreaseOwnedCardButtonComponent