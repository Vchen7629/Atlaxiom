import { useMakeDeckFavoriteMutation } from "@/features/api-slices/decksapislice";
import { Deck, DeckError, handleDeckClick } from "../types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FavoriteDeck } from "../types/buttonprops";


const FavoriteDeckButtonComponent = ({ deck, refetch, userId, setCurrentPageListDecksArray, setCurrentPageGalleryDecksArray}: FavoriteDeck) => {

    const [favoriteDeck] = useMakeDeckFavoriteMutation();

    const handleFavoriteDeckClick = async(deck: handleDeckClick) => {
        try {
            const favoritedeck = await favoriteDeck({
                id: userId,
                deckId: deck._id
            });
            if (favoritedeck) {
                refetch();
                setCurrentPageListDecksArray((prevDecks: Deck[]) => 
                    prevDecks.map((prevDeck) => 
                        prevDeck._id === deck._id ? { ...prevDeck, favorite: true} : prevDeck
                    )
                )
                setCurrentPageGalleryDecksArray((prevGalleryDecks: any[]) =>
                    prevGalleryDecks.map((prevGalleryDeck) =>
                        prevGalleryDeck._id === deck._id 
                            ? { ...prevGalleryDeck, favorite: true }
                            : prevGalleryDeck
                    )
                );
                
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
                handleFavoriteDeckClick(deck);
            }}
        >
            <FontAwesomeIcon icon={faStar}/>
        </button>
    )
}

export default FavoriteDeckButtonComponent