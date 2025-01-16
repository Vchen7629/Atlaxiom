import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { pendprops } from "../../types/componenttypes"
import { PendSliderComponent } from "../slidercomponents/pendslider"

const PendFilterComponent = ({ pendfilterprops }: pendprops) => {
    const {
        setCanClearFilters,
        pendFilter, setPendFilter,
        pendLessThanEqual, setPendLessThanEqual,
        pendEqual, setPendEqual,
        pendGreaterThanEqual, setPendGreaterThanEqual,
    } = pendfilterprops

    const handleLessThanClick = () => {
        setPendLessThanEqual(true);
        setPendEqual(false);
        setPendGreaterThanEqual(false);
    }

    const handleEqualClick = () => {
        setPendLessThanEqual(false);
        setPendEqual(true);
        setPendGreaterThanEqual(false);
    }

    const handleGreaterThanClick = () => {
        setPendLessThanEqual(false);
        setPendEqual(false);
        setPendGreaterThanEqual(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        let numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);

        if (numericValue !== null) {
            if (numericValue < 1) numericValue = 1;
            if (numericValue > 13) numericValue = 13;
        }
        
        setPendFilter(numericValue)
        setCanClearFilters(numericValue !== null)
    }

    const pendSliderProps = {
        pendFilter, setPendFilter,
        setCanClearFilters
    }

    return (
        <div className="flex flex-col space-y-2 w-[85%] items-center">
            <div className="flex w-full"><PendSliderComponent pendSliderProps={pendSliderProps}/></div>
            <div className="flex justify-between w-full mr-2">
                <div className="flex w-[30%]">
                    <button className={`${pendLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                    <button className={`${pendEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals}/></button>
                    <button className={`${pendGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual}/></button>
                </div>
                <input
                    className="flex text-center bg-footer border-2 ml-2 w-[30%] border-transparent"
                    value={pendFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default PendFilterComponent