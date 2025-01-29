"use client"
 
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
import { useState } from "react"
 
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
  const [open, setOpen] = useState(false)
  const {
    setCanClearFilters,
    setMonsterType,
    setSpellType,
    trapType, setTrapType,
  } = trapdropdownprops

  const handleClick = (newValue: string) => {
    setMonsterType("");
    setSpellType("");
    setTrapType(newValue)
    if (newValue) {
      setCanClearFilters(true)
    }
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
          <div className="flex w-[11vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {trapType ? (
              <div className="flex w-[8.5vw] justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                    {TrapTypes.find((type) => type.trapType === trapType)?.label}
                </span>
              </div>
            ) : (
              <span className="flex items-center text-xs w-[8.5vw] px-2 py-1 bg-transparent">
                  Select Trap Type...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11vw] p-0 relative top-[-42px]">
        <Command>
          <CommandInput placeholder="Search trap types..." className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>Inputed Trap Type doesn&apos;t exist.</CommandEmpty>
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