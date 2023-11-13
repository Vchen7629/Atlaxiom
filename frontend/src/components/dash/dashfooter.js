import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"
import Privacypolicy from "../buttons/Privacypolicy"
import ContactInfo from "../buttons/contactinfo"
import Aboutus from "../buttons/about-us"
import Home from "../buttons/home"

const DashFooter = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button 
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
<<<<<<< HEAD
=======
        
>>>>>>> 5a1f343a60e800cd9368e61a45af8641ea9b74a6
        <footer>
        <div  className="footer-container">
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
<<<<<<< HEAD
=======
            
>>>>>>> 5a1f343a60e800cd9368e61a45af8641ea9b74a6
        </div>
        </footer>
    )

    return content
}

export default DashFooter