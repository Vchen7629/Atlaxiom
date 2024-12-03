"use client"
 
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type SubTypeDropDownProps = {
  subtypes: string[];
  subTypeFilter: string;
  setSubTypeFilter: (filter: string) => void;
}
 
export function SubTypeDropDownComponent({ subtypes, subTypeFilter, setSubTypeFilter }: SubTypeDropDownProps) {
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
          {subTypeFilter ? (
            <span className={`flex relative items-center left-1/4 justify-between w-fit px-2 py-1 bg-[hsl(var(--background3))] text-white rounded text-sm`}>
                {subtypes.find((subtype) => subtype === subTypeFilter) }
            </span>
          ) : (
            <span className={`flex relative items-center left-1/5 justify-between w-fit px-2 py-1 bg-transparent rounded text-sm`}>
                Select Card Subtype...
            </span>
          )}
          
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0 text-[hsl(var(--text))]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0 relative top-[-42px]">
        <Command className=" text-white ">
          <CommandInput placeholder="Search Card Subtypes..." className="h-9" />
          <CommandList>
            <CommandEmpty>No subtypes found.</CommandEmpty>
            <CommandGroup>
              {subtypes.map((subtype) => (
                <CommandItem
                  key={subtype}
                  value={subtype}
                  className="text-[hsl(var(--text))] bg-transparent"
                  onSelect={(currentValue) => {
                    setSubTypeFilter(currentValue === subTypeFilter ? '' : currentValue);
                    setOpen(false);
                  }}
                > 
                 
                  {subtype}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))]",
                      subTypeFilter === subtype ? "opacity-100" : "opacity-0"
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