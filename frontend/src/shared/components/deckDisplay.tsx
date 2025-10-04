import { useNavigate } from "react-router-dom";
import DuplicateDeckButtonComponent from "../../features/decks/buttons/duplicateDeck";
import FavoriteDeckButtonComponent from "../../features/decks/buttons/favoriteButton";
import { Deck, DeckClick } from "../../features/decks/types/types";
import { deckDisplayProps } from "../types/deck";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/shared/ui/avatar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useHandleSubmitDelete } from "@/features/decks/hooks/useHandleSubmitDelete";
import { toastSuccessMessage } from "../types/toast";
import FormatDeckApiResponse from "@/shared/utils/formatDeckApiResponse";
import ModifyDataDB from "../buttons/modifyDataDB";
import { useHandleSubmitCreate } from "@/features/decks/hooks/useHandleSubmitCreate";

// This component displays maps all of the user's data from the api and displays
// in the view decks subpage on profile page with styling
export function DeckDisplay({ DeckDisplayProps }: deckDisplayProps) {
    const {
        deckApiData,
        listView,
        galleryView,
        setCurrentPageListDecksArray,
        setCurrentPageGalleryDecksArray
    } = DeckDisplayProps

    const navigate = useNavigate();
    const userId = useSelector((state: { auth: { userId: string }}) => state.auth.userId);
    const handleSubmitDelete = useHandleSubmitDelete();
    const handleSubmitCreate = useHandleSubmitCreate();

    function handleDeckClick(deck: DeckClick) {
        navigate('/modifyDeck', { state: { deckId: deck._id, userId } });   
    };

    function handleDeckClickWrapper(deck: DeckClick) {
        return () => handleDeckClick(deck);
    };

    return (
        <>
            {listView ? (
                <div className="flex flex-col animate-fade-in-up">
                    {deckApiData.map((deck: Deck) => (
                        <div // skipcq: JS-0415
                            key={deck._id} 
                            className={`flex h-[10vh] px-2 justify-between rounded-xl items-center mb-3 bg-[hsl(var(--contrast))] shadow-lg shadow-[hsl(var(--shadow))] border-[2px] ${deck.favorite ? "border-[hsl(var(--background3))]" : "border-transparent"} hover:scale-105 transition-transform duration-200 `}
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
                                    setCurrentPageListDecksArray={setCurrentPageListDecksArray}
                                    setCurrentPageGalleryDecksArray={setCurrentPageGalleryDecksArray}
                                />
                                <DuplicateDeckButtonComponent deck={deck}/>
                                <ModifyDataDB
                                    onModify={() => handleSubmitDelete(deck)}
                                    successMessage={(data: toastSuccessMessage) => `Deleted Deck: ${data?.name}`}
                                    errorHandler={(error) => FormatDeckApiResponse(error, "delete")}
                                    className="text-white h-8 w-8 rounded bg-[hsl(var(--background3))]"
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </ModifyDataDB>
                            </section>    
                        </div>
                    ))}
                </div>
            ) : galleryView && (
                <div
                    className="animate-fade-in-up grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full h-full p-4 justify-items-center items-start"  
                    style={{ gridAutoRows: 'auto', alignContent: 'start' }}
                >
                    {deckApiData.map((deck: Deck) => (
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
                                className={`relative flex flex-col items-center bg-[hsl(var(--contrast))] p-2 w-[30vw] md:w-[18vw] lg:w-[12vw] xl:w-[8vw] h-[20vh] rounded-2xl shadow-lg shadow-[hsl(var(--shadow))] border-2 ${deck.favorite ? "border-[hsl(var(--background3))]" : "border-transparent"}  justify-between hover:scale-105 transition-transform duration-200  mx-auto`}
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
                                        setCurrentPageListDecksArray={setCurrentPageListDecksArray}
                                        setCurrentPageGalleryDecksArray={setCurrentPageGalleryDecksArray}
                                    />
                                    <DuplicateDeckButtonComponent deck={deck}/>
                                    <ModifyDataDB
                                        onModify={() => handleSubmitDelete(deck)}
                                        successMessage={(data: toastSuccessMessage) => `Deleted Deck: ${data?.name}`}
                                        errorHandler={(error) => FormatDeckApiResponse(error, "delete")}
                                        className="text-white h-8 w-8 rounded bg-[hsl(var(--background3))]"
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </ModifyDataDB>
                                </section>
                            </button>
                        </div>   
                    ))}
                </div>
            )}
            <div className="flex h-[10vh] pl-2 pr-9 justify-between rounded-xl items-center mb-3 bg-[hsl(var(--contrast))] shadow-lg shadow-[hsl(var(--shadow))] border-[2px] border-transparent hover:scale-105 transition-transform duration-200 ">
                <div className="flex space-x-[1vw] items-center text-center">
                    <div className="flex lg:w-24 lg:h-24 items-center justify-center">
                        <FontAwesomeIcon icon={faFolderPlus} className="fa-2xl text-[hsl(var(--background3))]"/>
                    </div>
                    <h3 className="text-lg font-semibold text-[hsl(var(--text))] text-center">Create New Deck</h3>
                </div>
                <ModifyDataDB
                    onModify={() => handleSubmitCreate()}
                    successMessage={(data: toastSuccessMessage) => `Created New Deck Named: ${data?.name}`}
                    errorHandler={(error) => FormatDeckApiResponse(error, "create")}
                    className="w-10 h-10 bg-[hsl(var(--background3))] text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlus} className="fa-sm"/>
                </ModifyDataDB>
            </div>
        </>
    )
}