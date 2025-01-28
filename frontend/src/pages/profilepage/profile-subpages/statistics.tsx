
import { ComponentBarChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/barchartyear"
import { ComponentPieChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/piechart"
import { ComponentRadialChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/radialchart"
import { ComponentBarMonthChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/barchartmonth"
import { Statistics } from "../types/subpagetypes"
import { useState } from "react"

const UserStatistics = ({ statisticsprops }: Statistics) => {
    const {
        yearView,
        monthView
    } = statisticsprops

    const years = [
        "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", 
        "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"
    ];

    const [selectedYear, setSelectedYear] = useState<string>(years[0]);

    const yearprops = {
        years,
        selectedYear, setSelectedYear
    }

    return (
        <main className="flex flex-col h-full py-[1vh]">
            <div className="flex flex-col space-y-[5vh] lg:space-y-0 lg:flex-row space-x-[3%] h-full">
                {yearView && (
                    <div className="flex h-fit">
                        <ComponentBarChart yearprops={yearprops}/>
                    </div>
                )}
                {monthView && (
                    <div className="flex h-fit">
                        <ComponentBarMonthChart selectedYear={selectedYear}/>
                    </div>
                )}
                <div className="flex flex-col space-y-[5vh] justify-between lg:space-y-[3%]">
                    <ComponentPieChart/>
                    <ComponentRadialChart/>
                </div>
            </div>
        </main>
    )
}

export default UserStatistics