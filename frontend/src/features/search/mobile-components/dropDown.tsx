"use client"
 
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
 
import { Button } from "@/shared/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover"
import { useState } from "react"
import { DropDownProps } from "../../../shared/types/cardSearchFilter"

export function MobileDropDown<T>({ value, setValue, items, onSelectOptional }: DropDownProps<T>) {
  const [open, setOpen] = useState(false)

  const handleClick = (newValue: T) => {
    setValue(newValue);
    onSelectOptional?.(newValue); 
    setOpen(false);
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
            {value ? (
              <div className="flex w-full justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                    {items.find((item) => item.value === value)?.label}
                </span>
              </div>
            ) : (
              <span className="flex items-center text-xs w-full py-1 bg-transparent">
                  Select an option...
              </span>
            )}
            <CaretSortIcon className="min-h-6 min-w-6 shrink-0" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[50vw] p-0 relative top-[-42px]">
        <Command>
          <CommandInput placeholder="Search types..." className="h-9" />
          <CommandList className="max-h-[30vh] overflow-y-auto">
            <CommandEmpty>Inputed option doesn&apos;t exist.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem key={String(item.value)} onSelect={() => handleClick(item.value)}>
                  {item.label}
                  {value === item.value && <CheckIcon />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}