import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { defprops } from "../types/componenttypes"

const MobileDefFilter = ({ deffilterprops }: defprops) => {
    const {
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        defFilter, setDefFilter,
        defLessThanEqual, setDefLessThanEqual,
        defEqual, setDefEqual,
        defGreaterThanEqual, setDefGreaterThanEqual
    } = deffilterprops

    function handleLessThanClick() {
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
        setCanClearFilter(true)
        setDefLessThanEqual(true);
        setDefEqual(false);
        setDefGreaterThanEqual(false);
    }

    function handleEqualClick() {
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
        setCanClearFilter(true)
        setDefLessThanEqual(false);
        setDefEqual(true);
        setDefGreaterThanEqual(false);
    }

    function handleGreaterThanClick() {
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
        setCanClearFilter(true)
        setDefLessThanEqual(false);
        setDefEqual(false);
        setDefGreaterThanEqual(true);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        const numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);
        setDefFilter(numericValue)
        setCanClearFilter(numericValue !== null)
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
    }

    return (
        <div className="flex w-[93%] my-2">   
            <div className="flex items-center justify-end space-x-4">
                <div className="flex w-[30%] text-[hsl(var(--text))]">
                    <button 
                        className={`${defGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tl-lg rounded-bl-lg`} 
                        onClick={handleGreaterThanClick}
                    >
                        <FontAwesomeIcon icon={faGreaterThanEqual} className="fa-xs"/>
                    </button>
                    <button 
                        className={`${defEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2`} 
                        onClick={handleEqualClick}
                    >
                        <FontAwesomeIcon icon={faEquals} className="fa-xs"/>
                    </button>
                    <button 
                        className={`${defLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tr-lg rounded-br-lg`} 
                        onClick={handleLessThanClick}
                    >
                        <FontAwesomeIcon icon={faLessThanEqual} className="fa-xs"/>
                    </button>
                </div>
                <input
                    className="flex text-center text-[hsl(var(--text))] rounded-lg bg-[hsl(var(--atkdefcomponent))] border-2 ml-2 w-1/4 border-transparent"
                    value={defFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default MobileDefFilter