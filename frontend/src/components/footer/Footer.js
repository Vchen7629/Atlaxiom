import Privacypolicy from "../buttons/Privacypolicy"
import Home from "../buttons/home"
import "./footer.css"

const Footer = () => {

    const content = (
        <footer>
            <div  className="footer-container">  
                <ul className="footer-links">
                    <li>
                        <Privacypolicy/> {/*button component to redirect to /privacy-policy endpoint */}
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