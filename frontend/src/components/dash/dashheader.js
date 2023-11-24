import { Link } from 'react-router-dom'
import Cardsearch from '../buttons/searchbar'
import Banlist from '../buttons/banlist'
import Mycards from '../buttons/my-cards'
import Login from '../buttons/login'
import "./styling/dash-header.css"


const DashHeader = () => {

    const content = (
        <header className="header">
            <ul className="Menu-container-left">
                    <li>
                        <Cardsearch/> {/*button component to redirect to /search endpoint */}
                    </li>
                    <li>
                        <Banlist/> {/*button component to redirect to /banlist endpoint*/}
                    </li>
                </ul>
            <div>
                <Link to="/dash">
                <div className="website-title">
                    <h1>DeckDatabaseOnline</h1>
                </div>
                </Link>
            </div>
            <ul className='Menu-container-right'>
                <li>
                    <Mycards/> {/*button component to redirect to /my-cards endpoint*/}
                </li>
                <li>
                    <Login/> {/*button component to redirect to /about-us endpoint*/}
                </li>
            </ul>
        </header>
    )

    return content
}

export default DashHeader