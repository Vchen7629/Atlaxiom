import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentBarChart } from "../../../../components/shadcn_components/barchart"
import { ComponentPieChart } from "../../../../components/shadcn_components/piechart"
import { ComponentRadialChart } from "../../../../components/shadcn_components/radialchart"
import "../styling/statistics.css"

const UserStatistics = () => {

    return (
        <main className="flex flex-col min-h-full pb-[1vh]">
            <div className="pb-[2vh] border-b-2 border-gray-500 text-goldenrod text-4xl">
                <FontAwesomeIcon icon={faChartColumn} className="ml-7"/>
                <span className="ml-5">User Statistics</span>
            </div>
            <div className="flex items-center justify-center h-full">
                <div className="flex items-center min-h-full pl-[1vw]">
                    <ComponentBarChart/>
                </div>
                <div className="flex flex-col h-[78%] justify-center items-center ml-[5vw] ">
                    <div className="flex items-center">
                        <ComponentPieChart/>
                    </div>
                    <div className="flex items-center">
                        <ComponentRadialChart/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default UserStatistics