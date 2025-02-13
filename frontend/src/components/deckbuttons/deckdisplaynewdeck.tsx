import { useCreateNewDeckMutation, useGetAllOwnedDecksQuery } from "@/app/api-slices/decksapislice";
import { toast } from "sonner";
import { toastErrorMessage, toastSuccessMessage } from "../cardcollectioncomponents/types/buttontypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function DeckDisplayGalleryNewDeckButton({userId}: any) {
    const { refetch } = useGetAllOwnedDecksQuery(userId)
    const [addNewDeck] = useCreateNewDeckMutation()
    
    async function handleCreateDeckClick() {
        const payload = { id: userId };
        const result = await addNewDeck(payload).unwrap();
        
        refetch()

        return { name: result.deck.deck_name}
    };

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        const promise = handleCreateDeckClick();
        toast.promise(promise as any, {
            loading: "loading...",
            success: (data: toastSuccessMessage) => `Created New Deck Named: ${data?.name}`,
            error: (error: toastErrorMessage) => {    
                if (error?.status === 404 ) {
                    return error?.response?.data?.message || "User Not Found"
                } else if (error?.status === 400 ) {
                    return error?.response?.data?.message || "User Id not Found"
                } else {
                    return "error creating deck"
                }
            }
        })
    }

    return (
        <button 
            className="w-full bg-[hsl(var(--background3))] text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faPlus} className="fa-sm"/>
        </button>
    )
    
}

export function DeckDisplayListNewDeckButton({userId}: any) {
    const { refetch } = useGetAllOwnedDecksQuery(userId)
    const [addNewDeck] = useCreateNewDeckMutation()
    
    async function handleCreateDeckClick() {
        const payload = { id: userId };
        const result = await addNewDeck(payload).unwrap();
        
        refetch()

        return { name: result.deck.deck_name}
    };

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        const promise = handleCreateDeckClick();
        toast.promise(promise as any, {
            loading: "loading...",
            success: (data: toastSuccessMessage) => `Created New Deck Named: ${data?.name}`,
            error: (error: toastErrorMessage) => {    
                if (error?.status === 404 ) {
                    return error?.response?.data?.message || "User Not Found"
                } else if (error?.status === 400 ) {
                    return error?.response?.data?.message || "User Id not Found"
                } else {
                    return "error creating deck"
                }
            }
        })
    }

    return (
        <button 
            className="w-10 h-10 bg-[hsl(var(--background3))] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={handleClick}
        >
            <FontAwesomeIcon icon={faPlus} className="fa-sm"/>
        </button>
    )
    
}