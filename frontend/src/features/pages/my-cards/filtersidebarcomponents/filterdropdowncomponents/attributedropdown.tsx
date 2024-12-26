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
import { AttributeDropDownProps } from "../../types/dropdowntypes"
 
export function AttributeDropDownComponent({ attributes, attributeFilter, setAttributeFilter }: AttributeDropDownProps) {
  const [open, setOpen] = React.useState(false)
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[15vw] bg-transparent border-transparent text-[hsl(var(--text))] justify-between"
        >
          {attributeFilter ? (
            <span className={`flex relative items-center left-1/4 justify-between w-fit px-2 py-1 bg-[hsl(var(--background3))] text-white rounded text-sm`}>
              {attributes.find((attribute) => attribute === attributeFilter)}
            </span>
          ) : (
            <span className={`flex relative items-center left-1/5 justify-between w-fit px-2 py-1 bg-transparent rounded text-sm`}>
                Select Card Attribute...
            </span>
          )}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0 relative top-[-42px]">
        <Command className="text-[hsl(var(--text))]">
          <CommandInput placeholder="Search Card Attributes..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Attribute found.</CommandEmpty>
            <CommandGroup>
              {attributes.map((attribute) => (
                <CommandItem
                  key={attribute}
                  value={attribute}
                  className="text-[hsl(var(--text))] bg-transparent"
                  onSelect={(currentValue) => {
                    setAttributeFilter(currentValue === attributeFilter ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {attribute}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-white",
                      attributeFilter === attribute ? "opacity-100" : "opacity-0"
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