import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { LinkSliderProps } from "../../types/dropdowntypes"

export function LinkScaleSliderComponent({ linkprops, className, ...props }: LinkSliderProps) {
  const {
    setCanClearFilter,
    linkFilter, setLinkFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
  } = linkprops 

  const handleSliderChange = (newValue: number[]) => {
    setLinkFilter(newValue[0])
    setListCurrentPage(1);
    setGalleryCurrentPage(1);
    setCanClearFilter(newValue[0] !== null);
  }

  return (
    <div className="flex w-[94%]">
      <Slider
        value={[linkFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-full mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">
        {linkFilter ?? 1}
      </span>
    </div>
  )
}
