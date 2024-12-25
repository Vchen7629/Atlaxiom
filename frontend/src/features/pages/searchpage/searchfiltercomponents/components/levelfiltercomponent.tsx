import { LevelSliderComponent } from "../slidercomponents/levelslider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { levelprops } from "../../types/componenttypes"

const LevelFilterComponent = ({ levelfilterprops }: levelprops) => {
    const {
        levelFilter,
        setLevelFilter,
        lessThanEqual,
        setLessThanEqual,
        equal,
        setEqual,
        greaterThanEqual,
        setGreaterThanEqual,
    } = levelfilterprops

    const handleLessThanClick = () => {
        setLessThanEqual(true);
        setEqual(false);
        setGreaterThanEqual(false);
    }

    const handleEqualClick = () => {
        setLessThanEqual(false);
        setEqual(true);
        setGreaterThanEqual(false);
    }

    const handleGreaterThanClick = () => {
        setLessThanEqual(false);
        setEqual(false);
        setGreaterThanEqual(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);
        setLevelFilter(numericValue)
    }

    return (
        <div className="flex flex-col space-y-2 w-[85%] items-center">
            <div className="flex w-full"><LevelSliderComponent setLevelFilter={setLevelFilter}/></div>
            <div className="flex justify-between w-full mr-2">
                <div className="flex w-[30%]">
                    <button className={`${lessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                    <button className={`${equal ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals}/></button>
                    <button className={`${greaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-footer"} h-7 px-2`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual}/></button>
                </div>
                <input
                    className="flex text-center bg-footer border-2 ml-2 w-[30%] border-transparent"
                    value={levelFilter ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default LevelFilterComponent