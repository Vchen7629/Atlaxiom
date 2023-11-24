import { Link } from 'react-router-dom'
import React from 'react';
import DashHeader from '../dash/dashheader';
import Privacypolicy from '../buttons/Privacypolicy';
import ContactInfo from '../buttons/contactinfo';
import Home from '../buttons/home';
import Aboutus from '../buttons/about-us';
import "./styling/body.css"
import "./styling/banner.css"
import "./styling/footer.css"
import "./styling/parallelogram.css"



const HomePage = () => {
   
    const content = (
        <section className="public">
            <DashHeader/>
            <banner>
                <div className="banner"></div>
            </banner> 
            <body>
                <h1 className= "homepagetitlebox">
                    Welcome to the My Deck Database website
                </h1>
                
                <div className='body-container'>
                    <div className="homepage-parallelogram-upperleft"></div>
                    <div className="homepage-parallelogram-bottomleft"></div>
                    <div className="homepage-parallelogram-upperright"></div>
                    <div className="homepage-parallelogram-bottomright"></div>
                    <div className="tech-circle"></div>
                </div>
            </body>
            <footer className="footer-container-homepage">
                <div className="footer-homepage">
                    <p classname="copyright-container">&copy; 2023 DeckDatabaseOnline. All rights reserved.</p>   
                    <ul className="footer-links">
                        <li>
                            <Privacypolicy/> {/*button component to redirect to /privacy-policy endpoint */}
                        </li>
                        <li>
                            <ContactInfo/> {/*button component to redirect to /contact-info endpoint */}
                        </li> 
                        <li>
                            <Aboutus/> {/*button component to redirect to /login endpoint */}
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

export default HomePage

