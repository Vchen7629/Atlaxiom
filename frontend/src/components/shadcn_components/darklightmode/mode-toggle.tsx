import { Moon, Sun } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/shadcn_components/darklightmode/theme-provider"
 
export function ModeToggle() {
  const { setTheme } = useTheme()

  function DarkMode() {
    setTheme("dark")
  }

  function LightMode() {
    setTheme("light")
  }

  function System() {
    setTheme("system")
  }
 
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="cardcollection" className="border-2 border-[hsl(var(--border))] h-9 w-11 md:h-10 md:w-12 rounded-xl bg-[hsl(var(--background3))]">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[hsl(var(--background3))]">
        <DropdownMenuItem onClick={LightMode}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={DarkMode}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={System}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}