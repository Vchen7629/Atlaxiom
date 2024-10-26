import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentChart } from "../../../../components/chart"
import "../styling/statistics.css"

const UserStatistics = ({ user }) => {
    const { creation, lastUpdated } = user;

    return (
        <div>
            <ComponentChart/>
        </div>
    )
}

export default UserStatistics