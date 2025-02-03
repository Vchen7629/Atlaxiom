import { useNavigate } from "react-router-dom";
import DeleteDeckButtonComponent from "../deckbuttons/deletedeckbutton";
import DuplicateDeckButtonComponent from "../deckbuttons/duplicatedeckbutton";
import FavoriteDeckButtonComponent from "../deckbuttons/makefavoritedeckbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Deck, DeckClick, MappedGallery } from "./types";

export function MappedGalleryDeck({ MappedGalleryProps }: MappedGallery) {
    const {
        currentPageGalleryDecksArray,
        userId,
        refetch,
        setCurrentPageListDecksArray,
        setCurrentPageGalleryDecksArray
    } = MappedGalleryProps

    const navigate = useNavigate()
    

    function handleDeckClick(deck: DeckClick) {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId: userId } });   
    };

    function handleDeckClickWrapper(deck: DeckClick) {
        return () => handleDeckClick(deck);
    };

    return (
        <div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full h-full p-4 justify-items-center items-start"  
            style={{ gridAutoRows: 'auto', alignContent: 'start' }}
        >
            {currentPageGalleryDecksArray.map((deck: Deck) => (
                <div
                    key={deck._id} 
                    className="flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[hsl(var(--background3))] rounded-md"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleDeckClickWrapper(deck)();
                        }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select deck ${deck.deck_name}`}
                >
                    <button className="relative bg-deckpage flex flex-col h-[20vh] w-[28vw] md:h-[18vh] md:w-[15vw] lg:h-[12vh] lg:w-[4.8vw] rounded-lg" onClick={handleDeckClickWrapper(deck)}>
                        {deck.favorite === true && (
                            <span className='absolute left-1/2 top-2 translate-x-[-50%] text-[hsl(var(--background3))] flex'>
                                <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                            </span>
                        )}
                        <span className="flex text-wrap text-white text-sm w-[90%] h-full text-center items-center font-bold">{deck.deck_name}</span>
                    </button>
                    <section className="flex w-full mt-2 space-x-1">
                        <FavoriteDeckButtonComponent 
                            deck={deck} 
                            userId={userId} 
                            refetch={refetch} 
                            setCurrentPageListDecksArray={setCurrentPageListDecksArray}
                            setCurrentPageGalleryDecksArray={setCurrentPageGalleryDecksArray}
                        />
                        <DuplicateDeckButtonComponent deck={deck} userId={userId} refetch={refetch}/>
                        <DeleteDeckButtonComponent deck={deck} userId={userId} refetch={refetch}/>
                    </section>
                </div>   
            ))}
        </div>
    )
}