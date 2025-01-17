import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FilterButtonProps } from "../../types/componenttypes"

const FilterCardViewButton = ({ filterprops }: FilterButtonProps) => {
    const { 
        filterpage, setFilterPage,
        setStatisticsPage
    } = filterprops

    const handleFilterClick = () => {
        setFilterPage(true)
        setStatisticsPage(false)
    }

    return (
        <button className={`p-2 rounded-xl font-black mr-2 ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>
            <FontAwesomeIcon icon={faFilter} className="fa-lg"/>
        </button>
    )
}

export default FilterCardViewButton