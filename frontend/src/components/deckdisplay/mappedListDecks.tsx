import { useNavigate } from "react-router-dom";
import DeleteDeckButtonComponent from "../deckbuttons/deletedeckbutton";
import DuplicateDeckButtonComponent from "../deckbuttons/duplicatedeckbutton";
import FavoriteDeckButtonComponent from "../deckbuttons/makefavoritedeckbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Deck, DeckClick, MappedList } from "./types";

export function MappedListDeck({ MappedListProps }: MappedList) {
    const {
        currentPageListDecksArray,
        userId,
        refetch,
        refetchUser,
        setCurrentPageListDecksArray,
        setCurrentPageGalleryDecksArray
    } = MappedListProps

    const navigate = useNavigate()

    function handleDeckClick(deck: DeckClick) {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId } });   
    };


    return currentPageListDecksArray.map((deck: Deck) => (
        <div 
            key={deck._id}
            className="flex  h-[7vh] px-2 justify-between items-center mb-2 hover:bg-[hsl(var(--background5))]" 
            onClick={() => handleDeckClick(deck)}
            role="button"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDeckClick(deck);
                }
            }}
            tabIndex={0}
            aria-label={`Select deck ${deck.deck_name}`}
        >  
            <section className='flex w-1/4 space-x-8'>
                <div className="flex flex-col">
                    <div className="text-[hsl(var(--text))] text-xs lg:text-lg"><strong>{deck.deck_name}</strong></div>
                    <div className="text-gray-400 hidden md:text-md lg:text-lg lg:flex">Updated: {deck.lastUpdated}</div>
                </div>
                {deck.favorite === true && (
                    <span className=' text-[hsl(var(--background3))] hidden md:flex items-center justify-center'>
                        <FontAwesomeIcon icon={faStar} className='fa-lg'/>
                    </span>
                )}
            </section>
            <section className="flex w-1/2 h-full items-center space-x-2 text-[hsl(var(--text))]">
                {deck.favorite === true && (
                    <span className=' text-[hsl(var(--background3))] flex md:hidden items-center justify-center'>
                        <FontAwesomeIcon icon={faStar} className='fa-sm'/>
                    </span>
                )}
                <span className="text-xs md:text-md lg:text-lg">{deck.deck_desc}</span>
            </section>
            <section className="flex w-fit space-x-1">
                <FavoriteDeckButtonComponent 
                    deck={deck} 
                    userId={userId} 
                    refetch={refetch} 
                    setCurrentPageListDecksArray={setCurrentPageListDecksArray}
                    setCurrentPageGalleryDecksArray={setCurrentPageGalleryDecksArray}
                />
                <DuplicateDeckButtonComponent deck={deck} userId={userId} refetch={refetch} refetchUser={refetchUser}/>
                <DeleteDeckButtonComponent deck={deck} userId={userId} refetch={refetch} refetchUser={refetchUser}/>
            </section>    
        </div>
    ))
}