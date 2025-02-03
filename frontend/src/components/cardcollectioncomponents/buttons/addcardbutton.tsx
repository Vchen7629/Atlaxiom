import {
    AlertDialog,
    //AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    //AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ApiCardData } from "@/components/searchpagecomponents/types/datastructuretypes";
import AddCardPaginationComponent from "../addcardbutton/addcardpagination";
import SelectedCardComponent from "../addcardbutton/selectedcardpage";
import { mappedCard, UserId } from "../types/buttontypes";
import { waveform } from 'ldrs'
   
export const AddCardButton = ({ userId }: UserId) => {
    waveform.register()
    const [cardData, setCardData] = useState<ApiCardData[]>([])
    const [cardName, setCardName] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedcard, setSelectedCard] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadErr, setLoadErr] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState(true);

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    async function fetchAllCardData() {
        setLoading(true);
        setLoadErr(false);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                setCardData(data.data);
                setLoading(false);
                setLoadErr(false)
            } else {
                setCardData([]);
                setLoading(true);
                setLoadErr(true);
            }
        } catch (error) {
            setLoadErr(true);
            setCardData([]);
        }
    };

    useEffect(() => {
        if (!loading) {
          const timer = setTimeout(() => {
            setShowLoading(false);
          }, 300);
          return () => clearTimeout(timer);
        }
        return undefined
    }, [loading]);


    const filteredCards = searchTerm ? cardData.filter((card) => 
      card.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : cardData;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const cardsPerPage = 4; 
    const [totalPages, setTotalPages] = useState<number>(1);
    function UpdateTotalPages(filteredCardsLength: number) {
        setTotalPages(Math.ceil(filteredCardsLength / cardsPerPage));
    }
    const [currentCards, setCurrentCards] = useState<mappedCard[]>([])

    function handleBackClick() {
        setCardData([]);
        setSelectedCard(false);
    };

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setCurrentPage(1);
    };

    function handleClearClick() {
        setSearchTerm('');
        setCurrentPage(1);
    };

    function handleCardClick(name: string) {
        setSelectedCard(true)
        setCardName(name)
    }

    function handleClick() {
        setSelectedCard(false)
    }

    const paginationprops = {
        filteredCards,
        currentPage, setCurrentPage,
        cardsPerPage,
        UpdateTotalPages,
        totalPages,
        currentCards, setCurrentCards
    }

    const selectedcardprops = { cardName, userId, }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button 
                className="flex items-center justify-center rounded-md w-24 h-9 md:w-28 md:h-9 bg-blue-500"
                onClick={fetchAllCardData}
            >
                <FontAwesomeIcon className="lg:mr-1" icon={faPlusCircle}/>Add Card
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[hsl(var(--background1))]  min-h-[55vh] min-w-[45vw] flex-grow border-transparent ">
          <AlertDialogHeader>
            <div className="flex justify-between items-center w-full">
                <AlertDialogTitle className="text-[hsl(var(--text))] w-[40%]">Add Card to collection</AlertDialogTitle>
                <AlertDialogCancel 
                    className={`${selectedcard ? "hidden" : "flex "} bg-transparent border-2 border-[hsl(var(--background3))] shadow-custom text-[hsl(var(--text))] hover:text-[hsl(var(--background3))]`}
                    onClick={handleBackClick}
                >
                    Back
                </AlertDialogCancel>
                <button onClick={handleClick} className={`${selectedcard ? "flex" : "hidden"} border-2 border-[hsl(var(--background3))] hover:bg-[hsl(var(--background3))] py-2 px-2 text-sm rounded-md text-[hsl(var(--text))] mb-4`}>
                    Back to Card Search
                </button>
            </div>
            <AlertDialogDescription className="flex flex-col w-full items-center justify-center pt-4">
                {selectedcard ? (
                    <div className="flex w-full">
                        <SelectedCardComponent selectedcardprops={selectedcardprops}/>
                    </div>
                ) : (
                    <>
                        <section className="flex w-[90%] h-[50px] pl-5 relative border-[1px] border-gray-400 justify-start text-[hsl(var(--text))]">                      
                            <div className="flex items-center w-full">
                                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                <input
                                    className="bg-transparent w-full h-full text-xl focus:outline-none"
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    placeholder="Enter card name"
                                />
                                {searchTerm && (
                                    <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                                    </button>
                                )}
                            </div>
                        </section>
                        <section className="flex flex-col w-full h-fit pt-2 space-y-[2vh]">
                            <AddCardPaginationComponent paginationprops={paginationprops} /> 
                            <div>
                                {(showLoading ||loading) ? (
                                    <div className="flex space-x-[3vw] h-full justify-center items-center text-3xl text-[hsl(var(--background3))] font-black">
                                        <span>Loading Card Data...</span>
                                        <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                                    </div>
                                ) : currentCards.length > 0 ? (
                                    currentCards.map((card: mappedCard) => (
                                        <div key={card.id} className="flex bg-transparent h-[9vh] text-sm font-bold items-center hover:bg-blacktwo">
                                            <img 
                                                src={card.card_images[0]?.image_url} // Accessing the image from card_images array
                                                alt={card.name || 'Unknown Card'} 
                                                className="h-16" 
                                            />
                                            <span className="ml-4 w-[30%] text-[hsl(var(--background3))]">{card.name}</span>
                                            
                                            <span className="hidden lg:flex items-center text-[hsl(var(--text))] w-[25%] text-sm">
                                                <strong className="mr-2 text-[hsl(var(--background3))]">Card Type: </strong>{card.race}
                                            </span>
                                            {(card.atk || card.atk === 0 ) && (
                                                <span className="hidden lg:flex text-[hsl(var(--text))] w-[10%] text-sm">
                                                    <strong className="mr-2 text-[hsl(var(--background3))]">Atk:</strong> {card.atk}
                                                </span>
                                            )}
                                            {(card.def || card.def === 0) && (
                                                <span className="hidden lg:flex text-[hsl(var(--text))] w-[10%] text-sm">
                                                    <strong className="mr-2 text-[hsl(var(--background3))]">Def:</strong> {card.def}
                                                </span>
                                            )}
                                            <button 
                                                className="flex bg-[hsl(var(--background3))] absolute right-4 py-1 px-2 rounded-md items-center space-x-2"
                                                onClick={() => handleCardClick(card.name)}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                                <span>Add Card</span>
                                            </button>
                                        </div>
                                    ))
                                ) : loadErr ? (
                                    <div className="flex h-[30vh] justify-center items-center text-3xl text-gray-400 font-black">
                                        <span>Load Error</span>
                                    </div>
                                ) : (
                                    <div className="flex h-[30vh] justify-center items-center text-3xl text-gray-400 font-black">
                                        <span>No cards matching your Filters</span>
                                    </div>
                                )}
                            </div>         
                        </section>
                    </>
                )}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }