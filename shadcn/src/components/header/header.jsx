import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cardsearch from '../buttons/searchbar'
import Banlist from '../buttons/banlist'
import Mycards from '../buttons/my-cards'
import Login from '../buttons/login'
import Signup from '../buttons/signup'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'    
import Mydecks from '../buttons/my-decks'
import Accountsbutton from '../buttons/accountbuttons/account'
import { ModeToggle } from "../shadcn_components/darklightmode/mode-toggle"


const PROFILE_REGEX = /^\/profile(\/)?$/
const OWNEDCARDS_REGEX = /^\/dash\/ownedcards(\/)?$/
const USER_REGEX = /^\/dash\/users(\/)?$/


const Header = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [showDropdown, setShowDropdown] = useState(false);


    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const isAuthenticated = useSelector((state) => state.auth.token !== null);

    useEffect(() => {
        if (isSuccess && !isError) navigate('/')
    }, [isSuccess, isError, navigate])


    const renderAuthButtons = () => {   
        if (isError) {
            console.error('Logout Error:', error);
            return <p>Error: {error.data?.message}</p>;
        }

        if (isAuthenticated) {
          return (
            <div className={`flex justify-between items-center xs:hidden lg:flex py-2.5 mr-2.5 ${showDropdown ? "hidden" : ''}`}>
                <div className=''><Accountsbutton/></div>
            </div>
          );
        }
        
        return (
            <>
                <div className={`flex xs:hidden lg:flex py-2.5 mr-2.5 ${showDropdown ? "hidden" : ''}`}>
                    <div className='mr-4'><Signup /></div>
                    <div><Login /></div>
                </div>
            </>
        );
      };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="fixed justify-between items-center z-50 top-0 left-0 w-full flex text-white bg-[hsl(var(--header))] bg-opacity-60 backdrop-blur-md backdrop-brightness-150 px-2.5">
            <div className={`flex xs:hidden lg:flex py-2.5 ml-2.5 ${showDropdown ? "hidden" : ''}`}>
                <div><Banlist/> </div>
                <div><Cardsearch /></div>
                {isAuthenticated && (
                    <>
                    <Mycards/>
                    <Mydecks/>
                    </>
                )}
            </div>
            <div>
                <Link to="/">
                <div className={`text-goldenrod font-black bg-transparent text-4xl ${showDropdown ? "hidden" : ''}`}>
                    <h1>Atlaxiom</h1>
                </div>
                </Link>
            </div>
            <div className='flex w-[15%] justify-between items-center'>
                <ModeToggle/>
                <div className='w-fit'>{renderAuthButtons()}</div>
            </div>
            

            <div className={`relative xs:flex lg:hidden text-3xl cursor-pointer ${showDropdown ? 'active' : ''}`} onClick={toggleDropdown}>
                ☰
            </div>

            {showDropdown && (
                <div className={`items-center absolute right-0 h-12 mt-16 z-10 ${showDropdown ? 'flex' : 'hidden'}`}>
                    <a className="p-2.5 text-gold bg-blackone border-2 border-footer">
                        <Link to="/search">Card Search</Link>
                    </a>
                    <a className="p-2.5 text-gold border-r-2 border-y-2 border-footer">
                        <Link to="/banlist">Banlist</Link>
                    </a>
                    <a className="p-2.5 text-gold border-r-2 border-y-2 border-footer">
                        <Link to="/my-cards">My Cards</Link>
                    </a>
                    <a className="p-2.5 text-gold border-r-2 border-y-2 border-footer">
                        <Link to="/about-us">Login</Link>
                        </a>
                </div>
            )}
        </header>
    )
}

export default Header