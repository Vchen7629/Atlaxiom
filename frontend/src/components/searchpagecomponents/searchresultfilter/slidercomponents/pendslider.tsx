import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { PendSliderProps } from "../../types/searchfiltercomptypes"

export function PendSliderComponent({ pendSliderProps, className, ...props }: PendSliderProps) {
  const {
    pendFilter, setPendFilter,
    setCanClearFilters
  } = pendSliderProps

  function handleSliderChange(newValue: number[]) {
    setPendFilter(newValue[0])
    setCanClearFilters(newValue[0] !== null);
  }

  return (
    <div className="flex w-full">
      <Slider
        value={[pendFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-full mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">{pendFilter ?? 1}</span>
    </div>
  )
}