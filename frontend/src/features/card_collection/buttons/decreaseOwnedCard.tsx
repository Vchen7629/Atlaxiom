import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDecreaseOwnedCardMutation } from "@/app/api-slices/ownedCardapislice";
import { DecreaseCard} from "../types/buttontypes";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import useApiWithToast from "../../../shared/hooks/useApiWithToast";
import FormatCardApiResponse from "@/shared/utils/formatCardApiResponse";


const DecreaseOwnedCardButton = ({ refetch, card }: DecreaseCard) => {
    const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
    
    async function updateDatabaseCardDecrease(cardName: string) {
      await decreaseOwnedCard({ 
        CardData: { 
          card_name: cardName,
          decreaseOwnedAmount: 1 
        } 
      }).unwrap();
      refetch();
      return { name: cardName };
    };

    const handleClick = useApiWithToast(
      updateDatabaseCardDecrease, // using the update 
      (data: { name: string } | undefined ) => `Decreased Owned Amount for Card: ${data?.name}`, // success message
      (error) => FormatCardApiResponse(error, "decrease")
    )

    return (
        <button 
          className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" 
          onClick={handleClick(card.card_name)}
        >
            <FontAwesomeIcon icon={faMinus}/>
        </button>
    )
}

export default DecreaseOwnedCardButton