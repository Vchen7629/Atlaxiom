import React from 'react';
import { RarityRadialChartComponent } from "../../../components/shadcn_components/charts/rarityradialchart"
import { ComponentPieChart } from '../../../components/shadcn_components/charts/piechart';
import { ComponentRadialChart } from '../../../components/shadcn_components/charts/radialchart';

const CardCollectionStatistics = () => {

    return (
        <div className="flex flex-col">
            <ComponentRadialChart/>
            <RarityRadialChartComponent/>
            <ComponentPieChart/>
        </div>
    )
}

export default CardCollectionStatistics