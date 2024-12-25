import { SliderProps } from "@radix-ui/react-slider";

export type FilterSidebar = {
    filterprops: {
        expandStatus: boolean;
        monsterType: string;
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        spellType: string;
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        trapType: string;
        setTrapType: React.Dispatch<React.SetStateAction<string>>
        attributeType: string;
        setAttributeType: React.Dispatch<React.SetStateAction<string>>
        levelFilter: number | null
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
        lessThanEqual: boolean;
        setLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        equal: boolean;
        setEqual: React.Dispatch<React.SetStateAction<boolean>>
        greaterThanEqual: boolean;
        setGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
    }
}

export type monsterDropDown = {
    monsterdropdownprops: {
        monsterType: string;
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        setTrapType: React.Dispatch<React.SetStateAction<string>>
    }
}

export type spellDropDown = {
    spelldropdownprops: {
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        spellType: string;
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        setTrapType: React.Dispatch<React.SetStateAction<string>>
    }
}

export type trapDropDown = {
    trapdropdownprops: {
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        trapType: string;
        setTrapType: React.Dispatch<React.SetStateAction<string>>
    }
}

export type attributeDropDown = {
    attributedropdownprops: {
        attributeType: string
        setAttributeType: React.Dispatch<React.SetStateAction<string>>
    }
}

export interface LevelSliderProps extends SliderProps {
    setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
}


