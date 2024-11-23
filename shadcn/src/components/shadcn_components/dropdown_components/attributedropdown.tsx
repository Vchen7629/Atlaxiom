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
 
const Attributes = [
  {
    value: "Dark",
    label: "Dark",
  },
  {
    value: "Divine",
    label: "Divine",
  },
  {
    value: "Earth",
    label: "Earth",
  },
  {
    value: "Fire",
    label: "Fire",
  },
  {
    value: "Light",
    label: "Light",
  },
  {
    value: "Water",
    label: "Water",
  },
  {
    value: "Wind",
    label: "Wind",
  }
]
 
export function AttributeDropDownComponent() {
  const [open, setOpen] = React.useState(false)
  const [attributeValue, setAttributeValue] = React.useState("")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[15vw] bg-transparent border-transparent hover:text-gold hover:bg-transparent justify-between"
        >
          {attributeValue ? (
            <span className={`flex relative items-center left-1/4 justify-between w-fit px-2 py-1 bg-blue-500 text-white rounded text-sm`}>
              {Attributes.find((Attributes) => Attributes.value === attributeValue)?.label}
            </span>
          ) : (
            <span className={`flex relative items-center left-1/5 justify-between w-fit px-2 py-1 bg-transparent text-white rounded text-sm`}>
                Select Card Subtype...
            </span>
          )}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0">
        <Command className="bg-blackone text-white ">
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Attribute found.</CommandEmpty>
            <CommandGroup>
              {Attributes.map((Attributes) => (
                <CommandItem
                  key={Attributes.value}
                  value={Attributes.value}
                  className="text-white"
                  onSelect={(currentValue) => {
                    setAttributeValue(currentValue === attributeValue ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {Attributes.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-white",
                      attributeValue === Attributes.value ? "opacity-100" : "opacity-0"
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