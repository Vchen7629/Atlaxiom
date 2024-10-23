import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cardsearch from '../buttons/searchbar'
import Banlist from '../buttons/banlist'
import Mycards from '../buttons/my-cards'
import Login from '../buttons/login'
import "./styling/header.css"
import Signup from '../buttons/signup'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'    
import Mydecks from '../buttons/my-decks'
import Profile from '../buttons/profile'

const Header = () => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const isAuthenticated = useSelector((state) => state.auth.token !== null);

    useEffect(() => {
        console.log('isSuccess:', isSuccess);
        console.log('isError:', isError);
        if (isSuccess && !isError) navigate('/')
    }, [isSuccess, isError, navigate])


    const renderCardSearchButton = () => {
        return <Cardsearch />;
    }

    const renderHomepageButton = () => {
        if (isAuthenticated) {
            navigate('/loggedin')
        } else {
            navigate('/')
        }
    }

    const renderAuthButtons = () => {
        if (isLoading) return <p>Logging Out...</p>;
    
        if (isError) {
            console.error('Logout Error:', error);
            return <p>Error: {error.data?.message}</p>;
        }

        if (isAuthenticated) {
          return (
            <ul className={`Menu-container-right ${showDropdown ? "hidden" : ''}`}>
                <li><Mydecks/></li>
                <li><Mycards/> </li>
                <li><Profile/></li>
                <li>
                    <button
                    className="logout-button"
                    title="Logout"
                    onClick={sendLogout}
                    >
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                    </button>
                </li>
            </ul>
          );
        }
        
        return (
            <>
                <ul className={`Menu-container-right ${showDropdown ? "hidden" : ''}`}>
                    <li><Login /></li>
                    <li><Signup /></li>
                </ul>
            </>
        );
      };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const content = (
        <header className={`header`}>
            <ul className={`Menu-container-left ${showDropdown ? "hidden" : ''}`}>
                <li><Banlist/> </li>
                <li>{renderCardSearchButton()}</li>
            </ul>
            <div>
                <button 
                    className={`website-title ${showDropdown ? "hidden" : ''}`}
                    onClick={renderHomepageButton}
                >
                    <strong>Dragon Nexus</strong>
                </button>
            </div>
            {renderAuthButtons()}

            {/* Responsive dropdown button for screens less than or equal to 768px*/}
            <div className={`dropdown-btn ${showDropdown ? 'active' : ''}`} onClick={toggleDropdown}>
                ☰
            </div>

            {showDropdown && (
                <div className="dropdown">
                <Link to="/search">Card Search</Link>
                <Link to="/banlist">Banlist</Link>
                <Link to="/my-cards">My Cards</Link>
                <Link to="/about-us">Login</Link>
                </div>
            )}
        </header>
    )

    return content
}

export default Header