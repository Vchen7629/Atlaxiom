
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronDown, faChevronUp, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useIncreaseOwnedCardMutation, useDecreaseOwnedCardMutation, useDeleteOwnedCardMutation, useGetOwnedCardsQuery } from '../../../features/api-slices/ownedCardapislice';


   
export const ComponentOwnedCardPopup: React.FC<ComponentCardSetPopupProps> = ({ filteredCards }) => {
    const [increaseOwnedCard] = useIncreaseOwnedCardMutation();
    const [decreaseOwnedCard] = useDecreaseOwnedCardMutation();
    const [deleteOwnedCard] = useDeleteOwnedCardMutation();
    const location = useLocation();
    const { userId } = location.state || {};

    const {
        data: ownedCards,
        refetch
      } = useGetOwnedCardsQuery(userId);

    const handleIncreaseClick = async (cardName) => {
        try {
          await increaseOwnedCard({ 
            id: userId, 
            CardData: { 
              card_name: cardName,
              increaseOwnedAmount: 1 
            } 
          });
          refetch();
        } catch (err) {
          console.error('Failed to increase card amount:', err);
        }
      };
    
      const handleDecreaseClick = async (cardName) => {
        try {
          await decreaseOwnedCard({ 
            id: userId, 
            CardData: { 
              card_name: cardName,
              decreaseOwnedAmount: 1 
            } 
          });
          refetch();
        } catch (err) {
          console.error('Failed to decrease card amount:', err);
        }
      };
    
      const handleDeleteCardClick = async (cardName) => {
        try {
          await deleteOwnedCard({
            id: userId,
            CardData: { card_name: cardName }
          });
          refetch();
        } catch (err) {
          console.error('Failed to delete card:', err);
        }
      }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div>
                {filteredCards.length > 0 ? (
                    filteredCards.map((card, index) => (
                        <div key={index} className="flex bg-transparent h-32 items-center hover:bg-blacktwo">
                            <img 
                                src={card.image_url} 
                                alt={card.card_name} 
                                className="w-[5%]" 
                            />
                            <div className="w-[25%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                {card.card_name}
                            </div>
                            <div className="w-[10%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                {card.set_code}
                            </div>
                            <div className="w-[25%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                {card.set_name}
                            </div>
                            <div className="w-[15%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                {card.rarity}
                            </div>
                            <div className="w-[10%] overflow-y-auto h-full text-md font-bold px-[2%] flex items-center">
                                ${card.price}
                            </div>
                            <div className="flex w-[10%] h-[10%] items-center">
                                  <div className="mx-[5%]">{card.ownedamount}</div>
                                  <div className="flex flex-col mr-[5%]">
                                    <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleIncreaseClick((card.card_name))}>
                                      <FontAwesomeIcon icon={faChevronUp}/>
                                    </button>
                                    <button className="h-5 text-gray-500 cursor-pointer" onClick={() => handleDecreaseClick((card.card_name))}>
                                      <FontAwesomeIcon icon={faChevronDown}/>
                                    </button>
                                  </div>
                                  <button className="text-red-600 cursor-pointer"onClick={() => handleDeleteCardClick((card.card_name))}>
                                    <FontAwesomeIcon icon={faCircleXmark}/>
                                  </button>
                              </div>
                    </div>
                    ))
                ) : (
                    <div>No cards available</div>
                )}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blackone min-w-[35vw] border-transparent ">
            <AlertDialogHeader>
                <div className="flex justify-between">
                    <AlertDialogTitle>All printings</AlertDialogTitle>
                    <AlertDialogCancel 
                        className="bg-footer shadow-custom border-transparent hover:bg-footer hover:text-gold"
                    >
                        Back
                    </AlertDialogCancel>
                </div>
                <AlertDialogDescription className="flex flex-col">
                    <div className="flex text-white p-2 ">
                        <div className="w-[20%] max-w-[25%] mr-4">Set Name</div>
                        <div className="w-[17%]">Set Code</div>
                        <div className="w-[20%]">Rarity</div>
                        <div className="w-[10%] mr-3">Price</div>
                        <div className="w-[25%]">Action</div>
                    </div>
                </AlertDialogDescription>   
            </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
  }