import { useNavigate } from "react-router-dom";
import DeleteDeckButtonComponent from "../deckbuttons/deletedeckbutton";
import DuplicateDeckButtonComponent from "../deckbuttons/duplicatedeckbutton";
import FavoriteDeckButtonComponent from "../deckbuttons/makefavoritedeckbutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus, } from "@fortawesome/free-solid-svg-icons";
import { Deck, DeckClick, MappedGallery } from "./types";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

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
        navigate('/modifyDeck', { state: { deckId: deck._id, userId } });   
    };

    function handleDeckClickWrapper(deck: DeckClick) {
        return () => handleDeckClick(deck);
    };

    return (
        <div
            className="animate-fade-in-up grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full h-full p-4 justify-items-center items-start"  
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
                    <button 
                        className={`relative flex flex-col items-center bg-[hsl(var(--contrast))] p-2 w-[30vw] md:w-[18vw] lg:w-[12vw] xl:w-[8vw] h-[20vh] rounded-2xl shadow-lg border-2 ${deck.favorite ? "border-[hsl(var(--background3))]" : "border-transparent"}  justify-between hover:scale-105 transition-transform duration-200  mx-auto`}
                        onClick={handleDeckClickWrapper(deck)}
                    >
                        <span className="flex text-[hsl(var(--text))] mt-2 text-md w-fit h-fit text-center items-center font-bold">{deck.deck_name}</span>
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://images.ygoprodeck.com/images/cards_cropped/64202399.jpg" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <section className="flex w-fit mt-2 space-x-1">
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
                    </button>
                </div>   
            ))}
            <div className="bg-[hsl(var(--contrast))] p-2 w-[30vw] md:w-[18vw] lg:w-[12vw] xl:w-[8vw] h-[20vh] rounded-2xl shadow-lg  flex flex-col items-center justify-between hover:scale-105 transition-transform duration-200  mx-auto">
                <div className="text-[hsl(var(--background3))] p-3 rounded-full">
                    <FontAwesomeIcon icon={faFolderPlus} className="fa-2xl"/>
                </div>
                <h3 className="text-lg font-semibold text-[hsl(var(--text))] text-center">Create New Deck</h3>
                <button className="w-full bg-[hsl(var(--background3))] text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faPlus} className="fa-sm"/>
                    
                </button>
            </div>
        </div>
    )
}