import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSelector } from "react-redux";
import { UsernameState } from "../accounttypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import Profile from "../dropdownmenubuttons/profile";
import CardSearch from "../dropdownmenubuttons/cardsearch";
import Mycards from "../dropdownmenubuttons/collections";
import MyDecks from "../dropdownmenubuttons/decks";
import Logout from "../dropdownmenubuttons/logout";
 
export function LoggedInDropdownMenu() {
    const cachedUsername = useSelector((state: UsernameState) => state.auth.username);
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="cardcollection" className="flex bg-[hsl(var(--profile))]  outline-none max-w-[30vw] items-center justify-between rounded-xl lg:rounded-xl shadow-md text-[hsl(var(--background3))]  border-2 border-[hsl(var(--background3))]" >
                    <FontAwesomeIcon icon={faUser}/>
                        <div className="fatextmargin w-full overflow-auto font-bold mx-2 text-xs lg:text-lg">
                            {cachedUsername}
                        </div>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="py-2 px-[4vw] mt-2 md:px-[1.5vw] border-2 border-[hsl(var(--background3))] text-[hsl(var(--background3))] flex flex-col space-y-2 h-fit bg-[hsl(var(--header))] rounded-2xl">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="focus:bg-transparent ">
                        <Profile/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-transparent">
                        <CardSearch/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-transparent">
                        <Mycards/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-transparent">
                        <MyDecks/>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-transparent">
                        <Logout/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}