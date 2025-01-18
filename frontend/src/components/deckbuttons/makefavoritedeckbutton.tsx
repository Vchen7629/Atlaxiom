import { useMakeDeckFavoriteMutation } from "@/features/api-slices/decksapislice";
import { Deck, handleDeckClick } from "../deckmanagerpagecomponents/types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FavoriteDeck } from "./buttonprops";
import { toast } from "sonner";


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
                const promise = handleFavoriteDeckClick(deck);
                toast.promise(promise, {
                    loading: "loading...",
                    success: (data: any) => `Added Deck: ${data.name} to Favorites`,
                    error: (error: any) => {
                        if (error?.status === 404) {
                            return error?.response?.data?.message || "User Not Found";
                        } else if (error?.status === 405) {
                            return error?.response?.data?.message || "Deck Not Found";
                        } else if (error?.status === 400) {
                            return error?.response?.data?.message || "Missing UserId, deckId";
                        }
                      return
                    },
                })
            }}
        >
            <FontAwesomeIcon icon={faStar}/>
        </button>
    )
}

export default FavoriteDeckButtonComponent