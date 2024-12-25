import React from "react"

export type clearfilter = {
    clearfilterprops: {
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        setTrapType: React.Dispatch<React.SetStateAction<string>>
        setAttributeType: React.Dispatch<React.SetStateAction<string>>
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
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