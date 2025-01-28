
import { ComponentBarChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/barchartyear"
import { ComponentPieChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/piechart"
import { ComponentRadialChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/radialchart"
import { ComponentBarMonthChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/barchartmonth"
import { Statistics } from "../types/subpagetypes"

const UserStatistics = ({ statisticsprops }: Statistics) => {
    const {
        yearView,
        monthView
    } = statisticsprops

    return (
        <main className="flex flex-col items-center h-full py-[1vh]">
            <div className="flex flex-col space-y-[5vh] lg:space-y-0 lg:flex-row space-x-[3%] h-full">
                {yearView && (
                    <div className="flex h-fit">
                        <ComponentBarChart/>
                    </div>
                )}
                {monthView && (
                    <div className="flex h-fit">
                        <ComponentBarMonthChart/>
                    </div>
                )}
                <div className="flex flex-col justify-between space-y-[5vh] lg:space-y-[3%]">
                    <ComponentPieChart/>
                    <ComponentRadialChart/>
                </div>
            </div>
        </main>
    )
}

export default UserStatistics