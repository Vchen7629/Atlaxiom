import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import { clearfilter } from "../types/buttontypes";

const ClearFilterButton = ({ clearfilterprops }: clearfilter) => {
    const {
        setMonsterType,
        setSpellType,
        setTrapType,
        setAttributeType,
        setLevelFilter,
        setPendFilter,
        setLinkFilter,
    } = clearfilterprops

    const handleClearFilter = () => {
        setMonsterType("");
        setSpellType("");
        setTrapType("");
        setAttributeType("");
        setLevelFilter(0);
        setPendFilter(0);
        setLinkFilter(0);
    }
      
    return (
        <button className="bg-[hsl(var(--background3))] py-[12px] px-[14px] rounded-xl" onClick={handleClearFilter}>
            <FontAwesomeIcon icon={faArrowRotateRight}/>
        </button>
    )
}

export default ClearFilterButton