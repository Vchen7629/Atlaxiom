import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useIncreaseOwnedCardMutation } from "@/app/api-slices/ownedCardapislice";
import { IncreaseCard} from "../types/buttontypes";
import useApiWithToast from "@/shared/hooks/useApiWithToast";
import FormatCardApiResponse from "@/shared/utils/formatCardApiResponse";

const IncreaseOwnedCardButtonComponent = ({ userId, refetch, card }: IncreaseCard) => {
    const [increaseOwnedCard] = useIncreaseOwnedCardMutation()
    
    async function updateDatabaseCardIncrease(cardName: string) {
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


    const handleClick = useApiWithToast(
      updateDatabaseCardIncrease, // using the update 
      (data: { name: string } | undefined ) => `Increased Owned Amount for Card: ${data?.name}`, // success message
      (error) => FormatCardApiResponse(error, "increase")
    )

    return (
        <button 
          className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" 
          onClick={handleClick(card.card_name)}
        >
            <FontAwesomeIcon icon={faPlus}/>
        </button>
    )
}

export default IncreaseOwnedCardButtonComponent