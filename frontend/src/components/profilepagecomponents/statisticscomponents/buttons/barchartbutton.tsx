import { barchartbutton } from "../types/buttontypes";

const BarChartViewButton = ({ barchartbuttonprops }: barchartbutton) => {
    const {
        yearView, setYearView,
        monthView, setMonthView
    } = barchartbuttonprops

    function handleYearClick() {
        setYearView(true);
        setMonthView(false);
    }

    function handleMonthClick() {
        setYearView(false);
        setMonthView(true);
    }

    return (
        <div className="flex my-4 space-x-4 relative w-fit h-fit text-lg ">
            <button 
                className={`flex w-fit py-1 px-4 rounded-lg shadow-md shadow-[hsl(Var(--shadow))] ${yearView ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--contrast))]"} text-[hsl(var(--text))] items-center`} 
                onClick={handleYearClick}
            >
                <span>Year</span>
            </button>
            <button 
                className={`flex py-1 px-4 rounded-lg shadow-md shadow-[hsl(Var(--shadow))] ${monthView ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--contrast))]"} text-[hsl(var(--text))] items-center`} 
                onClick={handleMonthClick}
            >
                <span>Month</span>
            </button>
        </div>
    )
}

export default BarChartViewButton