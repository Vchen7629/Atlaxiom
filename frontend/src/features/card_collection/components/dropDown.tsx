"use client"
 
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
 
import { Button } from "@/shared/ui/button"
import {
  Command,
  CommandGroup,
  CommandEmpty,
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
import { DropDownProps } from "@/shared/types/cardSearchFilter"
 
export function DropDownComponent<T>({ value, setValue, items, onSelectOptional, type }:  DropDownProps<T>) {
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
          className="w-[15vw] border-2 border-gray-300 dark:border-gray-600  text-[hsl(var(--text))] justify-between"
        >
          <div className="flex w-[15vw] items-center justify-center text-sm hover:text-[hsl(var(--background3))]">
            {value ? (
              <div className="flex w-[12vw] justify-center">
                <span className="w-fit px-2 py-1 bg-[hsl(var(--background3))] rounded text-[hsl(var(--text))]">
                    {items.find((item) => item.value === value)?.label}
                </span>
              </div>
            ) : (
              <span className="flex items-center w-full px-2 py-1 bg-transparent">
                  Select a {type} type...
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