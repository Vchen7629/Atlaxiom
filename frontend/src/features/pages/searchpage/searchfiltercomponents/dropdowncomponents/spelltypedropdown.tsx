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
import { SetSpellProp } from "../../types/searchfiltercomptypes"
 
const SpellTypes = [
  {
    value: "normal",
    label: "normal",
  },
  {
    value: "continuous",
    label: "continuous",
  },
  {
    value: "field",
    label: "field",
  },
  {
    value: "equip",
    label: "equip",
  },
  {
    value: "quick-play",
    label: "quick-play",
  },
  {
    value: "ritual",
    label: "ritual",
  },
];

 
export function SpellTypeDropDownComponent({ setSpellType }: SetSpellProp) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[11vw] h-8 bg-transparent border-transparent text-base  justify-between"
        >
            {value ? (
                <span className={`flex relative items-center left-2 justify-center w-full px-2 py-1 bg-blue-500 text-white rounded text-sm`}>
                    {SpellTypes.find((types) => types.value === value)?.label}
                </span>
            ) : (
              <span className={`flex relative items-center left-1/5 justify-between w-full px-2 py-1 bg-transparent text-white rounded text-sm`}>
                  Select Spell Type...
              </span>
            )}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11vw] p-0 relative top-[-42px]">
        <Command className="text-white ">
          <CommandInput placeholder="Search Card Subtypes..." className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No Card Subtype found.</CommandEmpty>
            <CommandGroup>
              {SpellTypes.map((types) => (
                <CommandItem
                  key={types.value}
                  value={types.value}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue)
                    setSpellType(newValue)
                    setOpen(false)
                  }}
                > 
                 
                  {types.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))] ",
                      value === types.value ? "opacity-100" : "opacity-0"
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