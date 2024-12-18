
import { ComponentBarChart } from "../../../../components/shadcn_components/charts/barchartyear"
import { ComponentPieChart } from "../../../../components/shadcn_components/charts/piechart"
import { ComponentRadialChart } from "../../../../components/shadcn_components/charts/radialchart"
import { ComponentBarMonthChart } from "../../../../components/shadcn_components/charts/barchartmonth"
import { useState } from "react";

const UserStatistics = ({ refetch, setSelectedNavItem }: any) => {
    const [yearView, setYearView] = useState(true);

    const handleYearClick = () => {
        setYearView(false);
    }

    const handleMonthClick = () => {
        setYearView(true);
    }

    return (
        <main className="flex flex-col h-full pb-[1vh] pt-4">
            <div className="flex items-center justify-center h-full">
                {yearView ? (
                   <>
                   <div 
                    className="flex items-center min-h-full pl-[1vw]"
                    onClick={handleYearClick}>
                        <ComponentBarChart/>
                    </div>
                    <div className="flex flex-col justify-center items-center ml-[5vw] ">
                        <div className="flex items-center">
                            <ComponentPieChart/>
                        </div>
                        <div className="flex items-center">
                            <ComponentRadialChart/>
                        </div>
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