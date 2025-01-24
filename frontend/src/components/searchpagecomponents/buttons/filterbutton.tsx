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

    const handleFilterClick = () => {
        setExpandStatus(!expandStatus)
        setFilterActive(!filterActive)
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <a
                        className={`h-[40px] ml-2 px-4 py-3 rounded-xl ${filterActive ? "bg-[hsl(var(--background3))]" : "bg-gray-600"}`}  
                        onClick={() => {
                            handleFilterClick();
                            {!filterActive ? (
                                toast.success("Successfully hid the Filter Search Sidebar")
                            ) : (
                                toast.success("Re-opened Filter Search Sidebar")
                            )}
                        }}
                    >
                        Filter Card
                    </a>
                </TooltipTrigger>
                <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent" side="bottom">
                    <span className="text-[hsl(var(--text))]">Click to Hide Filter Sidebar</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default FilterButton