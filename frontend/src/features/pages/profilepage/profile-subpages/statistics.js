import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styling/statistics.css"

const UserStatistics = ({ user }) => {
    const { creation, lastUpdated } = user;

    return (
        <div>
            <header className="Stats-header-container">
                <FontAwesomeIcon icon={faChartColumn} className="stats-header-icon"/>
                <span className="stats-header-text">User Statistics</span>
            </header>
            <main>
                <div className="Creation-Date-container"> 
                    <div className="Creation-Date-header">Account created on:</div> 
                    <div className="Creation-Date">{creation}</div>
                </div>
                <div className="Update-Date-container"> 
                    <div className="Update-Date-header">User details last Updated on: </div>
                    <div className="Update-Date">{lastUpdated}</div>
                </div>
            </main>
        </div>
    )
}

export default UserStatistics