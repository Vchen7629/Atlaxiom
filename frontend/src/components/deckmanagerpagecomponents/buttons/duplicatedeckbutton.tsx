import { useCreateDuplicateDeckMutation } from "@/features/api-slices/decksapislice";
import { DeckError, handleDeckClick } from "../types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { DeleteDeck } from "../types/buttonprops";


const DuplicateDeckButtonComponent = ({ deck, refetch, userId }: DeleteDeck) => {

    const [addNewDuplicateDeck] = useCreateDuplicateDeckMutation()
    
    const handleDuplicateDeckClick = async(deck: handleDeckClick) => {
        try {
            const duplicate = await addNewDuplicateDeck({
                id: userId, 
                deckId: deck._id
            });
            if (duplicate) {
                refetch();
                console.log("success")
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
                handleDuplicateDeckClick(deck);
            }}
        >
            <FontAwesomeIcon icon={faCopy}/>
        </button>
    )
}

export default DuplicateDeckButtonComponent