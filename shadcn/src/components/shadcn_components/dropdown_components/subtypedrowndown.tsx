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
 
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "yes",
    label: "test",
  },
]
 
export function SubTypeDropDownComponent() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[15vw] bg-transparent text-gold hover:text-gold hover:border-gold hover:bg-transparent justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Card Subtype..."}
          <CaretSortIcon className="min-h-6 min-w-6 shrink-0 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] p-0">
        <Command className="bg-blackone text-white ">
          <CommandInput placeholder="Search Card Subtypes..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Card Subtype found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-white"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                > 
                 
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-white",
                      value === framework.value ? "opacity-100" : "opacity-0"
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