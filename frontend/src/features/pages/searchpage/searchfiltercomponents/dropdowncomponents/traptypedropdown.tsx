"use client"
 
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { trapDropDown } from "../../types/searchfiltercomptypes"
 
const TrapTypes = [
  {
    trapType: "normal",
    label: "normal",
  },
  {
    trapType: "continuous",
    label: "continuous",
  },
  {
    trapType: "counter",
    label: "counter",
  },
];

 
export function TrapTypeDropDownComponent({ trapdropdownprops }: trapDropDown) {
  const [open, setOpen] = React.useState(false)
  const {
    setMonsterType,
    setSpellType,
    trapType,
    setTrapType,
  } = trapdropdownprops

  const handleClick = (newValue: string) => {
    setMonsterType("");
    setSpellType("");
    setTrapType(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[11vw] h-8 bg-transparent border-transparent text-[hsl(var(--text))] justify-between"
        >
            {trapType ? (
                <span className={`flex relative items-center left-6 justify-between w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-sm`}>
                    {TrapTypes.find((type) => type.trapType === trapType)?.label}
                </span>
            ) : (
              <span className={`flex relative items-center left-1/5 justify-between w-full px-2 py-1 bg-transparent rounded text-sm`}>
                  Select Trap Type...
              </span>
            )}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11vw] p-0 relative top-[-42px]">
        <Command>
          <CommandInput placeholder="Search trap types..." className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>Inputed Trap Type doesn't exist.</CommandEmpty>
            <CommandGroup>
              {TrapTypes.map((type) => (
                <CommandItem
                  key={type.trapType}
                  value={type.trapType}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {
                    const newValue = currentValue === trapType ? "" : currentValue;
                    handleClick(newValue);
                    setOpen(false)
                  }}
                > 
                 
                  {type.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))] ",
                      trapType === type.trapType ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}