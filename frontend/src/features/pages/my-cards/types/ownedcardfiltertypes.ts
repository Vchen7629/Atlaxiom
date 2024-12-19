export type OwnedCardsFilterProps = {
    filterProps: {
        searchTerm: string;
        setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
        setCardTypeFilter: React.Dispatch<React.SetStateAction<string>>;
        isMonsterFilterActive: boolean;
        setIsMonsterFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
        isSpellFilterActive: boolean;
        setIsSpellFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
        isTrapFilterActive: boolean;
        setIsTrapFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
        monsterCount: number;
        spellCount: number;
        trapCount: number;
        uniqueSubtype: string[];
        uniqueArchtype: string[];
        uniqueSet: string[];
        uniqueRarity: string[];
        subTypeFilter: string;
        setSubTypeFilter: React.Dispatch<React.SetStateAction<string>>;
        archeTypeFilter: string;
        setArcheTypeFilter: React.Dispatch<React.SetStateAction<string>>;
        setFilter: string;
        setSetFilter: React.Dispatch<React.SetStateAction<string>>;
        rarityFilter: string;
        setRarityFilter: React.Dispatch<React.SetStateAction<string>>;
        filterpage: boolean;
        setFilterPage: React.Dispatch<React.SetStateAction<boolean>>;
        statisticspage: boolean;
        setStatisticsPage: React.Dispatch<React.SetStateAction<boolean>>;
        expandStatus: boolean;
    }
}