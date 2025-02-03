import { toast } from "sonner"
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

    function handleFilterClick() {
        setExpandStatus(!expandStatus)
        setFilterActive(!filterActive)
    }

    function FilterClick() {
        handleFilterClick();
        {!filterActive ? (
            toast.success("Re-opened Filter Search Sidebar")
        ) : (
            toast.success("Successfully hid the Filter Search Sidebar")
        )}
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <span
                        className={`h-[40px] ml-2 px-4 py-3 rounded-xl ${filterActive ? "bg-[hsl(var(--background3))]" : "bg-gray-600"}`}  
                        onClick={FilterClick}
                    >
                        Filter Card
                    </span>
                </TooltipTrigger>
                <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent" side="bottom">
                    <span className="text-[hsl(var(--text))]">Click to Hide Filter Sidebar</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default FilterButton