import { SliderProps } from "@radix-ui/react-slider";

export type SubTypeDropDownProps = {
    subtypeprops: {
        uniqueSubtype: string[];
        subTypeFilter: string;
        setSubTypeFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type MonsterTypeDropDownProps = {
    monstertypeprops: {
        uniqueMonsterType: string[];
        monsterTypeFilter: string;
        setMonsterTypeFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type SpellTypeDropDownProps = {
    spelltypeprops: {
        uniqueSpellType: string[];
        spellTypeFilter: string;
        setSpellTypeFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type TrapTypeDropDownProps = {
    traptypeprops: {
        uniqueTrapType: string[];
        trapTypeFilter: string;
        setTrapTypeFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type AttributeDropDownProps = {
    attributeprops: {
        uniqueAttribute: string[];
        attributeFilter: string;
        setAttributeFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type ArchetypeDropDownProps = {
    archetypeprops: {
        uniqueArchtype: string[];
        archeTypeFilter: string;
        setArcheTypeFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export type CardSetDropDownProps = {
    setprops: {
        uniqueSet: string[]; 
        setFilter: string; 
        setSetFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
};

export type RarityDropDownProps = {
    rarityprops: {
        uniqueRarity: string[];
        rarityFilter: string;
        setRarityFilter: (filter: string) => void;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export interface LevelSliderProps extends SliderProps {
    levelprops: {
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
        levelFilter: number | null;
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        levelLessThanEqual: boolean
        setLevelLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
        levelEqual: boolean;
        setLevelEqual: React.Dispatch<React.SetStateAction<boolean>>;
        levelGreaterThanEqual: boolean;
        setLevelGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export interface PendSliderProps extends SliderProps {
    pendprops: {
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
        pendFilter: number | null;
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        pendLessThanEqual: boolean
        setPendLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
        pendEqual: boolean;
        setPendEqual: React.Dispatch<React.SetStateAction<boolean>>;
        pendGreaterThanEqual: boolean;
        setPendGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export interface LinkSliderProps extends SliderProps {
    linkprops: {
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
        linkFilter: number | null;
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
        linkLessThanEqual: boolean
        setLinkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
        linkEqual: boolean;
        setLinkEqual: React.Dispatch<React.SetStateAction<boolean>>;
        linkGreaterThanEqual: boolean;
        setLinkGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
    }
}