import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { linkprops } from "../../types/componenttypes"
import { LinkSliderComponent } from "../slidercomponents/linkslider"

const LinkFilterComponent = ({ linkfilterprops }: linkprops) => {
    const {
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
        const numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);
        setLinkFilter(numericValue)
    }

    return (
        <div className="flex flex-col space-y-2 w-[85%] items-center">
            <div className="flex w-full"><LinkSliderComponent setLinkFilter={setLinkFilter}/></div>
            <div className="flex justify-between w-full mr-2">
                <div className="flex w-[30%]">
                    <button className={`${linkLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                    <button className={`${linkEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals}/></button>
                    <button className={`${linkGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual}/></button>
                </div>
                <input
                    className="flex text-center bg-footer border-2 ml-2 w-[30%] border-transparent"
                    value={linkFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default LinkFilterComponent