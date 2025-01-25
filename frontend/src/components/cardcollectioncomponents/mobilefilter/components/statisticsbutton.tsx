import { faChartSimple } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StatisticsButtonProps } from "../../types/componenttypes"

const StatisticsViewButton = ({ statisticsprops }: StatisticsButtonProps) => {
    const { 
        statisticspage, setStatisticsPage,
        setFilterPage
    } = statisticsprops

    const handleStatisticsClick = () => {
        setFilterPage(false)
        setStatisticsPage(true)
    }

    return (
        <button className={`p-2 rounded-xl font-black ${statisticspage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleStatisticsClick}>
            <FontAwesomeIcon icon={faChartSimple} className="fa-sm"/>
        </button>
    )
}

export default StatisticsViewButton