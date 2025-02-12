import { useNavigate } from "react-router-dom";
import DeleteDeckButtonComponent from "../deckbuttons/deletedeckbutton";
import DuplicateDeckButtonComponent from "../deckbuttons/duplicatedeckbutton";
import FavoriteDeckButtonComponent from "../deckbuttons/makefavoritedeckbutton";
import { Deck, DeckClick, MappedList } from "./types";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

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


    return (
        <div className="flex flex-col animate-fade-in-up">
            {currentPageListDecksArray.map((deck: Deck) => (
                <div 
                    key={deck._id}
                    className={`flex h-[10vh] px-2 justify-between rounded-xl items-center mb-3 bg-[hsl(var(--contrast))] shadow-lg border-[2px] ${deck.favorite ? "border-[hsl(var(--background3))]" : "border-transparent"} hover:scale-105 transition-transform duration-200 `}
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
                    <Avatar className="lg:w-20 lg:h-20">
                        <AvatarImage src="https://images.ygoprodeck.com/images/cards_cropped/64202399.jpg" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <section className='flex w-1/4 space-x-8'>
                        <div className="flex flex-col">
                            <div className="text-[hsl(var(--text))] text-xs lg:text-lg"><strong>{deck.deck_name}</strong></div>
                            <div className="text-gray-400 hidden md:text-md lg:text-lg lg:flex">Updated: {deck.lastUpdated}</div>
                        </div>
                    </section>
                    <section className="flex w-1/2 h-full items-center space-x-2 text-[hsl(var(--text))]">
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
            ))}
        </div>
    )
}