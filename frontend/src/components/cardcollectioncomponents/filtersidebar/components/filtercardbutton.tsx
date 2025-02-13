import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FilterButtonProps } from "../../types/componenttypes"

const FilterCardViewButton = ({ filterprops }: FilterButtonProps) => {
    const { 
        filterpage, setFilterPage,
        setStatisticsPage
    } = filterprops

    function handleFilterClick() {
        setFilterPage(true)
        setStatisticsPage(false)
    }

    return (
        <button className={`flex rounded-xl font-black p-2 mr-2 items-center ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>
            <FontAwesomeIcon icon={faFilter} className="fa-lg"/>
        </button>
    )
}

export default FilterCardViewButton