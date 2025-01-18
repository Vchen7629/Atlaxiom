import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import { DecreaseCard } from "../types/buttontypes";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteOwnedCardMutation } from "@/features/api-slices/ownedCardapislice";


const DeleteOwnedCardButtonComponent = ({ userId, refetch, card }: DecreaseCard) => {
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    
    
    const handleDeleteCardClick = async (cardName: string) => {
        try {
          await deleteOwnedCard({
            id: userId,
            CardData: { card_name: cardName }
          });
          refetch();
        } catch (err) {
          console.error('Failed to delete card:', err);
        }
    }

    return (
        <button 
            className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer"
            onClick={(e) => {
                e.stopPropagation(); handleDeleteCardClick(card.card_name);
                toast.success(`Deleted Card: ${card.card_name}`, {
                    icon: <FontAwesomeIcon icon={faTrash}/>
                }
            )}}
        >
            <FontAwesomeIcon icon={faTrash}/>
        </button>
    )
}

export default DeleteOwnedCardButtonComponent