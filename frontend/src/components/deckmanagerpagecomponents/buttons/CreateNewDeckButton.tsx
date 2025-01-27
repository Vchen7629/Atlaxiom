import { useCreateNewDeckMutation, useGetAllOwnedDecksQuery } from '../../../app/api-slices/decksapislice.ts';
import { useNavigate } from 'react-router-dom';
import { NewDeckButton } from '../types/homepagecomponentprops.ts';
import { toast } from 'sonner';

const CreateNewDeckComponent: React.FC<NewDeckButton> = ({ userId }) => {
    const navigate = useNavigate()
    const { refetch } = useGetAllOwnedDecksQuery(userId)
    const [addNewDeck] = useCreateNewDeckMutation()

    const handleCreateDeckClick = async () => {
        try {
            const payload = { id: userId };
            const result = await addNewDeck(payload).unwrap();
    
            navigate('/modifyDeck', { state: { deckId: result.deck._id, userId: userId } });
            refetch()
            console.log(result.deck.deck_name)

            return { name: result.deck.deck_name}
        } catch (error) {
            throw error
        }
    };

    return (
        <button 
            className="flex text-md px-4 py-2 rounded-xl bg-[hsl(var(--background3))]" 
            onClick={() => {
                const promise = handleCreateDeckClick()
                toast.promise(promise, {
                    loading: "loading...",
                    success: (data: any) => `Created New Deck Named: ${data.name}`,
                    error: (error: any) => {    
                        if (error?.status === 404 ) {
                            return error?.response?.data?.message || "User Not Found"
                        } else if (error?.status === 400 ) {
                            return error?.response?.data?.message || "User Id not Found"
                        }
                        return
                    }
                })
            }}
        >
            New Deck
        </button>
    )
};

export default CreateNewDeckComponent