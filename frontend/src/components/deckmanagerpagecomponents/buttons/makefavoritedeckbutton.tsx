import { useMakeDeckFavoriteMutation } from "@/features/api-slices/decksapislice";
import { DeckError, handleDeckClick } from "../types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { DeleteDeck } from "../types/buttonprops";


const FavoriteDeckButtonComponent = ({ deck, refetch, userId }: DeleteDeck) => {

    const [favoriteDeck] = useMakeDeckFavoriteMutation();

    const handleDeleteDeckClick = async(deck: handleDeckClick) => {
        try {
            const favoritedeck = await favoriteDeck({
                id: userId,
                deckId: deck._id
            });
            if (favoritedeck) {
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
            <FontAwesomeIcon icon={faStar}/>
        </button>
    )
}

export default FavoriteDeckButtonComponent