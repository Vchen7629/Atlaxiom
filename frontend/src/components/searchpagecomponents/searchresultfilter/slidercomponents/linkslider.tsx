import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { LinkSliderProps } from "../../types/searchfiltercomptypes"

export function LinkSliderComponent({ linkSliderProps, className, ...props }: LinkSliderProps) {
  const {
    linkFilter, setLinkFilter,
    setCanClearFilters
  } = linkSliderProps
  
    function handleSliderChange(newValue: number[]) {
      setLinkFilter(newValue[0])
      setCanClearFilters(newValue[0] !== null);
    }
  
    return (
      <div className="flex w-full">
        <Slider
          value={[linkFilter ?? 1]}
          onValueChange={handleSliderChange}
          defaultValue={[1]}
          max={6}
          step={1}
          className={cn("w-full mr-2", className)}
          {...props}
        />
        <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">{linkFilter ?? 1}</span>
      </div>
    )
}