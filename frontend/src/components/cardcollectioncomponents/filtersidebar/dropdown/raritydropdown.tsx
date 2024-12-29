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
import { RarityDropDownProps } from "../../types/dropdowntypes"
 
export function RarityDropDownComponent({ rarityprops }: RarityDropDownProps) {
  const {
    uniqueRarity,
    rarityFilter, setRarityFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
  } = rarityprops

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
            {rarityFilter ? (
                <span className={`flex relative items-center left-1/4 justify-between w-fit px-2 py-1 bg-[hsl(var(--background3))] text-white rounded text-sm`}>
                    {uniqueRarity.find((rarity) => rarity === rarityFilter) }
                </span>
            ): (
              <span className={`flex relative items-center left-1/5 justify-between w-fit px-2 py-1 bg-transparent rounded text-sm`}>
                  Select Rarity...
              </span>
            )}
         <CaretSortIcon className="min-h-6 min-w-6 shrink-0 text-[hsl(var(--text))]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0 relative top-[-42px]">
        <Command className="text-[hsl(var(--text))]">
          <CommandInput placeholder="Search Card Rarities..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Card Rarity found.</CommandEmpty>
            <CommandGroup>
              {uniqueRarity.map((rarity) => (
                <CommandItem
                  key={rarity}
                  value={rarity}
                  className="text-[hsl(var(--text))] bg-transparent"
                  onSelect={(currentValue) => {
                    setRarityFilter(currentValue === rarityFilter ? "" : currentValue);
                    setOpen(false);
                    setListCurrentPage(1);
                    setGalleryCurrentPage(1);
                  }}
                > 
                 
                  {rarity}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))]",
                      rarityFilter === rarity ? "opacity-100" : "opacity-0"
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