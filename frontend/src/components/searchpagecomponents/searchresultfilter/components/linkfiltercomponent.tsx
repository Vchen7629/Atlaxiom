import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { linkprops } from "../../types/componenttypes"
import { LinkSliderComponent } from "../slidercomponents/linkslider"

const LinkFilterComponent = ({ linkfilterprops }: linkprops) => {
    const {
        setCanClearFilters,
        linkFilter, setLinkFilter,
        linkLessThanEqual, setLinkLessThanEqual,
        linkEqual, setLinkEqual,
        linkGreaterThanEqual, setLinkGreaterThanEqual,
    } = linkfilterprops

    const handleLessThanClick = () => {
        setLinkLessThanEqual(true);
        setLinkEqual(false);
        setLinkGreaterThanEqual(false);
    }

    const handleEqualClick = () => {
        setLinkLessThanEqual(false);
        setLinkEqual(true);
        setLinkGreaterThanEqual(false);
    }

    const handleGreaterThanClick = () => {
        setLinkLessThanEqual(false);
        setLinkEqual(false);
        setLinkGreaterThanEqual(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        let numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);

        if (numericValue !== null) {
            if (numericValue < 1) numericValue = 1;
            if (numericValue > 6) numericValue = 6;
        }
        
        setLinkFilter(numericValue)
        setCanClearFilters(numericValue !== null)
    }

    const linkSliderProps = {
        linkFilter, setLinkFilter,
        setCanClearFilters
    }

    return (
        <div className="flex flex-col space-y-2 w-[85%] items-center">
            <div className="flex w-full"><LinkSliderComponent linkSliderProps={linkSliderProps}/></div>
            <div className="flex justify-between w-full mr-2">
                <div className="flex w-[30%]">
                    <button className={`${linkLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tl-lg rounded-bl-lg`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                    <button className={`${linkEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals}/></button>
                    <button className={`${linkGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tr-lg rounded-br-lg`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual}/></button>
                </div>
                <input
                    className="flex text-center bg-[hsl(var(--atkdefcomponent))] border-2 ml-2 w-[20%] border-transparent rounded-lg"
                    value={linkFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default LinkFilterComponent