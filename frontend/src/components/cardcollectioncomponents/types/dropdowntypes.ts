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