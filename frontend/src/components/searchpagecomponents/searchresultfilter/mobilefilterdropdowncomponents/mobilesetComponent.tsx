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
import { SetDropDown } from "../../types/componenttypes"
import { useState } from "react"

export function MobileSetDropDownComponent({ setfilterprops }: SetDropDown) {
  const {
    setCanClearFilters,
    setName,
    setSetName,
    uniqueSetNames
  } = setfilterprops

  const [open, setOpen] = useState(false)

  const handleClick = (newValue: string) => {
    setSetName(newValue)
    if (newValue) {
      setCanClearFilters(true)
    }
  }
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[50vw] h-8 bg-transparent border-transparent text-base  justify-between"
        >
          <div className="flex w-[50vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {setName ? (
              <div className="flex w-full justify-center">
                <span className="max-w-[8vw] h-fit text-wrap px-2 py-1 bg-[hsl(var(--background3))] rounded text-[10px] text-[hsl(var(--text))]">
                    {uniqueSetNames.find((setNames) => setNames === setName)}
                </span>
              </div>
            ) : (
              <span className="flex items-center text-[hsl(var(--text))] text-xs w-full px-2 py-1 bg-transparent">
                  Select Set...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0 text-white" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[50vw] p-0 relative top-[-42px]">
        <Command className="text-white ">
          <CommandInput placeholder="Search Card Subtypes..." className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No Card Set found.</CommandEmpty>
            <CommandGroup>
              {uniqueSetNames.map((setNames) => (
                <CommandItem
                  key={setNames}
                  value={setNames}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {
                    const newSet = (currentValue === setName ? "" : currentValue)
                    handleClick(newSet)
                    setOpen(false)
                  }}
                > 
                  {setNames}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))] ",
                      setName === setNames ? "opacity-100" : "opacity-0"
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