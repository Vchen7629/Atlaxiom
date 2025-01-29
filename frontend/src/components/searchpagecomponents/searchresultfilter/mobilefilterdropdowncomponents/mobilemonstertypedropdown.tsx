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
import { monsterDropDown } from "../../types/searchfiltercomptypes"
 
const MonsterTypes = [
  {
    monsterType: "normal monster",
    label: "normal monster",
  },
  {
    monsterType: "effect monster",
    label: "effect monster",
  },
  {
    monsterType: "ritual monster",
    label: "ritual monster",
  },
  {
    monsterType: "fusion monster",
    label: "fusion monster",
  },
  {
    monsterType: "synchro monster",
    label: "synchro monster",
  },
  {
    monsterType: "xyz monster",
    label: "xyz monster",
  },
  {
    monsterType: "pendulum monster",
    label: "pendulum monster",
  },
  {
    monsterType: "link monster",
    label: "link monster",
  },
  {
    monsterType: "tuner monster",
    label: "tuner monster",
  },
  {
    monsterType: "flip monster",
    label: "flip monster",
  },
  {
    monsterType: "toon monster",
    label: "toon monster",
  },
  {
    monsterType: "spirit monster",
    label: "spirit monster",
  },
  {
    monsterType: "union monster",
    label: "union monster",
  },
  {
    monsterType: "gemini monster",
    label: "gemini monster",
  },
  {
    monsterType: "token monster",
    label: "token monster",
  },
];

 
export function MobileMonsterTypeDropDownComponent({ monsterdropdownprops }: monsterDropDown) {
  const {
    setCanClearFilters,
    monsterType, setMonsterType,
    setSpellType,
    setTrapType,
  } = monsterdropdownprops

  const [open, setOpen] = React.useState(false)

  const handleClick = (newValue: string) => {
    setMonsterType(newValue)
    setSpellType("")
    setTrapType("")
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
          className="w-[50vw] h-8 bg-transparent border-transparent text-[hsl(var(--text))] justify-between"
        >
          <div className="flex w-full items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {monsterType ? (
              <div className="flex w-full justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                    {MonsterTypes.find((type) => type.monsterType === monsterType)?.label}
                </span>
              </div>
            ) : (
              <span className="flex items-center text-xs w-full py-1 bg-transparent">
                  Select Monster Type...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[50vw] p-0 relative top-[-42px]">
        <Command>
          <CommandInput placeholder="Filter by Monster Types" className="h-9" />
          <CommandList className="max-h-[30vh] overflow-y-auto">
            <CommandEmpty>Inputed monster type doesn&apos;t exist.</CommandEmpty>
            <CommandGroup>
              {MonsterTypes.map((type) => (
                <CommandItem
                  key={type.monsterType}
                  value={type.monsterType}
                  className="text-[hsl(var(--text))] "
                  onSelect={(currentValue) => {
                    const newValue = currentValue === monsterType ? "" : currentValue;
                    handleClick(newValue);
                    setOpen(false)
                  }}
                > 
                 
                  {type.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-[hsl(var(--text))] ",
                      monsterType === type.monsterType ? "opacity-100" : "opacity-0"
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