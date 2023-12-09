import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styling/statistics.css"

const UserStatistics = ({ user }) => {
    const { totalOwnedCards, totalOwnedDecks } = user;

    return (
        <div>
            <header className="Stats-header-container">
                <FontAwesomeIcon icon={faChartColumn} className="stats-header-icon"/>
                <span className="stats-header-text">User Statistics</span>
            </header>
            <main>
                <div className="OwnedCards-container">
                    <div className="image"></div>
                    <p>Total Owned Cards: {totalOwnedCards}</p>
                </div>
                <div className="OwnedCards-container">
                    <div className="image"></div>
                    <p>Total Owned Decks: {totalOwnedDecks}</p>
                </div>
            </main>
        </div>
    )
}

export default UserStatistics