export type barchartbutton = {
    barchartbuttonprops: {
        yearView: boolean;
        setYearView: React.Dispatch<React.SetStateAction<boolean>>;
        monthView: boolean;
        setMonthView: React.Dispatch<React.SetStateAction<boolean>>;
    }
}