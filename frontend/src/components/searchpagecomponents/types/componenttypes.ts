export type levelprops = {
    levelfilterprops: {
        levelFilter: number | null;
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
        lessThanEqual: boolean;
        setLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        equal: boolean;
        setEqual: React.Dispatch<React.SetStateAction<boolean>>
        greaterThanEqual: boolean;
        setGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type pendprops = {
    pendfilterprops: {
        pendFilter: number | null;
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
        pendLessThanEqual: boolean;
        setPendLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        pendEqual: boolean;
        setPendEqual: React.Dispatch<React.SetStateAction<boolean>>
        pendGreaterThanEqual: boolean;
        setPendGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type linkprops = {
    linkfilterprops: {
        linkFilter: number | null;
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
        linkLessThanEqual: boolean;
        setLinkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        linkEqual: boolean;
        setLinkEqual: React.Dispatch<React.SetStateAction<boolean>>
        linkGreaterThanEqual: boolean;
        setLinkGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type atkprops = {
    atkfilterprops: {
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