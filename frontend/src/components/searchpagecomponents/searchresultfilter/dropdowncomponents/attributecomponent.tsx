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
import { attributeDropDown } from "../../types/searchfiltercomptypes"
import { useState } from "react"
 
const Attributes = [
  {
    attributeType: "earth",
    label: "earth",
  },
  {
    attributeType: "wind",
    label: "wind",
  },
  {
    attributeType: "fire",
    label: "fire",
  },
  {
    attributeType: "water",
    label: "water",
  },
  {
    attributeType: "light",
    label: "light",
  },
  {
    attributeType: "dark",
    label: "dark",
  },
  {
    attributeType: "divine",
    label: "divine",
  },
];

 
export function AttributeDropDownComponent({ attributedropdownprops }: attributeDropDown) {
  const [open, setOpen] = useState(false)
  const { 
    setCanClearFilters,
    attributeType, setAttributeType 
  } = attributedropdownprops

  const handleClick = (newValue: string) => {
    setOpen(false)
    setAttributeType(newValue)
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
          className="w-[11vw] h-8 bg-transparent border-transparent text-[hsl(var(--text))] justify-between"
        >
          <div className="flex w-[11vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {attributeType ? (
              <div className="flex w-[8.5vw] justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                    {Attributes.find((type) => type.attributeType === attributeType)?.label}
                </span>
              </div>
            ) : (
              <span className="flex items-center text-xs w-[8.5vw] px-2 py-1 bg-transparent">
                  Select Attribute...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0"/>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11vw] p-0 relative top-[-42px]">
        <Command>
          <CommandInput placeholder="Search attributes..." className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>Inputed attribute doesn&apos;t exist.</CommandEmpty>
            <CommandGroup>
              {Attributes.map((type) => (
                <CommandItem
                  key={type.attributeType}
                  value={type.attributeType}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {handleClick(currentValue === attributeType ? "" : currentValue)}}
                > 
                  {type.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))] ",
                      attributeType === type.attributeType ? "opacity-100" : "opacity-0"
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