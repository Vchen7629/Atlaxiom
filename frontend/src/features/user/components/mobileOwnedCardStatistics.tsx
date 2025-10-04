import { RarityRadialChartComponent } from "../charts/rarityradialchart"
import { ComponentPieChart } from '../charts/piechart';
import { ComponentRadialChart } from "../charts/radialchart";
import { ownedcardstatsprops } from "../../card_collection/types/ownedcardstatisticstypes";
import StatisticsViewButton from "../../card_collection/mobile-components/mobileStatisticsView";
import MobileCardFilterButton from "../buttons/mobileCardfilter";

const MobileOwnedCardStatistics = ({filterProps}: ownedcardstatsprops) => {
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
                    <div className="flex w-19 h-11 bg-footer rounded-xl">
                        <MobileCardFilterButton filterprops={filterprops}/>
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

export default MobileOwnedCardStatistics