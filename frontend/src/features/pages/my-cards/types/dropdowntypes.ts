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