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
import { SetDropDown } from "../../types/componenttypes"

export function SetDropDownComponent({ setfilterprops }: SetDropDown) {
  const {
    setName,
    setSetName,
    uniqueSetNames
  } = setfilterprops

  const [open, setOpen] = React.useState(false)
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[11vw] h-8 bg-transparent border-transparent text-base  justify-between"
        >
          <div className="flex w-[11vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {setName ? (
              <div className="flex w-[8.5vw] justify-center">
                <span className="max-w-[8vw] h-fit text-wrap px-2 py-1 bg-[hsl(var(--background3))] rounded text-[10px] text-[hsl(var(--text))]">
                    {uniqueSetNames.find((setNames) => setNames === setName)}
                </span>
              </div>
            ) : (
              <span className="flex items-center text-xs w-[8.5vw] px-2 py-1 bg-transparent">
                  Select Set...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11vw] p-0 relative top-[-42px]">
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
                    setSetName(currentValue === setName ? "" : currentValue)
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