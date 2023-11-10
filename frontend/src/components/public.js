//import { Link } from 'react-router-dom'
import React from 'react';
import Cardsearch from './buttons/searchbar';
import Banlist from './buttons/banlist';
import Mycards from './buttons/my-cards';
import Aboutus from './buttons/about-us';
import Privacypolicy from './buttons/Privacypolicy';
import ContactInfo from './buttons/contactinfo';
import Home from './buttons/home';
import Login from './buttons/login';


const Public = () => {
   
    const content = (
        <section className="public">
            <header className="header">
                <ul className="Menu-container-left">
                    <li>
                        <Cardsearch/> {/*button component to redirect to /search endpoint */}
                    </li>
                    <li>
                        <Banlist/> {/*button component to redirect to /banlist endpoint*/}
                    </li>
                </ul>
                <div className="h1-container">
                    <h1>DeckDatabaseOnline</h1>
                </div>
                <ul className='Menu-container-right'>
                    <li>
                        <Mycards/> {/*button component to redirect to /my-cards endpoint*/}
                    </li>
                    <li>
                        <Aboutus/> {/*button component to redirect to /about-us endpoint*/}
                    </li>
                </ul>
            </header>
            <main>
                <div className="banner"></div>
            </main> 
            <section className="tech-circle">
                <div>
                    <h1 className= "h1titlebox">
                        Welcome to the My Deck Database website
                    </h1>
                </div>
            </section>
            <div className="homepage-card-container-one"> 
                <div className="Homepage-card">
                    <span className="underline-white"><strong>What is this website about</strong></span>
                    <p className="Homepage-cardstyle">
                        This website is a personal project that aims to act as a card catalog website that allows users to search for cards, log them as owned, and
                        have a sign-in feature that allows users to save their cards. 
                    </p>
                </div>
            </div>
            <h1 className= "h1titleboxtwo"> Features of the website</h1>
            <div className="homepage-card-container-two">
                <div className="Homepage-card">
                    <span className="underline-white"><strong>What is this website about</strong></span>
                    <p className="Homepage-cardstyle">
                        This website is a personal project that aims to act as a card catalog website that allows users to search for cards, log them as owned, and
                        have a sign-in feature that allows users to save their cards. 
                    </p>
                </div>

            </div>
            
            <footer>
                
                <div className="footer-container">
                    <p classname="copyright-container">&copy; 2023 DeckDatabaseOnline. All rights reserved.</p>   
                    <ul className="footer-links">
                        <li>
                            <Privacypolicy/> {/*button component to redirect to /privacy-policy endpoint */}
                        </li>
                        <li>
                            <ContactInfo/> {/*button component to redirect to /contact-info endpoint */}
                        </li> 
                        <li>
                            <Login/> {/*button component to redirect to /login endpoint */}
                        </li>
                        <li>
                            <Home/> {/*button component to redirect to / endpoint */}
                        </li>
                        <li>
                            Click for Surprise
                        </li>
                    </ul>
                    
                </div>
            </footer>
        </section>
    )
    return content
}

export default Public

