import { filterbutton } from "../types/buttontypes"

const FilterButton = ({ filterbuttonprops }: filterbutton) => {
    const {
        expandStatus,
        setExpandStatus,
        filterActive,
        setFilterActive
    } = filterbuttonprops

    const handleFilterClick = () => {
        setExpandStatus(!expandStatus)
        setFilterActive(!filterActive)
    }

    return (
        <button 
            className={`h-[40px] ml-2 px-4 rounded-xl ${filterActive ? "bg-[hsl(var(--filterbutton))]" : "bg-[hsl(var(--background3))]"}`}  
            onClick={handleFilterClick}
        >
            Filter Card
        </button>
    )
}

export default FilterButton