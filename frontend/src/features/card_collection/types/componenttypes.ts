
export type GridListViewComponentProps = {
    gridlistviewprops: {
        setListView: React.Dispatch<React.SetStateAction<boolean>>;
        setGalleryView: React.Dispatch<React.SetStateAction<boolean>>;
        listView: boolean;
        galleryView: boolean;
    }
}

export type searchbarprops = { 
    searchbarprops: {
        searchTerm: string;
        setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type FilterButtonProps = {
    filterprops: {
        filterpage: boolean;
        setFilterPage: React.Dispatch<React.SetStateAction<boolean>>
        setStatisticsPage: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type StatisticsButtonProps = {
    statisticsprops: {
        setFilterPage: React.Dispatch<React.SetStateAction<boolean>>
        statisticspage: boolean
        setStatisticsPage: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type atkprops = {
    atkfilterprops: {
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
        atkFilter: number | null;
        setAtkFilter: React.Dispatch<React.SetStateAction<number | null>>
        atkLessThanEqual: boolean;
        setAtkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        atkEqual: boolean;
        setAtkEqual: React.Dispatch<React.SetStateAction<boolean>>
        atkGreaterThanEqual: boolean;
        setAtkGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}


export type defprops = {
    deffilterprops: {
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
        defFilter: number | null;
        setDefFilter: React.Dispatch<React.SetStateAction<number | null>>
        defLessThanEqual: boolean;
        setDefLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        defEqual: boolean;
        setDefEqual: React.Dispatch<React.SetStateAction<boolean>>
        defGreaterThanEqual: boolean;
        setDefGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export interface SliderProps {
    setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    valueFilter: number | null;
    setValueFilter: React.Dispatch<React.SetStateAction<number | null>>
    setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
    lessThanEqual: boolean
    setLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
    equal: boolean;
    setEqual: React.Dispatch<React.SetStateAction<boolean>>;
    greaterThanEqual: boolean;
    setGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
    minNumber: number;
    maxNumber: number
}
