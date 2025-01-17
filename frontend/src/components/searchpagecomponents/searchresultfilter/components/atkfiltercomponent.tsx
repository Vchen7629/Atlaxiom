import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { atkprops } from "../../types/componenttypes"

const AtkFilterComponent = ({ atkfilterprops }: atkprops) => {
    const {
        setCanClearFilters,
        atkFilter, setAtkFilter,
        atkLessThanEqual, setAtkLessThanEqual,
        atkEqual, setAtkEqual,
        atkGreaterThanEqual, setAtkGreaterThanEqual
    } = atkfilterprops

    const handleLessThanClick = () => {
        setAtkLessThanEqual(true);
        setAtkEqual(false);
        setAtkGreaterThanEqual(false);
        setCanClearFilters(true)
    }

    const handleEqualClick = () => {
        setAtkLessThanEqual(false);
        setAtkEqual(true);
        setAtkGreaterThanEqual(false);
        setCanClearFilters(true)
    }

    const handleGreaterThanClick = () => {
        setAtkLessThanEqual(false);
        setAtkEqual(false);
        setAtkGreaterThanEqual(true);
        setCanClearFilters(true)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);
        setAtkFilter(numericValue)
        setCanClearFilters(true)
    }

    return (
        <div className="flex w-full justify-center my-2">   
            <div className="flex items-center max-w-[85%] justify-between">
                <div className="mr-2 font-black">Attack:</div>
                <div className="flex w-[30%]">
                    <button 
                        className={`${atkGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tl-lg rounded-bl-lg`} 
                        onClick={handleGreaterThanClick}
                    >
                        <FontAwesomeIcon icon={faGreaterThanEqual}/>
                    </button>
                    <button 
                        className={`${atkEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2`} 
                        onClick={handleEqualClick}
                    >
                        <FontAwesomeIcon icon={faEquals}/>
                    </button>
                    <button 
                        className={`${atkLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tr-lg rounded-br-lg`} 
                        onClick={handleLessThanClick}
                    >
                        <FontAwesomeIcon icon={faLessThanEqual}/>
                    </button>
                </div>
                <input
                    className="flex text-center bg-[hsl(var(--atkdefcomponent))] border-2 ml-2 w-1/4 border-transparent"
                    value={atkFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default AtkFilterComponent