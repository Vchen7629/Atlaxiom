import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { LinkSliderProps } from "@/features/pages/my-cards/types/dropdowntypes"
import { useState } from "react"

export function LinkSliderComponent({ setLinkFilter, className, ...props }: LinkSliderProps) {
    const [value, setValue] = useState([1])
  
    const handleSliderChange = (newValue: number[]) => {
      setValue(newValue)
      setLinkFilter(newValue[0])
    }
  
    return (
      <div className="flex w-full">
        <Slider
          value={value}
          onValueChange={handleSliderChange}
          defaultValue={[1]}
          max={6}
          step={1}
          className={cn("w-full mr-2", className)}
          {...props}
        />
        <span className="px-2 flex items-center justify-center rounded-lg bg-footer text-goldenrod">{value[0]}</span>
      </div>
    )
}