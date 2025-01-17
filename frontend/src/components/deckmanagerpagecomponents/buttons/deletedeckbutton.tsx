import { useDeleteDeckMutation } from "@/features/api-slices/decksapislice";
import { DeckError, handleDeckClick } from "../types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteDeck } from "../types/buttonprops";


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
            } 
        } catch (error) {
            const err = error as DeckError
            console.error("Error deleting deck:", err.message || error);
        }
    }

    return (
        <button 
            className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]'
            onClick={(event) => {
                event.stopPropagation(); 
                handleDeleteDeckClick(deck);
            }}
        >
            <FontAwesomeIcon icon={faTrash}/>
        </button>
    )
}

export default DeleteDeckButtonComponent