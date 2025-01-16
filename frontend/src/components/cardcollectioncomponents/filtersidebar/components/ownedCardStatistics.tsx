import { RarityRadialChartComponent } from "../../../shadcn_components/charts/rarityradialchart"
import { ComponentPieChart } from '../../../profilepagecomponents/statisticscomponents/charts/piechart';
import { ComponentRadialChart } from "@/components/profilepagecomponents/statisticscomponents/charts/radialchart";
import { ownedcardstatsprops } from "../../types/ownedcardstatisticstypes";
import FilterCardViewButton from "./filtercardbutton";
import StatisticsViewButton from "./statisticsbutton";

const CardCollectionStatistics = ({filterProps}: ownedcardstatsprops) => {
    const {
        filterpage, setFilterPage,
        statisticspage, setStatisticsPage,
        expandStatus
    } = filterProps;

    const filterprops = { 
        filterpage, setFilterPage,
        setStatisticsPage
    }

    const statisticsprops = {
        statisticspage, setStatisticsPage,
        setFilterPage
    }
    

    return (
        <>
        {expandStatus && (
            <> 
                <section className="flex w-[92%] justify-between items-center mb-2 pl-4">
                    <span className="text-2xl text-[hsl(var(--text))] font-bold">Card Statistics </span>
                    <div className="flex w-fit justify-between h-11 bg-footer rounded-xl">
                        <FilterCardViewButton filterprops={filterprops}/>
                        <StatisticsViewButton statisticsprops={statisticsprops}/>
                    </div>
                </section>
                <div className="flex flex-col">
                    <ComponentRadialChart/>
                    <RarityRadialChartComponent/>
                    <ComponentPieChart/>
                </div>
            </>
        )}
       
        </>
    )
}

export default CardCollectionStatistics