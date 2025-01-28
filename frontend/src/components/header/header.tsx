import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cardsearch from './headerbuttons/searchbar.tsx'
import Mycards from './headerbuttons/my-cards.tsx'
import Login from './headerbuttons/login.tsx'
import Mydecks from './headerbuttons/my-decks.tsx'
import Accountsbutton from '../accountbuttons/navbuttons/account.js'
import { ModeToggle } from "../shadcn_components/darklightmode/mode-toggle.tsx"
import { AuthenticationState } from './types/headertypes.ts'
import Signup from './headerbuttons/signup.tsx'

const Header = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

    const handleHomeClick = () => {
        if (isAuthenticated) {
            navigate("/loggedin")
        } else {
            navigate("/")
        }
    };

    const pages = [
        "login", "Signup"
    ]

    const renderAuthButtons = () => {   
        if (isAuthenticated) {
          return (
            <div className="flex justify-center items-center xs:hidden lg:flex py-2.5 lg:mr-2.5">
                <div className=''><Accountsbutton/></div>
            </div>
        );
    }

    const handlePageNav = (value: string) => {
        if (value === "login") {
            navigate("/login")
        } else if (value === "Signup") {
            navigate("/signup")
        } else {
            navigate("/")
        }
    }
        
        return (
            <div className='flex h-full space-x-[1vw] md:mr-[2vw]'>
                <select 
                    value="menu"
                    className="appearance-none text-end outline-none text-2xl flex bg-transparent text-[hsl(var(--background3))] md:hidden " 
                    onChange={(e) => handlePageNav(e.target.value)}
                >
                    <option value="menu" disabled hidden>☰</option>
                    {pages.map((page) => (
                        <option key={page} value={page} className='h-[30vh] p-4 bg-[hsl(var(--header))] border-2 border-[hsl(var(--background3))] text-lg flex justify-start'>
                            {page}
                        </option>
                    ))}
                </select>
                <a className="hidden md:flex" href="/signup"><Signup/></a>
                <a className="hidden md:flex" href="/login"><Login/></a>
            </div>
        );
      };

    return (
        <header className="fixed justify-between items-center z-50 top-0 left-0 w-full flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 backdrop-blur-md backdrop-brightness-150 px-2.5">
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