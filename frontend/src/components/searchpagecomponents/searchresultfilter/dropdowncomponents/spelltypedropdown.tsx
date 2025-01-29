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
import { spellDropDown } from "../../types/searchfiltercomptypes"
 
const SpellTypes = [
  {
    spellType: "normal",
    label: "normal",
  },
  {
    spellType: "continuous",
    label: "continuous",
  },
  {
    spellType: "field",
    label: "field",
  },
  {
    spellType: "equip",
    label: "equip",
  },
  {
    spellType: "quick-play",
    label: "quick-play",
  },
  {
    spellType: "ritual",
    label: "ritual",
  },
];

 
export function SpellTypeDropDownComponent({ spelldropdownprops }: spellDropDown ) {
  const [open, setOpen] = React.useState(false)
  const {
    setCanClearFilters,
    setMonsterType,
    spellType, setSpellType,
    setTrapType,
  } = spelldropdownprops

  const handleClick = (newValue: string) => {
    setMonsterType("");
    setSpellType(newValue);
    setTrapType("")
    if (newValue) {
      setCanClearFilters(true);
    }
  }
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="cardcollection"
          role="combobox"
          aria-expanded={open}
          className="w-[11vw] h-8 border-transparent text-[hsl(var(--text))] justify-between"
        >
          <div className="flex w-[11vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {spellType ? (
                <div className="flex w-[8.5vw] justify-center">
                    <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                      {SpellTypes.find((types) => types.spellType === spellType)?.label}
                    </span>
                </div>
            ) : (
              <span className="flex items-center text-xs w-[8.5vw] px-2 py-1 bg-transparent">
                  Select Spell Type...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[11vw] p-0 relative top-[-42px]">
        <Command>
          <CommandInput placeholder="Search Card Subtypes..." className="h-9" />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>Inputed spell type doesn&apos;t exist.</CommandEmpty>
            <CommandGroup>
              {SpellTypes.map((type) => (
                <CommandItem
                  key={type.spellType}
                  value={type.spellType}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {
                    const newValue = currentValue === spellType ? "" : currentValue;
                    handleClick(newValue);
                    setOpen(false)
                  }}
                > 
                 
                  {type.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))] ",
                      spellType === type.spellType ? "opacity-100" : "opacity-0"
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