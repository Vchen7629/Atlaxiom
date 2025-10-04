import { useCreateDuplicateDeckMutation, useGetAllOwnedDecksQuery } from "@/app/api-slices/decksapislice";
import { handleDeckClick } from "../types/homepagecomponentprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { toastErrorMessage } from "@/shared/types/toast"
import { toastSuccessMessage } from "@/shared/types/toast";
import { useGetSpecificUserQuery } from "@/app/api-slices/usersApiSlice";
import { useSelector } from "react-redux";


const DuplicateDeckButton = ({ deck }: { deck: { _id: string, deck_name: string}}) => {
    const [addNewDuplicateDeck] = useCreateDuplicateDeckMutation()
    const userId = useSelector((state: { auth: { userId: string }}) => state.auth.userId);
    const { refetch } = useGetAllOwnedDecksQuery(userId);
    const { refetch: refetchUser } = useGetSpecificUserQuery(userId);    
    
    async function handleDuplicateDeckClick(deck: handleDeckClick) {
        const duplicate = await addNewDuplicateDeck({
            id: userId, 
            deckId: deck._id
        });
        if (duplicate) {
            refetch();
            if (refetchUser) refetchUser();
            return { name: deck.deck_name}
        } 
        throw undefined
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

export default DuplicateDeckButton