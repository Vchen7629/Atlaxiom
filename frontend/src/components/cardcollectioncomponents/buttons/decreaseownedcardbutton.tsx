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
        } catch (err) {
          console.error('Failed to decrease card amount:', err);
        }
    };

    return (
        <button 
            className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" 
            onClick={(e) => {
                e.stopPropagation(); handleDecreaseClick(card.card_name);
                toast.success(`Decreased Owned Amount for ${card.card_name}`,
            )}}
        >
            <FontAwesomeIcon icon={faMinus}/>
        </button>
    )
}

export default DecreaseOwnedCardButtonComponent