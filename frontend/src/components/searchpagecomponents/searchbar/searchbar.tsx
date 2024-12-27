import { useCallback, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { SearchBar } from "../types/searchbartypes"

const SearchBarComponent = ({ searchbarprops }: SearchBar) => {
    const {
        cardData, setCardData,
        cardName, setCardName,
        setClickedOnCard,
        setSelectedCardData,
        suggestionsPerPage, 
        suggestionsPerGalleryPage,
        currentListPage, setListCurrentPage,
        currentGalleryPage, setGalleryCurrentPage,
        setCurrentPageListNamesArray,
        setCurrentPageGalleryNamesArray,
        setErrorMessage,
        totalListNamesArray, setTotalListNamesArray,
        totalGalleryNamesArray, setTotalGalleryNamesArray,
        maxMainSuggestions,
        monsterType,
        spellType,
        trapType,
        attributeType,
        levelFilter, lessThanEqual, equal, greaterThanEqual,
        pendFilter, pendLessThanEqual, pendEqual, pendGreaterThanEqual,
        linkFilter, linkLessThanEqual, linkEqual, linkGreaterThanEqual,
        atkFilter, atkLessThanEqual, atkEqual, atkGreaterThanEqual,
        defFilter, defLessThanEqual, defEqual, defGreaterThanEqual
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

  useEffect(() => {
    const startIndex = (currentListPage - 1) * suggestionsPerPage;
    const endIndex = startIndex + suggestionsPerPage;
    const currentListSuggestions = totalListNamesArray.slice(startIndex, endIndex);
    setCurrentPageListNamesArray(currentListSuggestions);
  }, [currentListPage, totalListNamesArray, suggestionsPerPage]);

  useEffect(() => {
    const startIndex = (currentGalleryPage - 1) * suggestionsPerGalleryPage;
    const endIndex = startIndex + suggestionsPerGalleryPage;
    const currentGallerySuggestions = totalGalleryNamesArray.slice(startIndex, endIndex);
    setCurrentPageGalleryNamesArray(currentGallerySuggestions);
  }, [currentGalleryPage, totalGalleryNamesArray, suggestionsPerGalleryPage]);

  const debouncedSearchCard = useCallback((inputValue: string) => {
      if (!inputValue.trim()) {
        setTotalListNamesArray([]);
        setTotalGalleryNamesArray([]);
        return;
      }

      const normalizedInput = inputValue.toLowerCase().replace(/[-\s]/g, ''); 
      const filteredSuggestions = cardData.filter((card) => {
        const normalizedCardName = card.name.toLowerCase().replace(/[-\s]/g, ''); 
        const normalizedMonsterType = monsterType ? monsterType.toLowerCase() : "";
        const normalizedSpellType = spellType ? spellType.toLowerCase() : "";
        const normalizedTrapType = trapType ? trapType.toLowerCase() : "";
        const normalizedAttributeType = attributeType ? attributeType.toLowerCase() : "";

        const matchesname = normalizedInput ? normalizedCardName.includes(normalizedInput) : true;
        const matchesMonsterType = monsterType? card.type?.toLowerCase() === normalizedMonsterType : true;
        const matchesSpellType = spellType? card.race?.toLowerCase() === normalizedSpellType && card.frameType?.toLowerCase() === 'spell' : true;
        const matchesTrapType = trapType? card.race?.toLowerCase() == normalizedTrapType && card.frameType?.toLowerCase() === "trap" : true;
        const matchesAttributeType = attributeType? card.attribute?.toLowerCase() == normalizedAttributeType : true;
        
        const matchesLevelFilter = levelFilter ?
          (lessThanEqual && card.level !== undefined && card.level <= levelFilter) ||
          (equal && card.level !== undefined && card.level === levelFilter) ||
          (greaterThanEqual && card.level !== undefined && card.level >= levelFilter)
        : true;

        const matchesPendFilter = pendFilter ? 
          (pendLessThanEqual && card.scale !== undefined && card.scale <= pendFilter) ||
          (pendEqual && card.scale !== undefined && card.scale === pendFilter) || 
          (pendGreaterThanEqual && card.scale !== undefined && card.scale >= pendFilter)
        : true;

        const matchesLinkFilter = linkFilter ? 
          (linkLessThanEqual && card.linkval !== undefined && card.linkval <= linkFilter) ||
          (linkEqual && card.linkval !== undefined && card.linkval === linkFilter) || 
          (linkGreaterThanEqual && card.linkval !== undefined && card.linkval >= linkFilter)
        : true;

        const matchesAtkFilter = atkFilter ?
          (atkLessThanEqual && card.atk !== undefined && card.atk <= atkFilter) ||
          (atkEqual && card.atk !== undefined && card.atk === atkFilter) ||
          (atkGreaterThanEqual && card.atk !== undefined && card.atk >= atkFilter) 
        : true;

        const matchesDefFilter = defFilter ?
          (defLessThanEqual && card.def !== undefined && card.def <= defFilter) ||
          (defEqual && card.def !== undefined && card.def === defFilter) ||
          (defGreaterThanEqual && card.def !== undefined && card.def >= defFilter) 
        : true;

        return (
          matchesname && 
          matchesMonsterType && 
          matchesSpellType && 
          matchesTrapType && 
          matchesAttributeType && 
          matchesLevelFilter && 
          matchesPendFilter && 
          matchesLinkFilter && 
          matchesAtkFilter &&
          matchesDefFilter
        ) 
      });

      setTotalListNamesArray(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));
      setTotalGalleryNamesArray(filteredSuggestions.slice(0, maxMainSuggestions).map((card) => card.name));

    }, [
      cardData, 
      maxMainSuggestions,
      monsterType, 
      spellType, 
      trapType, 
      attributeType, 
      levelFilter, equal, greaterThanEqual, lessThanEqual, 
      pendFilter, pendLessThanEqual, pendEqual, pendGreaterThanEqual, 
      linkFilter, linkLessThanEqual, linkEqual, linkGreaterThanEqual, 
      atkFilter, atkLessThanEqual, atkEqual, atkGreaterThanEqual,
      defFilter, defLessThanEqual, defEqual, defGreaterThanEqual,
    ]);

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