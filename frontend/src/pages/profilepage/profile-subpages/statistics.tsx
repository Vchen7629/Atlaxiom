
import { ComponentBarChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/barchartyear"
import { ComponentPieChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/piechart"
import { ComponentRadialChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/radialchart"
import { ComponentBarMonthChart } from "../../../components/profilepagecomponents/statisticscomponents/charts/barchartmonth"
import { useState } from "react";

const UserStatistics = () => {
    const [yearView, setYearView] = useState(true);

    const handleYearClick = () => {
        setYearView(false);
    }

    const handleMonthClick = () => {
        setYearView(true);
    }

    return (
        <main className="flex flex-col h-full pb-[1vh] pt-4">
            <div className="flex h-full space-x-[3%]">
                {yearView ? (
                   <>
                    <div className="flex items-center min-h-full" onClick={handleYearClick}>
                        <ComponentBarChart/>
                    </div>
                    <div className="flex flex-col justify-between space-y-[3%]">
                        <ComponentPieChart/>
                        <ComponentRadialChart/>
                    </div>
                    </> 
                ) : (
                    <main>
                    <div 
                        className="bg-transparent text-right w-full mb-5"
                    >
                        <button
                            onClick={handleMonthClick}
                            className="bg-footer w-[5vw] h-[2.5vh] rounded-xl hover:text-gold"
                        > 
                            Back 
                        </button>
                    </div>
                    <div><ComponentBarMonthChart/></div>
                    </main>
                )}
            </div>
        </main>
    )
}

export default UserStatistics