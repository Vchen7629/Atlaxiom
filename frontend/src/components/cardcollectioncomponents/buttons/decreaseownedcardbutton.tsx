import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import { useDecreaseOwnedCardMutation } from "@/app/api-slices/ownedCardapislice";
import { DecreaseCard, toastErrorMessage, toastSuccessMessage } from "../types/buttontypes";
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
          }).unwrap();
          refetch();
          return { name: cardName };
        } catch (error) {
          throw error
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      const promise = handleDecreaseClick(card.card_name);
        toast.promise(promise, {
        loading: "loading...",
        success: (data: toastSuccessMessage) => `Decreased Owned Amount for Card: ${data?.name}`,
        error: (error: toastErrorMessage) => {
          if (error?.status === 404) {
            return error?.response?.data?.message || "Card Not Found";
          } else if (error?.status === 400) {
            return error?.response?.data?.message || "Missing UserId, Card Name or Valid IncreaseOwnedAmount";
          } else if (error?.status === 405) {
            return error?.response?.data?.message || "Unable to decrease card to 0, try deleting the card instead";
          } else {
            return "An unexpected error occurred";
          }
        },
      })
    }

    return (
        <button className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" onClick={handleClick}>
            <FontAwesomeIcon icon={faMinus}/>
        </button>
    )
}

export default DecreaseOwnedCardButtonComponent