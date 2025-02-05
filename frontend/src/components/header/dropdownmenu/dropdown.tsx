import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { faSearch, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { startTransition } from "react"
import { useNavigate } from "react-router-dom"
 
export function HeaderDropdown() {
    const navigate = useNavigate();

    function NavigateCardSearch() {
        startTransition(() => {
            navigate("/search")
            
        })
    }

    function NavigateLogin() {
        startTransition(() => {
            navigate("/login")
        })
    }

    function NavigateSignUp() {
        startTransition(() => {
            navigate("/signup")
        })
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="cardcollection" className="border-2 border-[hsl(var(--header))] text-2xl p-0 text-[hsl(var(--background3))]">☰</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[35vw] bg-[hsl(var(--header))] border-[hsl(var(--background3))]">
                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    NavigateCardSearch();
                }}>
                    <FontAwesomeIcon icon={faSearch}/>Card Search
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    NavigateLogin();
                }}>
                    <FontAwesomeIcon icon={faUser}/>Login
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    NavigateSignUp();
                }}>
                    <FontAwesomeIcon icon={faUserPlus}/>Signup
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}