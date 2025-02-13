"use client"
 
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
import { MonsterTypeDropDownProps } from "../../types/dropdowntypes"
import { useState } from "react"
 
export function MonsterTypeDropDownComponent({ monstertypeprops }: MonsterTypeDropDownProps) {
  const {
    uniqueMonsterType,
    monsterTypeFilter, setMonsterTypeFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
    setCanClearFilter
  } = monstertypeprops 
  const [open, setOpen] = useState(false)

  function handleClick(newValue: string) {
    setMonsterTypeFilter(newValue)
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
            {monsterTypeFilter ? (
              <div className="flex w-[12vw] justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                    {uniqueMonsterType.find((monstertype) => monstertype === monsterTypeFilter) }
                </span>
              </div>
            ) : (
              <span className="flex items-center w-full px-2 py-1 bg-transparent">
                  Select Monster Type...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0 relative top-[-42px]">
        <Command className=" text-[hsl(var(--text))]">
          <CommandInput placeholder="Search Card Subtypes..." className="h-9" />
          <CommandList>
            <CommandEmpty>No monster cards found in collection.</CommandEmpty>
            <CommandGroup>
              {uniqueMonsterType.map((monstertype) => (
                <CommandItem
                  key={monstertype}
                  value={monstertype}
                  className="text-[hsl(var(--text))] bg-transparent"
                  onSelect={(currentValue) => {handleClick(currentValue === monsterTypeFilter ? '' : currentValue)}}
                > 
                 
                  {monstertype}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))]",
                      monsterTypeFilter === monstertype ? "opacity-100" : "opacity-0"
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