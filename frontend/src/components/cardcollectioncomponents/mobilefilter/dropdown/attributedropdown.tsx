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
import { AttributeDropDownProps } from "../../types/dropdowntypes"
import { useCallback, useState } from "react"
 
export function AttributeDropDownComponent({ attributeprops }: AttributeDropDownProps) {
  const {
    setCanClearFilter,
    uniqueAttribute,
    attributeFilter, setAttributeFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
  } = attributeprops

  const [open, setOpen] = useState(false)

  const handleClick = useCallback((newValue: string) => {
    setAttributeFilter(newValue)
    setListCurrentPage(1);
    setGalleryCurrentPage(1);
    setOpen(false);
    if (newValue) {
      setCanClearFilter(true)
    } else {
      setCanClearFilter(false);
    }
  }, [setAttributeFilter, setListCurrentPage, setGalleryCurrentPage, setOpen, setCanClearFilter, setCanClearFilter])
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[15vw] bg-transparent border-transparent text-[hsl(var(--text))] justify-between"
        >
          <div className="flex w-[15vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {attributeFilter ? (
              <div className="flex w-[12vw] justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                  {uniqueAttribute.find((attribute) => attribute === attributeFilter)}
                </span>
              </div>
            ) : (
              <span className="flex items-center w-full px-2 py-1 bg-transparent">
                  Select Card Attribute...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0 relative top-[-42px]">
        <Command className="text-[hsl(var(--text))]">
          <CommandInput placeholder="Search Card Attributes..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Attribute found.</CommandEmpty>
            <CommandGroup>
              {uniqueAttribute.map((attribute) => (
                <CommandItem
                  key={attribute}
                  value={attribute}
                  className="text-[hsl(var(--text))] bg-transparent"
                  onSelect={(currentValue) => {handleClick(currentValue === attributeFilter ? "" : currentValue)}}
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