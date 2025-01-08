import { AttributeDropDownComponent } from "../dropdown/attributedropdown.tsx"
import { ArchetypeDropDownComponent } from "../dropdown/archetypedropdown.tsx"
import { SubTypeDropDownComponent } from "../dropdown/subtypedrowndown.tsx"
import { CardSetDropDownComponent } from "../dropdown/cardsetdropdown.tsx"
import { LevelSliderComponent } from '../sliders/levelslider.tsx';
import MyCardsSearchbarComponent from '../../components/searchbar.tsx';
import { OwnedCardsFilterProps } from "../../types/ownedcardfiltertypes.ts";
import { RarityDropDownComponent } from "../dropdown/raritydropdown.tsx";
import { useEffect, useState } from "react";
import { Card } from "../../types/ownedcarddetailstypes.ts";

const FilterOwnedCards = ({ filterProps }: OwnedCardsFilterProps) => {
    const {
        ownedCards,
        expandStatus,
        searchTerm, setSearchTerm,
        setCardTypeFilter,
        isMonsterFilterActive, setIsMonsterFilterActive,
        setIsSpellFilterActive, isSpellFilterActive,
        isTrapFilterActive, setIsTrapFilterActive,
        subTypeFilter, setSubTypeFilter,
        attributeFilter, setAttributeFilter,
        archeTypeFilter, setArcheTypeFilter,
        setLevelFilter,
        setFilter, setSetFilter,
        rarityFilter, setRarityFilter,
        filterpage, setFilterPage,
        statisticspage, setStatisticsPage,
        setListCurrentPage,
        setGalleryCurrentPage,
    } = filterProps;

    const [monsterCount, setMonsterCount] = useState<number>(0);
    const [spellCount, setSpellCount] = useState<number>(0);
    const [trapCount, setTrapCount] = useState<number>(0);
    
    const [uniqueSubtype, setUniqueSubtype] = useState<string[]>([]);
    const [uniqueAttribute, setUniqueAttribute] = useState<string[]>([]);
    const [uniqueArchtype, setUniqueArchetype] = useState<string[]>([]);
    const [uniqueSet, setUniqueSet] = useState<string[]>([]);
    const [uniqueRarity, setUniqueRarity] = useState<string[]>([]);


    useEffect(() => {
        if (ownedCards) {
          const allCards: Card[] = Object.values(ownedCards?.entities?.defaultId?.ownedCards || {}).flat().filter(card => card) as Card[];
    
          const subtypeList = new Set(allCards.map((card: any) => card.race).filter(race => race));
          setUniqueSubtype([...subtypeList])
    
          const attributeList = new Set(allCards.map((card: any) => card.attribute).filter(attribute => attribute));
          setUniqueAttribute([...attributeList])
    
          const archetypeList = new Set(allCards.map((card: any) => card.archetype).filter(archetype => archetype));
          setUniqueArchetype([...archetypeList])
    
          const setList = new Set(allCards.map((card: any) => card.set_name).filter(set_name => set_name));
          setUniqueSet([...setList])
    
          const rarityList = new Set(allCards.map((card: any) => card.rarity).filter(rarity => rarity));
          setUniqueRarity([...rarityList])
    
          const monsterCount = allCards
            .filter((card: any): card is Card => card.type?.toLowerCase().includes('monster'))
            .reduce((total, card) => total + (card.ownedamount || 0), 0); 
          setMonsterCount(monsterCount);
          
          const spellCount = allCards
            .filter((card: any) => card.type?.toLowerCase().includes('spell'))
            .reduce((total, card) => total + (card.ownedamount || 0), 0); 
          setSpellCount(spellCount);
          
          const trapCount = allCards
            .filter((card: any) => card.type?.toLowerCase().includes('trap'))
            .reduce((total, card) => total + (card.ownedamount || 0), 0);
          setTrapCount(trapCount);
    
        }
      }, [ownedCards]);

    const handleMonsterFilter = () => {
        setCardTypeFilter('monster');
        setListCurrentPage(1);
        setGalleryCurrentPage(1);
        setIsMonsterFilterActive(true);
        setIsSpellFilterActive(false);
        setIsTrapFilterActive(false);
    }
    
    const handleSpellFilter = () => {
        setCardTypeFilter('spell');
        setIsMonsterFilterActive(false);
        setIsSpellFilterActive(true);
        setIsTrapFilterActive(false);
    }
    
    const handleTrapFilter = () => {
        setCardTypeFilter('trap');
        setIsMonsterFilterActive(false);
        setIsSpellFilterActive(false);
        setIsTrapFilterActive(true);
    }

    const clearFilter = () => {
        setCardTypeFilter('');
        setIsMonsterFilterActive(false);
        setIsSpellFilterActive(false);
        setIsTrapFilterActive(false);
        setSubTypeFilter('');
        setAttributeFilter('');
        setArcheTypeFilter('');
        setLevelFilter(0);
        setRarityFilter('');
        setSetFilter('');
    }

    const handleFilterClick = () => {
        setFilterPage(true)
        setStatisticsPage(false)
    }

    const handleStatisticsClick = () => {
        setFilterPage(false)
        setStatisticsPage(true)
    }

    const searchbarprops = { searchTerm, setSearchTerm }

    const subtypeprops = {
        uniqueSubtype,
        subTypeFilter, setSubTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const attributeprops = {
        uniqueAttribute,
        attributeFilter, setAttributeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const archetypeprops = {
        uniqueArchtype,
        archeTypeFilter, setArcheTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const rarityprops = {
        uniqueRarity,
        rarityFilter, setRarityFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const levelprops = {
        setLevelFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const setprops = {
        uniqueSet,
        setFilter, setSetFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    return (
        <>
        {expandStatus && (
            <>
                <section className="items-center h-8 flex mb-8 justify-between bg-gray-600 rounded-2xl">
                    <button className={`px-4 rounded-2xl w-fit h-8 font-black ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>Filter Cards</button>
                    <button className={`px-4 rounded-2xl w-fit h-8 font-black ${statisticspage ? "bg-[hsl(var(--background3))]" : "bg-transparent text-gray-400"}`} onClick={handleStatisticsClick}>Collection Statistics</button>
                </section>
                <section className="flex w-[90%] items-center mb-6 justify-between">
                    <MyCardsSearchbarComponent searchbarprops={searchbarprops} />   
                    <button 
                        className="w-[20%] rounded-xl h-8 bg-[hsl(var(--background3))] " 
                        onClick={clearFilter}
                    >
                        Clear 
                    </button>
                </section>

                <section className="flex w-[92%] h-10 ">
                    <button
                        className={`w-[37%] flex ${isMonsterFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                        onClick={handleMonsterFilter}
                    >
                        <div className="bg-[url('../img/monstercardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                        <div className='w-fit h-full text-[12px] flex items-center'>Monster Cards ({monsterCount})</div>
                    </button>
                    <button
                        className={`w-[32%] flex ${isSpellFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                        onClick={handleSpellFilter}
                    >
                        <div className="bg-[url('../img/spellcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                        <div className='w-fit h-full text-[12px] flex items-center'>Spell Cards ({spellCount})</div>
                    </button>
                    <button
                        className={`w-[31%] flex ${isTrapFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                        onClick={handleTrapFilter}
                    >
                        <div className="bg-[url('../img/trapcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                        <div className='w-fit h-full text-[12px] flex items-center'>Trap Cards ({trapCount})</div>
                    </button>
                </section>
                
                <section className="flex flex-col w-[92%] items-start space-y-[5%]">
                    <div className="flex w-full items-center mt-[5%]">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Card Subtype:</div>
                        <div><SubTypeDropDownComponent subtypeprops={subtypeprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))] ">Card Attribute:</div>
                        <div><AttributeDropDownComponent attributeprops={attributeprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))] ">Card Archetype:</div>
                        <ArchetypeDropDownComponent archetypeprops={archetypeprops}/>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[10vw] text-sm  items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                        <div className="w-[80%]"><LevelSliderComponent levelprops={levelprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))]">Rarity:</div>
                        <div><RarityDropDownComponent rarityprops={rarityprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))]">Card Set:</div>
                        <div><CardSetDropDownComponent setprops={setprops}/></div>
                    </div>
                </section>
            </>
        )}
            
        </>
    )}

export default FilterOwnedCards