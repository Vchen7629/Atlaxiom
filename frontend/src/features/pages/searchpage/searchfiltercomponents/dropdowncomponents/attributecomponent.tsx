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
import { attributeDropDown } from "../../types/searchfiltercomptypes"
 
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
  const [open, setOpen] = React.useState(false)
  const {
    attributeType,
    setAttributeType,
  } = attributedropdownprops

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[11vw] h-8 bg-transparent border-transparent text-[hsl(var(--text))] justify-between"
        >
            {attributeType ? (
                <span className={`flex relative items-center left-8 w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-sm`}>
                    {Attributes.find((type) => type.attributeType === attributeType)?.label}
                </span>
            ) : (
              <span className={`flex relative items-center left-1/5 justify-between w-full px-2 py-1 bg-transparent rounded text-sm`}>
                  Select Attribute...
              </span>
            )}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0 ml-[1vw]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11vw] p-0 relative top-[-42px]">
        <Command>
          <CommandInput placeholder="Search attributes..." className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>Inputed attribute doesn't exist.</CommandEmpty>
            <CommandGroup>
              {Attributes.map((type) => (
                <CommandItem
                  key={type.attributeType}
                  value={type.attributeType}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {
                    const newValue = currentValue === attributeType ? "" : currentValue
                    setAttributeType(newValue)
                    setOpen(false)
                  }}
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