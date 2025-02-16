import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cardsearch from '../../navigation/headerbuttons/searchbar.tsx'
import Mycards from '../../navigation/headerbuttons/my-cards.tsx'
import Login from '../../navigation/headerbuttons/login.tsx'
import Mydecks from '../../navigation/headerbuttons/my-decks.tsx'
import { ModeToggle } from "../shadcn_components/darklightmode/mode-toggle.tsx"
import Signup from '../../navigation/headerbuttons/signup.tsx'
import { startTransition } from 'react'
import { HeaderDropdown } from './dropdown.tsx'
import { LoggedInDropdownMenu } from '../accountbuttons/navbuttons/dropdownmenu.tsx'
import { UserIdState } from '@/pages/my-decks/deckpagetypes.ts'

const Header = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state: UserIdState) => state.auth.userId !== null);

    function handleHomeClick() {
        startTransition(() => {
            if (isAuthenticated) {
                navigate("/loggedin")
            } else {
                navigate("/")
            }
        })
    };

    function renderAuthButtons() {   
        if (isAuthenticated) {
          return (
            <div className="flex justify-center items-center xs:hidden lg:flex py-2.5 lg:mr-2.5">
                <div className=''><LoggedInDropdownMenu/></div>
            </div>
        );
    }
        
    return (
        <div className='flex h-full space-x-[1vw] md:mr-[2vw]'>
            <div className='flex md:hidden'><HeaderDropdown /></div>
            <a className="hidden md:flex" href="/signup"><Signup/></a>
            <a className="hidden md:flex" href="/login"><Login/></a>
        </div>
    )};

    return (
        <header className="fixed justify-between items-center z-50 top-0 left-0 w-full flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 backdrop-blur-md backdrop-brightness-150 px-2.5 shadow-md">
            <div className="w-fit flex py-2.5 ml-2.5">
                <div className='w-fit flex'>
                    <div className="mr-[1vw] hidden xl:flex"><Cardsearch/></div>
                </div>
                {isAuthenticated && (
                    <div className="flex w-fit ">
                        <div className="mr-[1vw] hidden xl:flex"><Mycards/></div>
                        <div className="hidden xl:flex"><Mydecks/></div>
                    </div>
                )}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <button className="text-[hsl(var(--background3))] bg-transparent font-black text-xl md:text-4xl" onClick={handleHomeClick}>
                    Atlaxiom
                </button>
            </div>
            <div className='flex w-fit justify-between items-center space-x-[1vw]'>
                <div className="absolute left-2 xl:relative"><ModeToggle/></div>
                <div className='w-fit flex'>{renderAuthButtons()}</div>
            </div>
        </header>
    )
}

export default Header