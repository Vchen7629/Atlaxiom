import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import { clearfilter } from "../types/buttontypes";

const ClearFilterButton = ({ clearfilterprops }: clearfilter) => {
    const {
        setMonsterType,
        setSpellType,
        setTrapType,
        setAttributeType,
        setLevelFilter, setLessThanEqual, setEqual, setGreaterThanEqual,
        setPendFilter, setPendLessThanEqual, setPendEqual, setPendGreaterThanEqual,
        setLinkFilter, setLinkLessThanEqual, setLinkEqual, setLinkGreaterThanEqual,
        setAtkFilter, setAtkLessThanEqual, setAtkEqual, setAtkGreaterThanEqual,
        setDefFilter, setDefLessThanEqual, setDefEqual, setDefGreaterThanEqual,
    } = clearfilterprops

    const handleClearFilter = () => {
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
    }
      
    return (
        <button className="bg-[hsl(var(--background3))] py-[12px] px-[14px] rounded-xl" onClick={handleClearFilter}>
            <FontAwesomeIcon icon={faArrowRotateRight}/>
        </button>
    )
}

export default ClearFilterButton