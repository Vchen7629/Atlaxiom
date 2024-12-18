import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const DeckSearchBar = ({ setDeckName, deckName}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setDeckName(inputValue);
    };

    const handleClearClick = () => {
        setDeckName('');
    };

    return (
        <div className="flex w-[15vw] h-[40px] pl-5 relative border-2 border-gray-400 justify-start text-gold">                      
            <div className="flex items-center w-full">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                <input
                    className="bg-transparent w-full h-full text-md text-white focus:outline-none"
                    type="text"
                    value={deckName}
                    onChange={handleInputChange}
                    placeholder="Search Your Decks"
                />
                {deckName && (
                    <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                    </button>
                )}
            </div>
        </div>
    )
}   

export default DeckSearchBar