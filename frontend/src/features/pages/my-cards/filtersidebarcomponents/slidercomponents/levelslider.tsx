import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

type SliderProps = React.ComponentProps<typeof Slider>

export function LevelSliderComponent({ className, ...props }: SliderProps) {
  const [value, setValue] = useState([1])

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue)
  }

  return (
    <div className="flex w-[15vw]">
      <Slider
        value={value}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-3/4 mr-2", className)}
        {...props}
      />
      <span className="w-[12%] flex items-center justify-center rounded-lg border-2 border-gray-500">{value[0]}</span>
    </div>
  )
}
