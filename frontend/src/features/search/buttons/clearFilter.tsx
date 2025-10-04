import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import { clearfilter } from "../types/button";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shared/ui/tooltip"

const ClearFilterButton = ({ clearfilterprops }: clearfilter) => {
    const {
        canClearFilters, setCanClearFilters,
        setMonsterType,
        setSpellType,
        setTrapType,
        setAttributeType,
        setSetName,
        setLevelFilter, setLessThanEqual, setEqual, setGreaterThanEqual,
        setPendFilter, setPendLessThanEqual, setPendEqual, setPendGreaterThanEqual,
        setLinkFilter, setLinkLessThanEqual, setLinkEqual, setLinkGreaterThanEqual,
        setAtkFilter, setAtkLessThanEqual, setAtkEqual, setAtkGreaterThanEqual,
        setDefFilter, setDefLessThanEqual, setDefEqual, setDefGreaterThanEqual,
    } = clearfilterprops

    function handleClearFilter() {
        setCanClearFilters(false);
        setMonsterType("");
        setSpellType("");
        setTrapType("");
        setAttributeType("");
        setLevelFilter(0);
        setLessThanEqual(false);
        setEqual(true);
        setGreaterThanEqual(false);
        setPendFilter(0);
        setPendLessThanEqual(false);
        setPendEqual(true);
        setPendGreaterThanEqual(false);
        setLinkFilter(0);
        setLinkLessThanEqual(false);
        setLinkEqual(true);
        setLinkGreaterThanEqual(false);
        setAtkFilter(0);
        setAtkLessThanEqual(false);
        setAtkEqual(true);
        setAtkGreaterThanEqual(false);
        setDefFilter(0);
        setDefLessThanEqual(false);
        setDefEqual(true);
        setDefGreaterThanEqual(false);
        setSetName("")
    }
      
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <span
                        className={`${canClearFilters ? "bg-[hsl(var(--background3))] border-2 border-transparent" : "bg-[hsl(var(--contrast))] border-2 dark:border-gray-600"} shadow-md shadow-[hsl(var(--shadow))] flex h-12 p-4 rounded-xl`} 
                        onClick={handleClearFilter}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleClearFilter();
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowRotateRight} className={`${canClearFilters ? "text-[hsl(var(--text))]" : "text-[hsl(var(--background3))]"}`}/>
                    </span>
                </TooltipTrigger>
                <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent" side="bottom">
                    <span className="text-[hsl(var(--text))]">Click to clear filters</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ClearFilterButton