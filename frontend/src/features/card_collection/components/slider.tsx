import { cn } from "@/lib/utils"
import { Slider } from "@/shared/ui/slider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { SliderProps } from "../types/componenttypes"

export function FilterSliderComponent({ 
  setCanClearFilter,
  valueFilter, setValueFilter,
  setListCurrentPage,
  setGalleryCurrentPage,
  lessThanEqual, setLessThanEqual, 
  equal, setEqual, 
  greaterThanEqual, setGreaterThanEqual,
  minNumber,
  maxNumber,
  className,
  ...props
}: SliderProps & { className?: string }) {

  function handleLessThanClick() {
    setLessThanEqual(true);
    setEqual(false);
    setGreaterThanEqual(false);
    setCanClearFilter(true);
  }

  function handleEqualClick() {
      setLessThanEqual(false);
      setEqual(true);
      setGreaterThanEqual(false);
      setCanClearFilter(true);
  }

  function handleGreaterThanClick() {
      setLessThanEqual(false);
      setEqual(false);
      setGreaterThanEqual(true);
      setCanClearFilter(true);
  }


  function handleSliderChange(newValue: number[]) {
    setValueFilter(newValue[0])
    setListCurrentPage(1);
    setGalleryCurrentPage(1);
    setCanClearFilter(newValue[0] !== null);
  }

  return (
    <div className="flex w-[94%] my-2 justify-between">
      <div className="flex w-fit text-[hsl(var(--text))]">
        <button 
            className={`${lessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tl-lg rounded-bl-lg`} 
            onClick={handleLessThanClick}
        >
          <FontAwesomeIcon icon={faGreaterThanEqual} className="fa-xs"/>
        </button>
        <button className={`${equal ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2`} onClick={handleEqualClick}>
          <FontAwesomeIcon icon={faEquals} className="fa-xs"/>
        </button>
        <button 
            className={`${greaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tr-lg rounded-br-lg`} 
            onClick={handleGreaterThanClick}
        >
          <FontAwesomeIcon icon={faLessThanEqual} className="fa-xs"/>
        </button>
      </div>
      <Slider
        value={[valueFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={maxNumber}
        step={minNumber}
        className={cn("w-[50%] mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">
        {valueFilter ?? 1}
      </span>
    </div>
  )
}
