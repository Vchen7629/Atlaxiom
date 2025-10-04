import { cn } from "@/lib/utils"
import { Slider } from "@/shared/ui/slider"
import { sliderProps } from "@/shared/types/cardSearchFilter"


export function FilterSliderComponent({ SliderProps, className, ...props }: sliderProps) {
  const {
    valueFilter, setValueFilter,
    setCanClearFilters,
    minNumber,
    maxNumber,
  } = SliderProps

  function handleSliderChange(newValue: number[]) {
    setValueFilter(newValue[0])
    setCanClearFilters(newValue[0] !== null);
  }

  return (
    <div className="flex w-full">
      <Slider
        value={[valueFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={maxNumber}
        step={minNumber}
        className={cn("w-full mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">{valueFilter ?? 1}</span>
    </div>
  )
}