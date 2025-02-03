import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import { clearfilter } from "../types/buttontypes";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner";

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

    function ClearFilter() {
        handleClearFilter();
        {canClearFilters && (
            toast.success("Removed All Search Filters Successfully"))
        }
    }
      
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <span
                        className={`${canClearFilters ? "bg-[hsl(var(--background3))]" : "bg-gray-600"} py-[12px] px-[14px] rounded-xl`} 
                        onClick={ClearFilter}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                ClearFilter();
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowRotateRight}/>
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