import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FilterButtonProps } from "../../types/componenttypes"
import { useCallback } from "react"

const FilterCardViewButton = ({ filterprops }: FilterButtonProps) => {
    const { 
        filterpage, setFilterPage,
        setStatisticsPage
    } = filterprops

    const handleFilterClick = useCallback(() => {
        setFilterPage(true)
        setStatisticsPage(false)
    }, [setFilterPage, setStatisticsPage]);

    return (
        <button className={`p-2 rounded-xl font-black mr-2 ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>
            <FontAwesomeIcon icon={faFilter} className="fa-sm"/>
        </button>
    )
}

export default FilterCardViewButton