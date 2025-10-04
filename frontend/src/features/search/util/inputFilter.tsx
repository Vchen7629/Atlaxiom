import { faEquals, faGreaterThanEqual, faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilterSliderComponent } from "../components/slider";
import { Dispatch, SetStateAction } from "react";

type InputFilterProps = {
    filterValue: number | null,
    setFilterValue: Dispatch<SetStateAction<number | null>>;
    lessThanEqual: boolean;
    setLessThanEqual: (value: boolean) => void;
    equal: boolean;
    setEqual: (value: boolean) => void;
    greaterThanEqual: boolean;
    setGreaterThanEqual: (value: boolean) => void;
    setCanClearFilters: Dispatch<SetStateAction<boolean>>;
    minNumber: number;
    maxNumber: number;
}

// This component is for the filter components that require
// user input like atk, def, level, link, etc
const InputFilter = ({
    filterValue,
    setFilterValue,
    lessThanEqual,
    setLessThanEqual,
    equal,
    setEqual,
    greaterThanEqual,
    setGreaterThanEqual,
    setCanClearFilters,
    minNumber,
    maxNumber
}: InputFilterProps) => {

    function handleLessThanClick() {
        setLessThanEqual(true)
        setEqual(false)
        setGreaterThanEqual(false)
        setCanClearFilters(true)
    }

    function handleEqualClick() {
        setLessThanEqual(false)
        setEqual(true)
        setGreaterThanEqual(false)
        setCanClearFilters(true)
    }

    function handleGreaterThanClick() {
        setLessThanEqual(false)
        setEqual(false)
        setGreaterThanEqual(true)
        setCanClearFilters(true)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        const numericValue = inputValue.trim() === '' ? null : parseFloat(inputValue);
        setFilterValue(numericValue)
        setCanClearFilters(true)
    }

    const SliderProps = {
        valueFilter: filterValue,
        setValueFilter: setFilterValue,
        setCanClearFilters,
        minNumber,
        maxNumber
    }

    return (
        <div className="flex flex-col space-y-2 w-[85%] items-center">
            <div className="flex w-full">
                <FilterSliderComponent SliderProps={SliderProps}/>
            </div>
            <div className="flex justify-between w-full mr-2">
                <div className="flex w-[30%]">
                    <button 
                        className={`${greaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tl-lg rounded-bl-lg`} 
                        onClick={handleGreaterThanClick}
                    >
                        <FontAwesomeIcon icon={faGreaterThanEqual}/>
                    </button>
                    <button 
                        className={`${equal ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2`} 
                        onClick={handleEqualClick}
                    >
                        <FontAwesomeIcon icon={faEquals}/>
                    </button>
                    <button 
                        className={`${lessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-7 px-2 rounded-tr-lg rounded-br-lg`} 
                        onClick={handleLessThanClick}
                    >
                        <FontAwesomeIcon icon={faLessThanEqual}/>
                    </button>
                </div>
                <input
                    className="flex text-center bg-[hsl(var(--atkdefcomponent))] border-2 ml-2 w-[20%] border-transparent rounded-lg"
                    value={filterValue ?? ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default InputFilter