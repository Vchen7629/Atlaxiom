import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cardsearch from '../navigation/searchbar.tsx'
import { ModeToggle } from "../shadcn_components/mode-toggle.tsx"
import { startTransition } from 'react'
import { HeaderDropdown } from './dropdown.tsx'
import { LoggedInDropdownMenu } from './dropdownmenu.tsx'
import Signup from '../navigation/signup.tsx'
import Login from '../navigation/login.tsx'
import HeaderNavButton from '../navigation/headerButton.tsx'

const Header = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

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
            <Signup
                footer={false}
                header={true}
            />
            <Login
                footer={false}
                header={true}
            />
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
                        <div className="mr-[1vw] hidden xl:flex">
                            <HeaderNavButton
                                route={"/getcards"}
                                button_text={"collection"}
                            />                        
                        </div>
                        <div className="hidden xl:flex">
                            <HeaderNavButton
                                route={"/deckmanager"}
                                button_text={"My Decks"}
                            /> 
                        </div>
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