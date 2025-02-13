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
                    <div
                        className={`flex text-center items-center h-12 px-4 ml-2 rounded-xl shadow-md shadow-[hsl(var(--shadow))] ${filterActive ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--contrast))] border-2 dark:border-gray-600"}`}  
                        onClick={FilterClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                FilterClick();
                            }
                        }}
                    >
                        <span className="text-[hsl(var(--text))] font-bold">Filter Card</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent" side="bottom">
                    <span className="text-[hsl(var(--text))]">Click to Hide Filter Sidebar</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default FilterButton