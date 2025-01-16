import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { LevelSliderProps } from "../../types/searchfiltercomptypes"

export function LevelSliderComponent({ levelSliderProps, className, ...props }: LevelSliderProps) {
  const {
    levelFilter,
    setLevelFilter,
    setCanClearFilters
  } = levelSliderProps

  const handleSliderChange = (newValue: number[]) => {
    setLevelFilter(newValue[0]);
    setCanClearFilters(newValue[0] !== null);
  };  

  return (
    <div className="flex w-full">
      <Slider
        value={[levelFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-full mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-footer text-goldenrod">
        {levelFilter ?? 1}
      </span>
    </div>
  )
}
