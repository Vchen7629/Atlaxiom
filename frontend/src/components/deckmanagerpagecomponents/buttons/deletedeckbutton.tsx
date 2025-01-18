import { useDeleteDeckMutation } from "@/features/api-slices/decksapislice";
import { handleDeckClick } from "../types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteDeck } from "../types/buttonprops";
import { toast } from "sonner";


const DeleteDeckButtonComponent = ({ deck, refetch, userId }: DeleteDeck) => {

    const [deleteDeck] = useDeleteDeckMutation();

    const handleDeleteDeckClick = async(deck: handleDeckClick) => {
        try {
            const deldeck = await deleteDeck({
                id: userId, 
                DeckData: { deckId: deck._id }
            });
            if (deldeck) {
                refetch();
                return { name: deck.deck_name}
            } 
        } catch (error) {
            throw error
        }
    }

    return (
        <button 
            className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]'
            onClick={(event) => {
                event.stopPropagation(); 
                const promise = handleDeleteDeckClick(deck);
                toast.promise(promise, {
                    loading: "loading...",
                    success: (data: any) => `Deleted Deck: ${data.name}`,
                    error: (error: any) => {
                        if (error?.status === 404) {
                            return error?.response?.data?.message || "User Not Found";
                        } else if (error?.status === 405) {
                            return error?.response?.data?.message || "Deck Not Found";
                        } else if (error?.status === 400) {
                            return error?.response?.data?.message || "Missing UserId, deckId";
                        } else if (error?.status === 500) {
                            return error?.response?.data?.message || "Failed to Delete Deck";
                        }
                      return
                    },
                })
            }}
        >
            <FontAwesomeIcon icon={faTrash}/>
        </button>
    )
}

export default DeleteDeckButtonComponent