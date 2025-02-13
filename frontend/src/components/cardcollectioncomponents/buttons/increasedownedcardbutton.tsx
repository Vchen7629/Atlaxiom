import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useIncreaseOwnedCardMutation } from "@/app/api-slices/ownedCardapislice";
import { IncreaseCard, toastErrorMessage, toastSuccessMessage } from "../types/buttontypes";

const IncreaseOwnedCardButtonComponent = ({ userId, refetch, card }: IncreaseCard) => {
    const [increaseOwnedCard] = useIncreaseOwnedCardMutation()
    
    async function handleIncreaseClick(cardName: string) {
      await increaseOwnedCard({ 
        id: userId, 
        CardData: { 
          card_name: cardName,
          increaseOwnedAmount: 1 
        } 
      }).unwrap();
      refetch();
      return { name: cardName };
    };


    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation()
      const promise = handleIncreaseClick(card.card_name);
      toast.promise(promise, {
        loading: "loading...",
        success: (data: toastSuccessMessage) => `Increased Owned Amount for Card: ${data?.name}`,
        error: (error: toastErrorMessage) => {
          if (error?.status === 404) {
            return error?.response?.data?.message || "Card Not Found";
          } else if (error?.status === 400) {
            return error?.response?.data?.message || "Missing UserId, Card Name or Valid IncreaseOwnedAmount";
          } else {
            return "An unexpected error occurred";
          }
        },
      })
    }

    return (
        <button className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" onClick={handleClick}>
            <FontAwesomeIcon icon={faPlus}/>
        </button>
    )
}

export default IncreaseOwnedCardButtonComponent