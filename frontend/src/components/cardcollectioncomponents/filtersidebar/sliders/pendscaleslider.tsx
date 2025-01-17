import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { PendSliderProps } from "../../types/dropdowntypes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLessThanEqual, faEquals, faGreaterThanEqual } from "@fortawesome/free-solid-svg-icons"

export function PendScaleSliderComponent({ pendprops, className, ...props }: PendSliderProps) {
  const {
    pendFilter, setCanClearFilter,
    setPendFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
    pendLessThanEqual, setPendLessThanEqual, 
    pendEqual, setPendEqual, 
    pendGreaterThanEqual, setPendGreaterThanEqual,
  } = pendprops 

  const handleSliderChange = (newValue: number[]) => {
    setPendFilter(newValue[0])
    setListCurrentPage(1);
    setGalleryCurrentPage(1);
    setCanClearFilter(newValue[0] !== null);
  }

  const handleLessThanClick = () => {
    setPendLessThanEqual(true);
    setPendEqual(false);
    setPendGreaterThanEqual(false);
    setCanClearFilter(true);
  }

  const handleEqualClick = () => {
      setPendLessThanEqual(false);
      setPendEqual(true);
      setPendGreaterThanEqual(false);
      setCanClearFilter(true);
  }

  const handleGreaterThanClick = () => {
      setPendLessThanEqual(false);
      setPendEqual(false);
      setPendGreaterThanEqual(true);
      setCanClearFilter(true);
  }

  return (
    <div className="flex w-[94%] my-2 justify-between">
      <div className="flex w-fit text-[hsl(var(--text))]">
        <button className={`${pendLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tl-lg rounded-bl-lg`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual} className="fa-xs"/></button>
        <button className={`${pendEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals} className="fa-xs"/></button>
        <button className={`${pendGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tr-lg rounded-br-lg`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual} className="fa-xs"/></button>
      </div>
      <Slider
        value={[pendFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-1/2 mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">
        {pendFilter ?? 1}
      </span>
    </div>
  )
}
