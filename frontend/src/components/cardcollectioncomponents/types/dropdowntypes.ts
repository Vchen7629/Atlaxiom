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
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}

export interface PendSliderProps extends SliderProps {
    pendprops: {
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}

export interface LinkSliderProps extends SliderProps {
    linkprops: {
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }
}