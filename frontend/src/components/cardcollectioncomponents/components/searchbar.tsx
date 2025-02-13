
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons"
import { searchbarprops } from "../types/componenttypes"

const MyCardsSearchbarComponent = ({ searchbarprops }: searchbarprops) => {
    const { searchTerm, setSearchTerm } = searchbarprops

    function handleClearClick() {
        setSearchTerm('')
    }
    
    function handleSearchTerm(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement
        setSearchTerm(target.value);
    }

    return (
        <div className="relative w-full flex h-12 border-2 border-gray-400 dark:border-gray-600 items-center rounded-xl bg-[hsl(var(--background1))]">
            <FontAwesomeIcon icon={faSearch} className="text-xl text-[hsl(var(--text))] mx-[3%]"/>
            <input 
                className="w-[85%] bg-transparent text-[hsl(var(--text))] h-full outline-none"
                type="text"
                value={searchTerm}
                onChange={handleSearchTerm}
                placeholder="Search Cards... "
            />
            <button className="curser-pointer w-[10%] h-full text-gray-400 align-right border-transparent fa-xl" onClick={handleClearClick}>
                <FontAwesomeIcon icon={faTimes}/>
            </button>
        </div>  
    )
}

export default MyCardsSearchbarComponent