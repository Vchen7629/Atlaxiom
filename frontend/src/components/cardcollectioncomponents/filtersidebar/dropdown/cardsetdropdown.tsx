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
import { CardSetDropDownProps } from "../../types/dropdowntypes"
import { useState } from "react"
 
export function CardSetDropDownComponent({ setprops }: CardSetDropDownProps) {
  const {
    uniqueSet,
    setFilter, setSetFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
    setCanClearFilter
  } = setprops

  const [open, setOpen] = useState(false)

  function handleClick(newValue: string) {
    setSetFilter(newValue)
    setListCurrentPage(1);
    setGalleryCurrentPage(1);
    setOpen(false);
    if (newValue) {
      setCanClearFilter(true)
    } else {
      setCanClearFilter(false);
    }
  }
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[15vw] border-2 border-gray-300 dark:border-gray-600  text-[hsl(var(--text))] justify-between"
        >
          <div className="flex w-[15vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {setFilter ? (
              <div className="flex w-full items-center justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                    {uniqueSet.find((sets) => sets === setFilter) }
                </span>
              </div>
            ) : (
              <span className="flex items-center w-full px-2 py-1 bg-transparent">
                  Select Card Set...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
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
                  onSelect={(currentValue) => {handleClick(currentValue === setFilter ? "" : currentValue)}}
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