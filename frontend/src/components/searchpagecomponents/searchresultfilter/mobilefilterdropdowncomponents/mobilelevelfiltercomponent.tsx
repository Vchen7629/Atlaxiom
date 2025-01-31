import { LevelSliderComponent } from "../slidercomponents/levelslider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { levelprops } from "../../types/componenttypes"

const MobileLevelFilterComponent = ({ levelfilterprops }: levelprops) => {
    const {
        setCanClearFilters,
        levelFilter, setLevelFilter,
        lessThanEqual, setLessThanEqual,
        equal, setEqual,
        greaterThanEqual, setGreaterThanEqual,
    } = levelfilterprops

    function handleLessThanClick() {
        setLessThanEqual(true);
        setEqual(false);
        setGreaterThanEqual(false);
        setCanClearFilters(true);
    }

    function handleEqualClick() {
        setLessThanEqual(false);
        setEqual(true);
        setGreaterThanEqual(false);
        setCanClearFilters(true);
    }

    function handleGreaterThanClick() {
        setLessThanEqual(false);
        setEqual(false);
        setGreaterThanEqual(true);
        setCanClearFilters(true);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        let numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);

        if (numericValue !== null) {
            if (numericValue < 1) numericValue = 1;
            if (numericValue > 13) numericValue = 13;
        }
        
        setLevelFilter(numericValue)
        setCanClearFilters(true)
    }

    const levelSliderProps = {
        levelFilter, setLevelFilter,
        setCanClearFilters
    }


    return (
        <div className="flex flex-col space-y-2 w-full items-center">
            <div className="flex w-full"><LevelSliderComponent levelSliderProps={levelSliderProps}/></div>
            <div className="flex justify-between w-full mr-2">
                <div className="flex w-[30%]">
                    <button className={`${lessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tl-lg rounded-bl-lg`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                    <button className={`${equal ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals}/></button>
                    <button className={`${greaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tr-lg rounded-br-lg`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual}/></button>
                </div>
                <input
                    className="flex text-center bg-[hsl(var(--atkdefcomponent))] rounded-lg border-2 ml-2 w-[20%] border-transparent"
                    value={levelFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default MobileLevelFilterComponent