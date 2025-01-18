import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useIncreaseOwnedCardMutation } from "@/features/api-slices/ownedCardapislice";
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
          });
          refetch();
        } catch (err) {
          console.error('Failed to increase card amount:', err);
        }
    };

    return (
        <button 
            className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" 
            onClick={(e) => {
                e.stopPropagation(); handleIncreaseClick(card.card_name);
                toast.success(`Increased Owned Amount for ${card.card_name}`,
            )}}
        >
            <FontAwesomeIcon icon={faPlus}/>
        </button>
    )
}

export default IncreaseOwnedCardButtonComponent