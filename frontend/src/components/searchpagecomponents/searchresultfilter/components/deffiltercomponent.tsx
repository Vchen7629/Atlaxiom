import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { defprops } from "../../types/componenttypes"

const DefFilterComponent = ({ deffilterprops }: defprops) => {
    const {
        setCanClearFilters,
        defFilter, setDefFilter,
        defLessThanEqual, setDefLessThanEqual,
        defEqual, setDefEqual,
        defGreaterThanEqual, setDefGreaterThanEqual
    } = deffilterprops

    function handleLessThanClick() {
        setDefLessThanEqual(true);
        setDefEqual(false);
        setDefGreaterThanEqual(false);
        setCanClearFilters(true)
    }

    function handleEqualClick() {
        setDefLessThanEqual(false);
        setDefEqual(true);
        setDefGreaterThanEqual(false);
        setCanClearFilters(true)
    }

    function handleGreaterThanClick() {
        setDefLessThanEqual(false);
        setDefEqual(false);
        setDefGreaterThanEqual(true);
        setCanClearFilters(true)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        const numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);
        setDefFilter(numericValue)
        setCanClearFilters(true)
    }

    return (
        <div className="flex w-full justify-center my-2">   
            <div className="flex items-center max-w-[85%] justify-between">
                <div className="mr-2 font-black">Defense:</div>
                <div className="flex w-[30%]">
                    <button 
                        className={`${defGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tl-lg rounded-bl-lg`} 
                        onClick={handleGreaterThanClick}
                    >
                        <FontAwesomeIcon icon={faGreaterThanEqual}/>
                    </button>
                    <button 
                        className={`${defEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2`} 
                        onClick={handleEqualClick}
                    >
                        <FontAwesomeIcon icon={faEquals}/>
                    </button>
                    <button 
                        className={`${defLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tr-lg rounded-br-lg`} 
                        onClick={handleLessThanClick}
                    >
                        <FontAwesomeIcon icon={faLessThanEqual}/>
                    </button>
                </div>
                <input
                    className="flex text-center bg-[hsl(var(--atkdefcomponent))] border-2 ml-2 w-1/4 border-transparent"
                    value={defFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default DefFilterComponent