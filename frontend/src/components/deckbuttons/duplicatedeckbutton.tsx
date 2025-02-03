import { useCreateDuplicateDeckMutation } from "@/app/api-slices/decksapislice";
import { handleDeckClick } from "../deckmanagerpagecomponents/types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { DeleteDeck } from "./buttonprops";
import { toast } from "sonner";
import { toastErrorMessage, toastSuccessMessage } from "../cardcollectioncomponents/types/buttontypes";


const DuplicateDeckButtonComponent = ({ deck, refetch, refetchUser, userId }: DeleteDeck) => {
    const [addNewDuplicateDeck] = useCreateDuplicateDeckMutation()
    
    async function handleDuplicateDeckClick(deck: handleDeckClick) {
        try {
            console.log("hi")
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

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        const promise = handleDuplicateDeckClick(deck);
        toast.promise(promise, {
            loading: "loading...",
            success: (data: toastSuccessMessage) => `Duplicated Deck: ${data?.name}`,
            error: (error: toastErrorMessage) => {
                if (error?.status === 404) {
                    return error?.response?.data?.message || "User Not Found";
                } else if (error?.status === 405) {
                    return error?.response?.data?.message || "Original Deck Not Found";
                } else if (error?.status === 400) {
                    return error?.response?.data?.message || "Missing UserId, deckId";
                } else {
                    return "An unexpected error occurred";
                }
            },
        })
    }

    return (
        <button 
            className='text-white h-8 w-8 rounded bg-[hsl(var(--background3))]'
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faCopy}/>
        </button>
    )
}

export default DuplicateDeckButtonComponent