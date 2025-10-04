import { OwnedCardsFilterProps } from "../types/mobile.ts";
import { useEffect, useState } from "react";
import FilterCardViewButton from "../buttons/filterCardsButton.tsx";
import StatisticsViewButton from "../../user/buttons/statisticsView.tsx";
import { SetFilterValues } from "../types/mobile.ts";
import { DropDownComponent } from "./dropDown.tsx";
import { FilterSliderComponent } from '@/features/card_collection/components/slider.tsx';

const FilterOwnedCards = ({ filterProps }: OwnedCardsFilterProps) => {
    const {
        ownedCards,
        expandStatus,
        monsterTypeFilter, setMonsterTypeFilter,
        spellTypeFilter, setSpellTypeFilter,
        trapTypeFilter, setTrapTypeFilter,
        attributeFilter, setAttributeFilter,
        archeTypeFilter, setArcheTypeFilter,
        levelFilter, setLevelFilter, 
        levelLessThanEqual, setLevelLessThanEqual, 
        levelEqual, setLevelEqual, 
        levelGreaterThanEqual, setLevelGreaterThanEqual,
        pendFilter, setPendFilter, 
        pendLessThanEqual, setPendLessThanEqual, 
        pendEqual, setPendEqual, 
        pendGreaterThanEqual, setPendGreaterThanEqual,
        linkFilter, setLinkFilter, 
        linkLessThanEqual, setLinkLessThanEqual, 
        linkEqual, setLinkEqual, 
        linkGreaterThanEqual, setLinkGreaterThanEqual,
        atkFilter, setAtkFilter,
        atkLessThanEqual, setAtkLessThanEqual,
        atkEqual, setAtkEqual,
        atkGreaterThanEqual, setAtkGreaterThanEqual,
        defFilter, setDefFilter,
        defLessThanEqual, setDefLessThanEqual,
        defEqual, setDefEqual,
        defGreaterThanEqual, setDefGreaterThanEqual,
        setFilter, setSetFilter,
        rarityFilter, setRarityFilter,
        filterpage, setFilterPage,
        statisticspage, setStatisticsPage,
        setListCurrentPage,
        setGalleryCurrentPage,
    } = filterProps;
    
    const [uniqueMonsterType, setUniqueMonsterType] = useState<string[]>([])
    const [uniqueSpellType, setUniqueSpellType] = useState<string[]>([]);
    const [uniqueTrapType, setUniqueTrapType] = useState<string[]>([]);
    const [uniqueAttribute, setUniqueAttribute] = useState<string[]>([]);
    const [uniqueArchtype, setUniqueArchetype] = useState<string[]>([]);
    const [uniqueSet, setUniqueSet] = useState<string[]>([]);
    const [uniqueRarity, setUniqueRarity] = useState<string[]>([]);

    const [canClearFilter, setCanClearFilter] = useState<boolean>(false);


    useEffect(() => {
        if (ownedCards) {
          const allCards: SetFilterValues[] = Object.values(ownedCards || {}).flat().filter(card => card) as SetFilterValues[];

          const monsterTypeList = new Set(allCards.filter((card) => card.type.includes("Monster")).map((card) => card.race).filter(race => race));
          setUniqueMonsterType([...monsterTypeList])

          const spellTypeList = new Set(allCards.filter((card) => card.type.includes("Spell")).map((card) => card.race).filter(race => race));
          setUniqueSpellType([...spellTypeList])

          const trapTypeList = new Set(allCards.filter((card) => card.type.includes("Trap")).map((card) => card.race).filter(race => race));
          setUniqueTrapType([...trapTypeList])
    
          const attributeList = new Set(allCards.map((card) => card.attribute).filter(attribute => attribute));
          setUniqueAttribute([...attributeList])
    
          const archetypeList = new Set(allCards.map((card) => card.archetype).filter(archetype => archetype));
          setUniqueArchetype([...archetypeList])
    
          const setList = new Set(allCards.map((card) => card.set_name).filter(set_name => set_name));
          setUniqueSet([...setList])
    
          const rarityList = new Set(allCards.map((card) => card.rarity).filter(rarity => rarity));
          setUniqueRarity([...rarityList])
    
        }
      }, [ownedCards]);


    function clearFilter() {
        setMonsterTypeFilter('');
        setSpellTypeFilter('');
        setTrapTypeFilter('');
        setAttributeFilter('');
        setArcheTypeFilter('');
        setLevelFilter(0);
        setLevelEqual(true);
        setLevelLessThanEqual(false);
        setLevelGreaterThanEqual(false);
        setPendFilter(0);
        setPendEqual(true);
        setPendLessThanEqual(false);
        setPendGreaterThanEqual(false);
        setLinkFilter(0);
        setLinkEqual(true);
        setLinkLessThanEqual(false);
        setLinkGreaterThanEqual(false);
        setAtkFilter(null);
        setAtkEqual(true);
        setAtkLessThanEqual(false);
        setAtkGreaterThanEqual(false);
        setDefFilter(null);
        setDefEqual(true);
        setDefLessThanEqual(false);
        setDefGreaterThanEqual(false);
        setRarityFilter('');
        setSetFilter('');
        setCanClearFilter(false);
    }


    const filterprops = { 
        filterpage, setFilterPage,
        setStatisticsPage
    }

    const statisticsprops = {
        statisticspage, setStatisticsPage,
        setFilterPage
    }

    const levelprops = {
        setCanClearFilter,
        valueFilter: levelFilter,
        setValueFilter: setLevelFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        lessThanEqual: levelLessThanEqual, 
        setLessThanEqual: setLevelLessThanEqual, 
        equal: levelEqual, 
        setEqual: setLevelEqual, 
        greaterThanEqual: levelGreaterThanEqual, 
        setGreaterThanEqual: setLevelGreaterThanEqual,
        minNumber: 1,
        maxNumber: 12
    }

    const pendprops = {
        valueFilter: pendFilter,
        setValueFilter: setPendFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        lessThanEqual: pendLessThanEqual, 
        setLessThanEqual: setPendLessThanEqual, 
        equal: pendEqual, 
        setEqual: setPendEqual, 
        greaterThanEqual: pendGreaterThanEqual, 
        setGreaterThanEqual: setPendGreaterThanEqual,
        minNumber: 1,
        maxNumber: 12
    }

    const linkprops = {
        valueFilter: linkFilter,
        setValueFilter: setLinkFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        lessThanEqual: linkLessThanEqual, 
        setLessThanEqual: setLinkLessThanEqual, 
        equal: linkEqual, 
        setEqual: setLinkEqual, 
        greaterThanEqual: linkGreaterThanEqual, 
        setGreaterThanEqual: setLinkGreaterThanEqual,
        minNumber: 1,
        maxNumber: 6
    }

    const atkprops = {
        valueFilter: atkFilter,
        setValueFilter: setAtkFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        lessThanEqual: atkLessThanEqual, 
        setLessThanEqual: setAtkLessThanEqual, 
        equal: atkEqual, 
        setEqual: setAtkEqual, 
        greaterThanEqual: atkGreaterThanEqual, 
        setGreaterThanEqual: setAtkGreaterThanEqual,
        minNumber: 1,
        maxNumber: 5000
    }

    const defprops = {
        valueFilter: defFilter,
        setValueFilter: setDefFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        lessThanEqual: defLessThanEqual, 
        setLessThanEqual: setDefLessThanEqual, 
        equal: defEqual, 
        setEqual: setDefEqual, 
        greaterThanEqual: defGreaterThanEqual, 
        setGreaterThanEqual: setDefGreaterThanEqual,
        minNumber: 1,
        maxNumber: 5000
    }

    return expandStatus ? (
        <>
            <section className="flex w-[92%] justify-between items-center mb-6 pl-4">
                <span className="text-2xl text-[hsl(var(--background3))] font-bold">Card Filter </span>
                <div className="flex w-fit space-x-2">
                    <button className={`flex items-center px-4 border-2 border-gray-300 dark:border-gray-600 py-4 text-[hsl(var(--text))] rounded-xl h-11 shadow-md shadow-[hsl(var(--shadow))] ${canClearFilter ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--bentogridbackground))] "}`} onClick={clearFilter}> Clear </button>
                    <div className="flex w-19 h-11 bg-[hsl(var(--bentogridbackground))] shadow-lg shadow-[hsl(var(--shadow))] rounded-xl">
                        <FilterCardViewButton filterprops={filterprops}/>
                        <StatisticsViewButton statisticsprops={statisticsprops}/>
                    </div>
                </div>
            </section>
                <section className="flex flex-col w-[92%] pl-2 items-center  space-y-[2%]">
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Monster Type:</div>
                        <DropDownComponent 
                            value = {monsterTypeFilter}
                            setValue = {setMonsterTypeFilter}
                            items={uniqueMonsterType.map(type => ({ label: type, value: type }))}
                            onSelectOptional={(newValue) => {
                                setSpellTypeFilter("");          // clear other filters
                                setTrapTypeFilter("");
                                setCanClearFilter(!!newValue);
                            }}
                            type={"monster"}
                        />
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Spell Type:</div>
                        <DropDownComponent 
                            value = {spellTypeFilter}
                            setValue = {setSpellTypeFilter}
                            items={uniqueSpellType.map(type => ({ label: type, value: type }))}
                            onSelectOptional={(newValue) => {
                                setMonsterTypeFilter("");          // clear other filters
                                setTrapTypeFilter("");
                                setCanClearFilter(!!newValue);
                            }}
                            type={"spell"}
                        />
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Trap Type:</div>
                        <DropDownComponent 
                            value = {trapTypeFilter}
                            setValue = {setTrapTypeFilter}
                            items={uniqueTrapType.map(type => ({ label: type, value: type }))}
                            onSelectOptional={(newValue) => {
                                setSpellTypeFilter("");          // clear other filters
                                setTrapTypeFilter("");
                                setCanClearFilter(!!newValue);
                            }}
                            type={"trap"}
                        />
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))] ">Card Attribute:</div>
                        <DropDownComponent 
                            value = {attributeFilter}
                            setValue = {setAttributeFilter}
                            items={uniqueAttribute.map(type => ({ label: type, value: type }))}
                            onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                            type={"attribute"}
                        />
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))] ">Card Archetype:</div>
                        <DropDownComponent 
                            value = {archeTypeFilter}
                            setValue = {setArcheTypeFilter}
                            items={uniqueArchtype.map(type => ({ label: type, value: type }))}
                            onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                            type={"archetype"}
                        />
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                        <div className="w-[80%]">
                            <FilterSliderComponent {...levelprops}/>
                        </div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Pend Scale:</div>
                        <div className="w-[80%]">
                            <FilterSliderComponent {...pendprops}/>
                        </div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Link Value:</div>
                        <div className="w-[80%]">
                            <FilterSliderComponent {...linkprops}/>
                        </div>
                    </div>
                    <div className="flex w-full items-center">
                        <span className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Attack</span>
                        <FilterSliderComponent {...atkprops}/>
                    </div>
                    <div className="flex w-full items-center">
                        <span className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Defense</span>
                        <FilterSliderComponent {...defprops}/>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))]">Rarity:</div>
                        <DropDownComponent 
                            value = {rarityFilter}
                            setValue = {setRarityFilter}
                            items={uniqueRarity.map(type => ({ label: type, value: type }))}
                            onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                            type={"rarity"}
                        />
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))]">Card Set:</div>
                        <DropDownComponent 
                            value = {setFilter}
                            setValue = {setSetFilter}
                            items={uniqueSet.map(type => ({ label: type, value: type }))}
                            onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                            type={"set"}
                        />
                    </div>
                </section>
            </>
    ) : null};

export default FilterOwnedCards