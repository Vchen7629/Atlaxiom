import { useCallback, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { SearchBar } from "../types/searchbartypes"

const SearchBarComponent = ({ searchbarprops }: SearchBar) => {
    const {
        cardData,
        setCardData,
        cardName,
        setCardName,
        setClickedOnCard,
        setSelectedCardData,
        setListCurrentPage,
        setGalleryCurrentPage,
        setErrorMessage,
        setTotalListNamesArray,
        maxMainSuggestions,
        setTotalGalleryNamesArray,
    } = searchbarprops

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

  const fetchAllCardData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setCardData(data.data);
      } else {
        setCardData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCardData([]);
    }
  };

  const debouncedSearchCard = useCallback((inputValue: string) => {
      if (!inputValue.trim()) {
        setTotalListNamesArray([]);
        setTotalGalleryNamesArray([]);
        return;
      }

      const normalizedInput = inputValue.toLowerCase().replace(/[-\s]/g, ''); 
      const filteredSuggestions = cardData.filter((card) => {
        const normalizedCardName = card.name.toLowerCase().replace(/[-\s]/g, ''); 
        return normalizedCardName.includes(normalizedInput);
      });

      setTotalListNamesArray(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));
      setTotalGalleryNamesArray(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));

    }, [cardData, maxMainSuggestions]);

  useEffect(() => {
    debouncedSearchCard(cardName);
  }, [debouncedSearchCard, cardName]);

  useEffect(() => {
    fetchAllCardData();
  }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setCardName(inputValue);
        setClickedOnCard(false);
        setSelectedCardData(null);
        setListCurrentPage(1);
        setGalleryCurrentPage(1);
        setErrorMessage('');
        debouncedSearchCard(inputValue);
    };

    const handleClearClick = () => {
        setCardName('');
        setErrorMessage('');
        setTotalListNamesArray([]);
        setTotalGalleryNamesArray([]);
        setSelectedCardData(null);
        setClickedOnCard(false);
      };
    
    return (
        <div className="flex w-[40vw] h-[50px] ml-[10%] pl-5 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                <input
                    className="bg-transparent w-full h-full text-xl focus:outline-none"
                    type="text"
                    value={cardName}
                    onChange={handleInputChange}
                    placeholder="Enter card name"
                />
                {cardName && (
                    <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchBarComponent