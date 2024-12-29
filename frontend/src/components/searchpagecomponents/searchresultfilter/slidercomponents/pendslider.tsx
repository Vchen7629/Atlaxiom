import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { PendSliderProps } from "@/components/cardcollectioncomponents/types/dropdowntypes"

export function PendSliderComponent({ setPendFilter, className, ...props }: PendSliderProps) {
  const [value, setValue] = useState([1])

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue)
    setPendFilter(newValue[0])
  }

  return (
    <div className="flex w-full">
      <Slider
        value={value}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-full mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-footer text-goldenrod">{value[0]}</span>
    </div>
  )
}