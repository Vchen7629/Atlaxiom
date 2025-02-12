import { BarChartPlaceholder } from "./barchartplaceholder";
import { PieChartPlaceholder } from "./piechartplaceholder";
import { ChartArea, ChartColumn, PieChart } from "lucide-react";

export function HomepageViewStatistics() {
    return (
        <div className='animate-fade-in-up relative flex flex-col lg:flex-row space-x-[5vh] justify-center w-full max-h-[50vh]'>
            <div className="relative flex flex-col items-center px-2 pt-8 w-[30%] bg-[hsl(var(--contrast))] shadow-lg rounded-xl">
                <BarChartPlaceholder />
            </div>
            <div className="w-[35%] flex flex-col space-y-[4vh]">
                <div className="flex space-x-6 justify-center text-[hsl(var(--background3))]">
                    <ChartArea className="w-10 h-10"/>
                    <span className='text-4xl font-bold'> View Your Statistics</span>
                </div>
                <div className="flex space-x-6 items-center">
                    <ChartColumn className="w-10 h-10 text-[hsl(var(--background3))]"/>
                    <span className='text-xl font-bold text-[hsl(var(--text))]'> View Your Historical Data</span>
                </div>
                <div className="flex space-x-6 items-center">
                    <PieChart className="w-10 h-10 text-[hsl(var(--background3))]"/>
                    <span className='text-xl font-bold text-[hsl(var(--text))]'> View Your Collection Data</span>
                </div>
            </div>
            <div className="relative flex flex-col px-2 pt-8 w-[25%] bg-[hsl(var(--contrast))] shadow-lg rounded-xl">
                <PieChartPlaceholder />
            </div>
        </div>
    )
}