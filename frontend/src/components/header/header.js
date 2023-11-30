import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Cardsearch from '../buttons/searchbar'
import Banlist from '../buttons/banlist'
import Mycards from '../buttons/my-cards'
import Login from '../buttons/login'
import "./header.css"
import Signup from '../buttons/signup'


const Header = () => {

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const content = (
        <header className="header">
            <ul className={`Menu-container-left ${showDropdown ? "hidden" : ''}`}>
                    <li>
                        <Banlist/> 
                    </li>
                    <li>
                        <Mycards/> 
                    </li>
                    <li>
                        <Cardsearch/> 
                    </li>
                </ul>
            <div>
                <Link to="/">
                <div className={`website-title ${showDropdown ? "hidden" : ''}`}>
                    <h1>DeckDatabaseOnline</h1>
                </div>
                </Link>
            </div>
            <ul className={`Menu-container-right ${showDropdown ? "hidden" : ''}`}>
                <li>
                    <Login/> 
                </li>
                <li>
                    <Signup/>
                </li>
            </ul>

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