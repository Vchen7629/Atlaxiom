import Privacypolicy from "../buttons/Privacypolicy"
import ContactInfo from "../buttons/contactinfo"
import Aboutus from "../buttons/about-us"
import Home from "../buttons/home"
import "./footer.css"

const Footer = () => {

    const content = (
        <footer>
        <div  className="footer-container">
            <p className="copyright-container">
                &copy; 2023 DeckDatabaseOnline. All rights reserved.
            </p>   
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
    )

    return content
}

export default Footer