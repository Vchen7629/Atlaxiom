import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { atkprops } from "../../types/componenttypes"

const AtkFilterComponent = ({ atkfilterprops }: atkprops) => {
    const {
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        atkFilter, setAtkFilter,
        atkLessThanEqual, setAtkLessThanEqual,
        atkEqual, setAtkEqual,
        atkGreaterThanEqual, setAtkGreaterThanEqual
    } = atkfilterprops

    function handleLessThanClick() {
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
        setCanClearFilter(true)
        setAtkLessThanEqual(true);
        setAtkEqual(false);
        setAtkGreaterThanEqual(false);
    }

    function handleEqualClick() {
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
        setCanClearFilter(true)
        setAtkLessThanEqual(false);
        setAtkEqual(true);
        setAtkGreaterThanEqual(false);
    }

    function handleGreaterThanClick() {
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
        setCanClearFilter(true)
        setAtkLessThanEqual(false);
        setAtkEqual(false);
        setAtkGreaterThanEqual(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);
        setAtkFilter(numericValue)
        setCanClearFilter(numericValue !== null)
        setListCurrentPage(1)
        setGalleryCurrentPage(1)
    }

    return (
        <div className="flex w-[93%] my-2">   
            <div className="flex items-center justify-evenly space-x-4">
                <div className="flex w-[30%] text-[hsl(var(--text))]">
                    <button 
                        className={`${atkGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tl-lg rounded-bl-lg`} 
                        onClick={handleGreaterThanClick}
                    >
                        <FontAwesomeIcon icon={faGreaterThanEqual} className="fa-xs"/>
                    </button>
                    <button 
                        className={`${atkEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2`} 
                        onClick={handleEqualClick}
                    >
                        <FontAwesomeIcon icon={faEquals}/>
                    </button>
                    <button 
                        className={`${atkLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tr-lg rounded-br-lg`} 
                        onClick={handleLessThanClick}
                    >
                        <FontAwesomeIcon icon={faLessThanEqual} className="fa-xs"/>
                    </button>
                </div>
                <input
                    className="flex text-center text-[hsl(var(--text))] rounded-lg bg-[hsl(var(--atkdefcomponent))] border-2 ml-2 w-1/4 border-transparent"
                    value={atkFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default AtkFilterComponent