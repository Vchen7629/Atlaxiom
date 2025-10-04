import { GetOwnedCardsResponse } from "@/app/api-slices/types/ownedcardtypes";

export type OwnedCardsFilterProps = {
    filterProps: {
        setCanClearFilter: React.Dispatch<React.SetStateAction<boolean>>;
        ownedCards: GetOwnedCardsResponse[] | undefined;
        filterActive?: boolean
        monsterTypeFilter: string;
        setMonsterTypeFilter: React.Dispatch<React.SetStateAction<string>>;
        spellTypeFilter: string;
        setSpellTypeFilter: React.Dispatch<React.SetStateAction<string>>;
        trapTypeFilter: string;
        setTrapTypeFilter: React.Dispatch<React.SetStateAction<string>>;
        attributeFilter: string;
        setAttributeFilter: React.Dispatch<React.SetStateAction<string>>;
        archeTypeFilter: string;
        setArcheTypeFilter: React.Dispatch<React.SetStateAction<string>>;
        levelFilter: number | null;
        setLevelFilter: React.Dispatch<React.SetStateAction<number | null>>;
        levelLessThanEqual: boolean;
        setLevelLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
        levelEqual: boolean;
        setLevelEqual: React.Dispatch<React.SetStateAction<boolean>>;
        levelGreaterThanEqual: boolean;
        setLevelGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        pendFilter: number | null;
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>;
        pendLessThanEqual: boolean;
        setPendLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
        pendEqual: boolean;
        setPendEqual: React.Dispatch<React.SetStateAction<boolean>>;
        pendGreaterThanEqual: boolean;
        setPendGreaterThanEqual: React.Dispatch<React.SetStateAction<boolean>>
        linkFilter: number | null;
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>;
        linkLessThanEqual: boolean;
        setLinkLessThanEqual: React.Dispatch<React.SetStateAction<boolean>>;
        linkEqual: boolean;
        setLinkEqual: React.Dispatch<React.SetStateAction<boolean>>;
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
        setFilter: string;
        setSetFilter: React.Dispatch<React.SetStateAction<string>>;
        rarityFilter: string;
        setRarityFilter: React.Dispatch<React.SetStateAction<string>>;
        filterpage: boolean;
        setFilterPage: React.Dispatch<React.SetStateAction<boolean>>;
        statisticspage: boolean;
        setStatisticsPage: React.Dispatch<React.SetStateAction<boolean>>;
        expandStatus?: boolean;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    }
}

export type SetFilterValues = {
    type: string
    race: string
    attribute: string;
    archetype: string;
    set_name: string;
    rarity: string
}