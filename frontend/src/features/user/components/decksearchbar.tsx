import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { DeckSearchBarComp } from "../types/componenttypes";

const DeckSearchBar = ({ setDeckName, deckName}: DeckSearchBarComp) => {
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setDeckName(inputValue);
    };

    function handleClearClick() {
        setDeckName('');
    };

    return (
        <div className="flex flex-grow w-[80vw] lg:min-w-[15vw] lg:max-w-[20vw] h-[40px] pl-3 relative border-2 border-gray-400 dark:border-gray-600 bg-[hsl(var(--contrast))] rounded-lg justify-start text-[hsl(var(--text))]">                      
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