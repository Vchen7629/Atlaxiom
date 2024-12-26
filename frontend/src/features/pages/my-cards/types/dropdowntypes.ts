import { SliderProps } from "@radix-ui/react-slider";

export type SubTypeDropDownProps = {
    subtypes: string[];
    subTypeFilter: string;
    setSubTypeFilter: (filter: string) => void;
}

export type AttributeDropDownProps = {
    attributes: string[];
    attributeFilter: string;
    setAttributeFilter: (filter: string) => void;
}

export type CardSetDropDownProps = {
    sets: string[]; 
    setFilter: string; 
    setSetFilter: (filter: string) => void;
};

export type RarityDropDownProps = {
    raritys: string[];
    rarityFilter: string;
    setRarityFilter: (filter: string) => void;
}

export interface LevelSliderProps extends SliderProps {
    setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>
}

export interface PendSliderProps extends SliderProps {
    setPendFilter: React.Dispatch<React.SetStateAction<number | null>>
}

export interface LinkSliderProps extends SliderProps {
    setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>
}
