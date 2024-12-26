
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons"
import { searchbarprops } from "../types/componenttypes"

const MyCardsSearchbarComponent = ({ searchbarprops }: searchbarprops) => {
    const { searchTerm, setSearchTerm } = searchbarprops

    const handleClearClick = () => {
        setSearchTerm('')
    }
    
    const handleSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setSearchTerm(target.value);
    }

    return (
        <div className="relative w-full flex h-12 items-center rounded-md bg-footer">
            <FontAwesomeIcon icon={faSearch} className="text-xl w-[7%]"/>
            <input 
                className="w-[85%] bg-transparent h-full outline-none"
                type="text"
                value={searchTerm}
                onChange={handleSearchTerm}
                placeholder="Search Cards... "
            />
            <button className="curser-pointer w-[8%] h-full text-gray-400 bg-transparent border-transparent fa-xl" onClick={handleClearClick}>
                <FontAwesomeIcon icon={faTimes}/>
            </button>
        </div>  
    )
}

export default MyCardsSearchbarComponent