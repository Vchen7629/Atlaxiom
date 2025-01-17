export type OwnedCardsFilterProps = {
    filterProps: {
        ownedCards: any;
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
        pendFilter: number | null;
        setPendFilter: React.Dispatch<React.SetStateAction<number | null>>;
        linkFilter: number | null;
        setLinkFilter: React.Dispatch<React.SetStateAction<number | null>>;
        setFilter: string;
        setSetFilter: React.Dispatch<React.SetStateAction<string>>;
        rarityFilter: string;
        setRarityFilter: React.Dispatch<React.SetStateAction<string>>;
        filterpage: boolean;
        setFilterPage: React.Dispatch<React.SetStateAction<boolean>>;
        statisticspage: boolean;
        setStatisticsPage: React.Dispatch<React.SetStateAction<boolean>>;
        expandStatus: boolean;
        setListCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        setGalleryCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    }
}