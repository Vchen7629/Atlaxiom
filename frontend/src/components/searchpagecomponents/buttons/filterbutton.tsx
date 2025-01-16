import { filterbutton } from "../types/buttontypes"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <button 
                        className={`h-[40px] ml-2 px-4 rounded-xl ${filterActive ? "bg-[hsl(var(--filterbutton))]" : "bg-[hsl(var(--background3))]"}`}  
                        onClick={handleFilterClick}
                    >
                        Filter Card
                    </button>
                </TooltipTrigger>
                <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent" side="bottom">
                    <span className="text-[hsl(var(--text))]">Click to Hide Filter Sidebar</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default FilterButton