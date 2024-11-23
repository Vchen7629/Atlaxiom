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
 
export function ArchetypeDropDownComponent({ archetypes, archeTypeFilter, setArcheTypeFilter }) {
  const [open, setOpen] = React.useState(false)
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[15vw] bg-transparent border-transparent hover:text-gold hover:bg-transparent justify-between"
        >
          {archeTypeFilter ? (
            <span className={`flex relative items-center left-1/4 justify-between w-fit px-2 py-1 bg-blue-500 text-white rounded text-sm`}>
              {archetypes.find((archetype) => archetype == archeTypeFilter)}
            </span>
          ) : (
            <span className={`flex relative items-center left-1/5 justify-between w-fit px-2 py-1 bg-transparent text-white rounded text-sm`}>
                Select Card Archetype...
            </span>
          )}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0">
        <Command className="bg-blackone text-white ">
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {archetypes.map((archetype) => (
                <CommandItem
                  key={archetype}
                  value={archetype}
                  className="text-white"
                  onSelect={(currentValue) => {
                    setArcheTypeFilter(currentValue === archeTypeFilter ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {archetype}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-white",
                      archeTypeFilter === archetype ? "opacity-100" : "opacity-0"
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