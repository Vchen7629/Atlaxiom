import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FilterButtonProps } from "../../card_collection/types/componenttypes"

const MobileCardFilterButton = ({ filterprops }: FilterButtonProps) => {
    const { 
        filterpage, setFilterPage,
        setStatisticsPage
    } = filterprops

    function handleFilterClick()  {
        setFilterPage(true)
        setStatisticsPage(false)
    }

    return (
        <button className={`p-2 rounded-xl font-black mr-2 ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>
            <FontAwesomeIcon icon={faFilter} className="fa-sm"/>
        </button>
    )
}

export default MobileCardFilterButton