import { useCreateDuplicateDeckMutation } from "@/app/api-slices/decksapislice";
import { handleDeckClick } from "../deckmanagerpagecomponents/types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { DeleteDeck } from "./buttonprops";
import { toast } from "sonner";


const DuplicateDeckButtonComponent = ({ deck, refetch, refetchUser, userId }: DeleteDeck) => {

    const [addNewDuplicateDeck] = useCreateDuplicateDeckMutation()
    
    const handleDuplicateDeckClick = async(deck: handleDeckClick) => {
        try {
            const duplicate = await addNewDuplicateDeck({
                id: userId, 
                deckId: deck._id
            });
            if (duplicate) {
                refetch();
                if (refetchUser) refetchUser();
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
                const promise = handleDuplicateDeckClick(deck);
                toast.promise(promise, {
                    loading: "loading...",
                    success: (data: any) => `Duplicated Deck: ${data.name}`,
                    error: (error: any) => {
                        if (error?.status === 404) {
                            return error?.response?.data?.message || "User Not Found";
                        } else if (error?.status === 405) {
                            return error?.response?.data?.message || "Original Deck Not Found";
                        } else if (error?.status === 400) {
                            return error?.response?.data?.message || "Missing UserId, deckId";
                        }
                      return
                    },
                })
            }}
        >
            <FontAwesomeIcon icon={faCopy}/>
        </button>
    )
}

export default DuplicateDeckButtonComponent