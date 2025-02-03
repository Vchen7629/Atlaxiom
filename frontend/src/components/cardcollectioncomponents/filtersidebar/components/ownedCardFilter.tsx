import { AttributeDropDownComponent } from "../dropdown/attributedropdown.tsx"
import { ArchetypeDropDownComponent } from "../dropdown/archetypedropdown.tsx"
import { CardSetDropDownComponent } from "../dropdown/cardsetdropdown.tsx"
import { LevelSliderComponent } from '../sliders/levelslider.tsx';
import { OwnedCardsFilterProps } from "../../types/ownedcardfiltertypes.ts";
import { RarityDropDownComponent } from "../dropdown/raritydropdown.tsx";
import { useEffect, useState } from "react";
import FilterCardViewButton from "./filtercardbutton.tsx";
import StatisticsViewButton from "./statisticsbutton.tsx";
import { MonsterTypeDropDownComponent } from "../dropdown/monstertypedropdown.tsx";
import { SpellTypeDropDownComponent } from "../dropdown/spelltypedropdown.tsx";
import { TrapTypeDropDownComponent } from "../dropdown/traptypedropdown.tsx";
import { PendScaleSliderComponent } from "../sliders/pendscaleslider.tsx";
import { LinkScaleSliderComponent } from "../sliders/linkvalueslider.tsx";
import AtkFilterComponent from "./atkfiltercomponent.tsx";
import DefFilterComponent from "./deffiltercomponent.tsx";
import { SetFilterValues } from "../../types/mobiletypes.ts";

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

    const monstertypeprops = {
        uniqueMonsterType,
        monsterTypeFilter, setMonsterTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter
    }

    const spelltypeprops = {
        uniqueSpellType,
        spellTypeFilter, setSpellTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter
    }

    const traptypeprops = {
        uniqueTrapType,
        trapTypeFilter, setTrapTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter
    }

    const attributeprops = {
        uniqueAttribute,
        attributeFilter, setAttributeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter
    }

    const archetypeprops = {
        uniqueArchtype,
        archeTypeFilter, setArcheTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter
    }

    const rarityprops = {
        uniqueRarity,
        rarityFilter, setRarityFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter
    }

    const levelprops = {
        levelFilter, setLevelFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        levelLessThanEqual, setLevelLessThanEqual, 
        levelEqual, setLevelEqual, 
        levelGreaterThanEqual, setLevelGreaterThanEqual,
    }

    const pendprops = {
        pendFilter, setPendFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        pendLessThanEqual, setPendLessThanEqual, 
        pendEqual, setPendEqual, 
        pendGreaterThanEqual, setPendGreaterThanEqual,
    }

    const linkprops = {
        linkFilter, setLinkFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        linkLessThanEqual, setLinkLessThanEqual, 
        linkEqual, setLinkEqual, 
        linkGreaterThanEqual, setLinkGreaterThanEqual,
    }

    const atkfilterprops = {
        atkFilter, setAtkFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        atkLessThanEqual, setAtkLessThanEqual,
        atkEqual, setAtkEqual,
        atkGreaterThanEqual, setAtkGreaterThanEqual,
    }

    const deffilterprops = {
        defFilter, setDefFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
        defLessThanEqual, setDefLessThanEqual,
        defEqual, setDefEqual,
        defGreaterThanEqual, setDefGreaterThanEqual,
    }

    const setprops = {
        uniqueSet,
        setFilter, setSetFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter
    }

    return expandStatus ? (
        <>
            <section className="flex w-[92%] justify-between items-center mb-6 pl-4">
                <span className="text-2xl text-[hsl(var(--background3))] font-bold">Card Filter </span>
                <div className="flex w-fit space-x-2">
                    <button className={`flex items-center px-4 py-4 rounded-xl h-11 ${canClearFilter ? "bg-[hsl(var(--background3))]" : "bg-gray-600"}`} onClick={clearFilter}> Clear </button>
                    <div className="flex w-19 h-11 bg-footer rounded-xl">
                        <FilterCardViewButton filterprops={filterprops}/>
                        <StatisticsViewButton statisticsprops={statisticsprops}/>
                    </div>
                </div>
            </section>
                <section className="flex flex-col w-[92%] pl-2 items-center  space-y-[2%]">
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Monster Type:</div>
                        <div><MonsterTypeDropDownComponent monstertypeprops={monstertypeprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Spell Type:</div>
                        <div><SpellTypeDropDownComponent spelltypeprops={spelltypeprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Trap Type:</div>
                        <div><TrapTypeDropDownComponent traptypeprops={traptypeprops}/></div>
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
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                        <div className="w-[80%]"><LevelSliderComponent levelprops={levelprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Pend Scale:</div>
                        <div className="w-[80%]"><PendScaleSliderComponent pendprops={pendprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Link Value:</div>
                        <div className="w-[80%]"><LinkScaleSliderComponent linkprops={linkprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <span className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Attack</span>
                        <div><AtkFilterComponent atkfilterprops={atkfilterprops}/></div>
                    </div>
                    <div className="flex w-full items-center">
                        <span className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Defense</span>
                        <div><DefFilterComponent deffilterprops={deffilterprops}/></div>
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
    ) : null};

export default FilterOwnedCards