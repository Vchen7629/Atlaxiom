import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import { DecreaseCard, toastErrorMessage, toastSuccessMessage } from "../types/buttontypes";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteOwnedCardMutation } from "@/app/api-slices/ownedCardapislice";


const DeleteOwnedCardButtonComponent = ({ userId, refetch, card }: DecreaseCard) => {
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    
    async function handleDeleteCardClick(cardName: string) {
      await deleteOwnedCard({
        id: userId,
        CardData: { card_name: cardName }
      }).unwrap();
      refetch();
      return { name: cardName }
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation()
      const promise = handleDeleteCardClick(card.card_name);
      toast.promise(promise, {
        loading: "loading...",
        success: (data: toastSuccessMessage) => `Deleted Card: ${data?.name}`,
        error: (error: toastErrorMessage) => {
          if (error?.status === 404) {
            return error?.response?.data?.message || "Card Not Found";
          } else if (error?.status === 400) {
            return error?.response?.data?.message || "Missing UserId, or Card Name";
          } else {
            return "An unexpected error occurred";
          }
        },
      })
    }

    return (
        <button className="h-8 w-8 rounded bg-[hsl(var(--background3))] cursor-pointer" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrash}/>
        </button>
    )
}

export default DeleteOwnedCardButtonComponent