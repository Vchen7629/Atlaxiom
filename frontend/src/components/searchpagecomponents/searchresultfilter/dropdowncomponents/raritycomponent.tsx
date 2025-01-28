

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
 
const Rarity = [
  {
    value: "normal monster",
    label: "normal monster",
  },
  {
    value: "effect monster",
    label: "effect monster",
  },
  {
    value: "ritual monster",
    label: "ritual monster",
  },
  {
    value: "fusion monster",
    label: "fusion monster",
  },
  {
    value: "synchro monster",
    label: "synchro monster",
  },
  {
    value: "xyz monster",
    label: "xyz monster",
  },
  {
    value: "pendulum monster",
    label: "pendulum monster",
  },
  {
    value: "link monster",
    label: "link monster",
  },
  {
    value: "tuner monster",
    label: "tuner monster",
  },
  {
    value: "flip monster",
    label: "flip monster",
  },
  {
    value: "toon monster",
    label: "toon monster",
  },
  {
    value: "spirit monster",
    label: "spirit monster",
  },
  {
    value: "union monster",
    label: "union monster",
  },
  {
    value: "gemini monster",
    label: "gemini monster",
  },
  {
    value: "token monster",
    label: "token monster",
  },
];

 
export function RarityDropDownComponent() {
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
                <span className="flex relative items-center left-2 justify-between w-full px-2 py-1 bg-blue-500 text-white rounded text-sm">
                    {Rarity.find((types) => types.value === value)?.label}
                </span>
            ) : (
              <span className="flex relative items-center left-1/5 justify-between w-full px-2 py-1 bg-transparent text-white rounded text-sm">
                  Select Rarity...
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
              {Rarity.map((types) => (
                <CommandItem
                  key={types.value}
                  value={types.value}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
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