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

    let profileClass = null
    if (!PROFILE_REGEX.test(pathname) && !OWNEDCARDS_REGEX.test(pathname) && !USER_REGEX.test(pathname)) {
        profileClass = "profile-page-container"
    }

    const renderCardSearchButton = () => {
        return <Cardsearch />;
    }

    const renderAuthButtons = () => {   
        if (isError) {
            console.error('Logout Error:', error);
            return <p>Error: {error.data?.message}</p>;
        }

        if (isAuthenticated) {
          return (
            <div className={`flex w-[15%] justify-between items-center xs:hidden lg:flex py-2.5 mr-2.5 ${showDropdown ? "hidden" : ''}`}>
                <div><ModeToggle/></div>
                <div className='min-w-[40vw] ml-[10%]'><Accountsbutton/></div>
            </div>
          );
        }
        
        return (
            <>
                <ul className={`flex xs:hidden lg:flex py-2.5 mr-2.5 ${showDropdown ? "hidden" : ''}`}>
                    <li><Login /></li>
                    <li><Signup /></li>
                </ul>
            </>
        );
      };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className={`fixed z-50 top-0 left-0 w-full flex justify-between text-white bg-[hsl(var(--header))] bg-opacity-60 backdrop-blur-md backdrop-brightness-150 px-2.5  ${profileClass}`}>
            <ul className={`flex xs:hidden lg:flex py-2.5 ml-2.5 ${showDropdown ? "hidden" : ''}`}>
                <li><Banlist/> </li>
                <li>{renderCardSearchButton()}</li>
            </ul>
            <div>
                <Link to="/">
                <div className={`absolute text-goldenrod font-black left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] bg-transparent text-4xl ${showDropdown ? "hidden" : ''}`}>
                    <h1>Atlaxiom</h1>
                </div>
                </Link>
            </div>
            {renderAuthButtons()}

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