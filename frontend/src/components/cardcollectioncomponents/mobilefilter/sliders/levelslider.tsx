import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { LevelSliderProps } from "../../types/dropdowntypes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThanEqual, faEquals, faLessThanEqual } from "@fortawesome/free-solid-svg-icons"
import { useCallback } from "react"

export function LevelSliderComponent({ levelprops, className, ...props }: LevelSliderProps) {
  const {
    setCanClearFilter,
    levelFilter, setLevelFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
    levelLessThanEqual, setLevelLessThanEqual, 
    levelEqual, setLevelEqual, 
    levelGreaterThanEqual, setLevelGreaterThanEqual,
  } = levelprops 

  const handleLessThanClick = useCallback(() => {
    setLevelLessThanEqual(true);
    setLevelEqual(false);
    setLevelGreaterThanEqual(false);
    setCanClearFilter(true);
  }, [setLevelLessThanEqual, setLevelEqual, setLevelGreaterThanEqual, setCanClearFilter]);

  const handleEqualClick = useCallback(() => {
      setLevelLessThanEqual(false);
      setLevelEqual(true);
      setLevelGreaterThanEqual(false);
      setCanClearFilter(true);
  }, [setLevelLessThanEqual, setLevelEqual, setLevelGreaterThanEqual, setCanClearFilter]);

  const handleGreaterThanClick = useCallback(() => {
      setLevelLessThanEqual(false);
      setLevelEqual(false);
      setLevelGreaterThanEqual(true);
      setCanClearFilter(true);
  }, [setLevelLessThanEqual, setLevelEqual, setLevelGreaterThanEqual, setCanClearFilter]);

  const handleSliderChange = useCallback((newValue: number[]) => {
    setLevelFilter(newValue[0])
    setListCurrentPage(1);
    setGalleryCurrentPage(1);
    setCanClearFilter(newValue[0] !== null);
  }, [setLevelEqual, setListCurrentPage, setGalleryCurrentPage, setCanClearFilter]);

  return (
    <div className="flex w-[94%] my-2 justify-between">
      <div className="flex w-fit text-[hsl(var(--text))]">
        <button className={`${levelLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tl-lg rounded-bl-lg`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual} className="fa-xs"/></button>
        <button className={`${levelEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals} className="fa-xs"/></button>
        <button className={`${levelGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tr-lg rounded-br-lg`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual} className="fa-xs"/></button>
      </div>
      <Slider
        value={[levelFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-[50%] mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">
        {levelFilter ?? 1}
      </span>
    </div>
  )
}
