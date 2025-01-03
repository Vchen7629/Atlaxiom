import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"
import { SearchBar } from "../types/searchbartypes"

const SearchBarComponent = ({ searchbarprops }: SearchBar) => {
    const {
        searchTerm, setSearchTerm,
        setClickedOnCard,
        setSelectedCardData,
        setListCurrentPage,
        setGalleryCurrentPage,
        setErrorMessage,
    } = searchbarprops

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setClickedOnCard(false);
        setSelectedCardData(null);
        setListCurrentPage(1);
        setGalleryCurrentPage(1);
        setErrorMessage('');
    };

    const handleClearClick = () => {
        setSearchTerm('');
        setErrorMessage('');
        setSelectedCardData(null);
        setClickedOnCard(false);
      };
    
    return (
        <div className="flex h-[50px] ml-[10%] pl-5 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
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
        </div>
    )
}

export default SearchBarComponent