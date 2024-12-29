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
import { CardSetDropDownProps } from "../../types/dropdowntypes"
 
export function CardSetDropDownComponent({ setprops }: CardSetDropDownProps) {
  const {
    uniqueSet,
    setFilter, setSetFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
  } = setprops
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
          {setFilter ? (
            <div className="flex w-full items-center justify-center">
              <span className={`flex items-center justify-between w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[12px]`}>
                  {uniqueSet.find((sets) => sets === setFilter) }
              </span>
            </div>
          ) : (
            <span className={`flex relative items-center justify-between w-[100%] px-2 py-1 bg-transparent rounded text-sm`}>
                Select Card Set...
            </span>
          )}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
        </Button>
        
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0 relative top-[-42px]">
        <Command className="text-[hsl(var(--text))]">
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Card Sets found.</CommandEmpty>
            <CommandGroup>
              {uniqueSet.map((sets) => (
                <CommandItem
                  key={sets}
                  value={sets}
                  className="text-[hsl(var(--text))] bg-transparent"
                  onSelect={(currentValue) => {
                    setSetFilter(currentValue === setFilter ? "" : currentValue);
                    setOpen(false);
                    setListCurrentPage(1);
                    setGalleryCurrentPage(1);
                  }}
                > 
                  {sets}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-white",
                      setFilter === sets ? "opacity-100" : "opacity-0"
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