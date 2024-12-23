export type FilterSidebar = {
    filterprops: {
        expandStatus: boolean;
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        setTrapType: React.Dispatch<React.SetStateAction<string>>
        setAttributeType: React.Dispatch<React.SetStateAction<string>>
    }
}

export type SetMonsterProp = {
    setMonsterType: React.Dispatch<React.SetStateAction<string>>
}

export type SetSpellProp = {
    setSpellType: React.Dispatch<React.SetStateAction<string>>
}

export type SetTrapProp = {
    setTrapType: React.Dispatch<React.SetStateAction<string>>
}

export type SetAttributeProp = {
    setAttributeType: React.Dispatch<React.SetStateAction<string>>
}