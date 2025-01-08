
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
        <main className="flex flex-col h-full pb-[1vh]">
            <div className="flex h-full space-x-[3%]">
                {yearView && (
                    <div className="flex items-center min-h-full">
                        <ComponentBarChart/>
                    </div>
                )}
                {monthView && (
                    <div className="flex items-center min-h-full">
                        <ComponentBarMonthChart/>
                    </div>
                )}
                <div className="flex flex-col justify-between space-y-[3%]">
                    <ComponentPieChart/>
                    <ComponentRadialChart/>
                </div>
            </div>
        </main>
    )
}

export default UserStatistics