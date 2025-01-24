import { SliderProps } from "@radix-ui/react-slider";
import { ApiCardData } from "./datastructuretypes";

export type FilterSidebar = {
    filterprops: {
        filterActive?: boolean;
        cardData: ApiCardData[];
        expandStatus: boolean;
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>
        monsterType: string;
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        spellType: string;
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        trapType: string;
        setTrapType: React.Dispatch<React.SetStateAction<string>>
        attributeType: string;
        setName: string;
        setSetName: React.Dispatch<React.SetStateAction<string>>;
        setAttributeType: React.Dispatch<React.SetStateAction<string>>
        levelFilter: number | null
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
        lessThanEqual: boolean;
        setLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        equal: boolean;
        setEqual: React.Dispatch<React.SetStateAction<boolean>>
        greaterThanEqual: boolean;
        setGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        pendFilter: number | null
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
        pendLessThanEqual: boolean;
        setPendLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        pendEqual: boolean;
        setPendEqual: React.Dispatch<React.SetStateAction<boolean>>
        pendGreaterThanEqual: boolean;
        setPendGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        linkFilter: number | null
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
        linkLessThanEqual: boolean;
        setLinkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        linkEqual: boolean;
        setLinkEqual: React.Dispatch<React.SetStateAction<boolean>>
        linkGreaterThanEqual: boolean;
        setLinkGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        atkFilter: number | null
        setAtkFilter: React.Dispatch<React.SetStateAction<number | null>>
        atkLessThanEqual: boolean;
        setAtkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        atkEqual: boolean;
        setAtkEqual: React.Dispatch<React.SetStateAction<boolean>>
        atkGreaterThanEqual: boolean;
        setAtkGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        defFilter: number | null
        setDefFilter: React.Dispatch<React.SetStateAction<number | null>>
        defLessThanEqual: boolean;
        setDefLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        defEqual: boolean;
        setDefEqual: React.Dispatch<React.SetStateAction<boolean>>
        defGreaterThanEqual: boolean;
        setDefGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type monsterDropDown = {
    monsterdropdownprops: {
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>
        monsterType: string;
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        setTrapType: React.Dispatch<React.SetStateAction<string>>
    }
}

export type spellDropDown = {
    spelldropdownprops: {
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        spellType: string;
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        setTrapType: React.Dispatch<React.SetStateAction<string>>
    }
}

export type trapDropDown = {
    trapdropdownprops: {
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>
        setMonsterType: React.Dispatch<React.SetStateAction<string>>
        setSpellType: React.Dispatch<React.SetStateAction<string>>
        trapType: string;
        setTrapType: React.Dispatch<React.SetStateAction<string>>
    }
}

export type attributeDropDown = {
    attributedropdownprops: {
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>
        attributeType: string
        setAttributeType: React.Dispatch<React.SetStateAction<string>>
    }
}

export interface LevelSliderProps extends SliderProps {
    levelSliderProps: {
        levelFilter: number | null;
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>;
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
    }
}


export interface PendSliderProps extends SliderProps {
    pendSliderProps: {
        pendFilter: number | null;
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>;
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
    }
}


export interface LinkSliderProps extends SliderProps {
    linkSliderProps: {
        linkFilter: number | null;
        setCanClearFilters: React.Dispatch<React.SetStateAction<boolean>>;
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
    }
}


