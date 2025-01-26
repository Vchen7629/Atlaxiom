import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cardsearch from './headerbuttons/searchbar.tsx'
import Mycards from './headerbuttons/my-cards.tsx'
import Login from './headerbuttons/login.tsx'
import Mydecks from './headerbuttons/my-decks.tsx'
import Accountsbutton from '../accountbuttons/navbuttons/account.js'
import { ModeToggle } from "../shadcn_components/darklightmode/mode-toggle.tsx"
import { AuthenticationState } from './types/headertypes.ts'
import Logout from '../accountbuttons/navbuttons/logout.tsx'
import MyDecks from '../accountbuttons/navbuttons/decks.tsx'
import Signup from './headerbuttons/signup.tsx'

const Header = () => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const isAuthenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

    const handleHomeClick = () => {
        if (isAuthenticated) {
            navigate("/loggedin")
        } else {
            navigate("/")
        }
    };

    const renderAuthButtons = () => {   
        if (isAuthenticated) {
          return (
            <div className={`flex justify-center items-center xs:hidden lg:flex py-2.5 lg:mr-2.5 ${showDropdown ? "hidden" : ''}`}>
                <div className=''><Accountsbutton/></div>
            </div>
          );
        }
        
        return (
            <div className='flex h-full space-x-[2vw] md:mr-[2vw]'>
                <a className={`flex text-[hsl(var(--background3))] md:hidden text-3xl cursor-pointer ${showDropdown ? 'active' : ''}`} onClick={toggleDropdown}>
                    ☰
                </a>
                <a className="hidden md:flex"><Signup/></a>
                <a className="hidden md:flex"><Login/></a>
            </div>
        );
      };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="fixed justify-between items-center z-50 top-0 left-0 w-full flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 backdrop-blur-md backdrop-brightness-150 px-2.5">
            <div className={`w-fit flex py-2.5 ml-2.5 ${showDropdown ? "hidden" : ''}`}>
                <div className='w-fit flex'>
                    <div className="mr-[1vw] hidden sm:hidden md:flex"><Cardsearch/></div>
                </div>
                {isAuthenticated && (
                    <div className="flex w-fit ">
                        <div className="mr-[1vw] hidden sm:hidden md:flex"><Mycards/></div>
                        <div className="ml-[1vw] hidden sm:hidden md:flex"><Mydecks/></div>
                    </div>
                )}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <button className={`text-[hsl(var(--background3))] bg-transparent font-black text-xl md:text-4xl`} onClick={handleHomeClick}>
                    Atlaxiom
                </button>
            </div>
            <div className='flex w-fit justify-between items-center space-x-[1vw]'>
                <div className="absolute left-2 md:relative"><ModeToggle/></div>
                <div className='w-fit flex'>{renderAuthButtons()}</div>
            </div>

            {showDropdown && isAuthenticated ? (
                <div className={`bg-[hsl(var(--editdeckdraganddropbackground))] rounded-md space-y-[1vh] items-center absolute right-0 h-fit px-2 py-3 mt-[35vh] z-10 ${showDropdown ? 'flex flex-col' : 'hidden'}`}>
                    <Cardsearch />
                    <Mycards />
                    <MyDecks/>
                    <Logout />
                </div>
            ) : (
                <div className={`bg-[hsl(var(--editdeckdraganddropbackground))] rounded-md space-y-[1vh] items-center absolute right-0 h-fit px-2 py-3 mt-40 z-10 ${showDropdown ? 'flex flex-col' : 'hidden'}`}>
                    <Cardsearch />
                    <Login />
                </div>
            )}
        </header>
    )
}

export default Header