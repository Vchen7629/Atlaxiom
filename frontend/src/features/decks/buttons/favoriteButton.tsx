import { useGetAllOwnedDecksQuery, useMakeDeckFavoriteMutation } from "@/app/api-slices/decksapislice";
import { handleDeckClick } from "../types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FavoriteDeck } from "../types/buttonprops";
import { toast } from "sonner";
import { DeckApiResponse } from "@/app/api-slices/types/decktypes";
import { useSelector } from "react-redux";
import { toastErrorMessage, toastSuccessMessage } from "@/shared/types/toast";


const FavoriteDeckButton = ({ deck, setCurrentPageListDecksArray, setCurrentPageGalleryDecksArray}: FavoriteDeck) => {
    const userId = useSelector((state: { auth: { userId: string }}) => state.auth.userId);
    const [favoriteDeck] = useMakeDeckFavoriteMutation();
    const { refetch } = useGetAllOwnedDecksQuery(userId);

    const handleFavoriteDeckClick = async(deck: handleDeckClick) => {
        const favoritedeck = await favoriteDeck({
            id: userId,
            deckId: deck._id
        });
        if (favoritedeck) {
            refetch();
            setCurrentPageListDecksArray((prevDecks: DeckApiResponse[]) => 
                prevDecks.map((prevDeck) => 
                    prevDeck._id === deck._id ? { ...prevDeck, favorite: true} : prevDeck
                )
            )
            setCurrentPageGalleryDecksArray((prevGalleryDecks: DeckApiResponse[]) =>
                prevGalleryDecks.map((prevGalleryDeck) =>
                    prevGalleryDeck._id === deck._id 
                        ? { ...prevGalleryDeck, favorite: true }
                        : prevGalleryDeck
                )
            );
            return { name: deck.deck_name}
        } 

        return undefined;
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        const promise = handleFavoriteDeckClick(deck);
        toast.promise(promise, {
            loading: "loading...",
            success: (data: toastSuccessMessage) => `Added Deck: ${data?.name} to Favorites`,
            error: (error: toastErrorMessage) => {
                if (error?.status === 404) {
                    return error?.response?.data?.message || "User Not Found";
                } else if (error?.status === 405) {
                    return error?.response?.data?.message || "Deck Not Found";
                } else if (error?.status === 400) {
                     return error?.response?.data?.message || "Missing UserId, deckId";
                } else {
                    return "An unexpected error occurred";
                }
            },
        })
    }

    return (
        <button className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]' onClick={handleClick}>
            <FontAwesomeIcon icon={faStar}/>
        </button>
    )
}

export default FavoriteDeckButton