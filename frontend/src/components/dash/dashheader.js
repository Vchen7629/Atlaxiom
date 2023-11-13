import { Link } from 'react-router-dom'
import Cardsearch from '../buttons/searchbar'
import Banlist from '../buttons/banlist'
import Mycards from '../buttons/my-cards'
import Login from '../buttons/login'


<<<<<<< HEAD

=======
>>>>>>> 5a1f343a60e800cd9368e61a45af8641ea9b74a6
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
            <div className="dash-header__container">
                <Link to="/dash">
                <div className="h1-container-dash">
                    <h1>DeckDatabaseOnline</h1>
                </div>
                </Link>
                <ul className='Menu-container-right'>
                    <li>
                        <Mycards/> {/*button component to redirect to /my-cards endpoint*/}
                    </li>
                    <li>
                        <Login/> {/*button component to redirect to /about-us endpoint*/}
                    </li>
                </ul>
            </div>
        </header>
    )

    return content
}

export default DashHeader