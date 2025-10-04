import React from "react"

export type clearfilter = {
    clearfilterprops: {
        canClearFilters: boolean
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        setTrapType: React.Dispatch<React.SetStateAction<string>>
        setAttributeType: React.Dispatch<React.SetStateAction<string>>
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
        setLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setEqual: React.Dispatch<React.SetStateAction<boolean>>
        setGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
        setPendLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setPendEqual: React.Dispatch<React.SetStateAction<boolean>>
        setPendGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
        setLinkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>> 
        setLinkEqual: React.Dispatch<React.SetStateAction<boolean>> 
        setLinkGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setAtkFilter: React.Dispatch<React.SetStateAction<number | null>>
        setAtkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setAtkEqual: React.Dispatch<React.SetStateAction<boolean>>
        setAtkGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setDefFilter: React.Dispatch<React.SetStateAction<number | null>>
        setDefLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setDefEqual: React.Dispatch<React.SetStateAction<boolean>>
        setDefGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setSetName: React.Dispatch<React.SetStateAction<string>>
    }
}

export type filterbutton = {
    filterbuttonprops: {
        expandStatus: boolean
        setExpandStatus: React.Dispatch<React.SetStateAction<boolean>>
        filterActive: boolean
        setFilterActive: React.Dispatch<React.SetStateAction<boolean>>
    }
}