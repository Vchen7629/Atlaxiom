import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { DeckSearchBarComp } from "../types/componenttypes";

const DeckSearchBar = ({ setDeckName, deckName}: DeckSearchBarComp) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setDeckName(inputValue);
    };

    const handleClearClick = () => {
        setDeckName('');
    };

    return (
        <div className="flex flex-grow min-w-[15vw] max-w-[20vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                <input
                    className="bg-transparent w-full h-full text-md text-[hsl(var(--text))] focus:outline-none"
                    type="text"
                    value={deckName}
                    onChange={handleInputChange}
                    placeholder="Search Your Decks"
                />
                {deckName && (
                    <button className="cursor-pointer mr-[10px]" onClick={handleClearClick}>
                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                    </button>
                )}
            </div>
        </div>
    )
}   

export default DeckSearchBar