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
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ApiCardData } from "@/components/searchpagecomponents/types/datastructuretypes";
import AddCardPaginationComponent from "../addcardbutton/addcardpagination";
import { OwnedCard } from "../types/dataStructures";
import SelectedCardComponent from "../addcardbutton/selectedcardpage";
   
export const AddCardButton = ({ userId }: any) => {
    const [cardData, setCardData] = useState<ApiCardData[]>([])
    const [cardName, setCardName] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedcard, setSelectedCard] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadErr, setLoadErr] = useState<boolean>(false);

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    const fetchAllCardData = async () => {
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

    const filteredCards = searchTerm ? cardData.filter((card) => 
      card.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : cardData;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const cardsPerPage = 4; 
    const [totalPages, setTotalPages] = useState<number>(1);
    const UpdateTotalPages = (filteredCardsLength: number) => {
        setTotalPages(Math.ceil(filteredCardsLength / cardsPerPage));
    }
    const [currentCards, setCurrentCards] = useState<OwnedCard[]>([])

    const handleBackClick = () => {
        setCardData([]);
        setSelectedCard(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setCurrentPage(1);
    };

    const handleClearClick = () => {
        setSearchTerm('');
        setCurrentPage(1);
    };

    const handleCardClick = (name: string) => {
        setSelectedCard(true)
        setCardName(name)
    }

    const paginationprops = {
        filteredCards,
        currentPage, setCurrentPage,
        cardsPerPage,
        UpdateTotalPages,
        totalPages,
        currentCards, setCurrentCards
    }

    const selectedcardprops = {
        setSelectedCard,
        cardName,
        userId,
    }

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
        <AlertDialogContent className="bg-[hsl(var(--background1))] min-w-[65vw] h-[55vh] max-h-[70vh] flex-grow border-transparent ">
          <AlertDialogHeader>
            <div className="flex justify-between items-center w-full">
                <AlertDialogTitle className="text-[hsl(var(--text))]">Add Card to collection</AlertDialogTitle>
                <AlertDialogCancel 
                    className="bg-transparent shadow-custom border-transparent text-[hsl(var(--text))] hover:text-[hsl(var(--background3))]"
                    onClick={handleBackClick}
                >
                    Back
                </AlertDialogCancel>
            </div>
                <AlertDialogDescription className="flex flex-col  items-center justify-center pt-4">
                {selectedcard ? (
                    <div className="flex">
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
                        <section className="flex flex-col w-[90%] pt-4">
                            <AddCardPaginationComponent paginationprops={paginationprops} /> 
                            {currentCards.length > 0 ? (
                                currentCards.map((card: any, index: number) => (
                                    <div key={index} className="flex bg-transparent h-16 text-sm font-bold items-center hover:bg-blacktwo">
                                        <img 
                                            src={card.card_images[0]?.image_url} // Accessing the image from card_images array
                                            alt={card.name || 'Unknown Card'} 
                                            className="h-16" 
                                        />
                                        <span className="ml-2 text-[hsl(var(--text))]">{card.name}</span>
                                        <button 
                                            className="flex bg-[hsl(var(--background3))] absolute right-4 py-1 px-2 rounded-md items-center space-x-2"
                                            onClick={() => handleCardClick(card.name)}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                            <span>Add Card</span>
                                        </button>
                                    </div>
                                ))
                            ) : loading ? (
                                <div className="flex h-[100%] justify-center items-center text-3xl text-gray-400 font-black">
                                    <span>Loading Card Data...</span>
                                </div>
                            ) : loadErr ? (
                                <div className="flex min-h-[40vh] justify-center items-center text-3xl text-gray-400 font-black">
                                    <span>Load Error</span>
                                </div>
                            ) : (
                                <div className="flex min-h-[40vh] justify-center items-center text-3xl text-gray-400 font-black">
                                    <span>No cards matching your Filters</span>
                                </div>
                            )}         
                        </section>
                    </>
                )}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }