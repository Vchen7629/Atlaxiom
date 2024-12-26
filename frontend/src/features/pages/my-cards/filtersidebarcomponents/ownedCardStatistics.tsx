import { RarityRadialChartComponent } from "../../../../components/shadcn_components/charts/rarityradialchart"
import { ComponentPieChart } from '../../../../components/shadcn_components/charts/piechart';
import { ComponentRadialChart } from '../../../../components/shadcn_components/charts/radialchart';
import { ownedcardstatsprops } from "../types/ownedcardstatisticstypes";

const CardCollectionStatistics = ({filterProps}: ownedcardstatsprops) => {
    const {
        filterpage, setFilterPage,
        statisticspage, setStatisticsPage,
        expandStatus
    } = filterProps;

    const handleFilterClick = () => {
        setFilterPage(true)
        setStatisticsPage(false)
    }

    const handleStatisticsClick = () => {
        setFilterPage(false)
        setStatisticsPage(true)
    }
    

    return (
        <>
        {expandStatus && (
            <> 
                <section className="items-center h-8 flex mb-8 justify-between bg-gray-600 rounded-2xl">
                    <button className={`px-4 rounded-2xl w-fit h-8 font-black ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>Filter Cards</button>
                    <button className={`px-4 rounded-2xl w-fit h-8 font-black ${statisticspage ? "bg-[hsl(var(--background3))]" : "bg-transparent text-gray-400"}`} onClick={handleStatisticsClick}>Collection Statistics</button>
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