import { OwnedCardsFilterProps } from "../types/mobile.ts";
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { MobileDropDownComponent } from "./dropDown.tsx";
import { FilterSliderComponent } from "../components/slider.tsx";
import { SetFilterValues } from "../types/mobile.ts";

const MobileFilterDrawerComponent = ({ filterProps }: OwnedCardsFilterProps) => {
    const {
        setCanClearFilter,
        ownedCards,
        filterActive,
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

    const levelprops = {
        valueFilter: levelFilter,
        setValueFilter: setLevelFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
        setCanClearFilter,
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

    return (
        <Drawer modal={false}>
            <DrawerTrigger asChild>
                <Button className={`text-white h-9 px-2 rounded-md ${filterActive ? "bg-[hsl(var(--filterbutton))]" : "bg-gray-600"}`} variant="default">
                    <FontAwesomeIcon className="mr-2" icon={faFilter}/>Filter
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto max-w-full">
                    <DrawerHeader className="flex w-full justify-between">
                        <DrawerTitle className="text-3xl text-[hsl(var(--background3))]">Filter Owned Cards</DrawerTitle>
                            <DrawerClose className="bg-transparent">
                                <FontAwesomeIcon icon={faXmarkSquare} className="fa-2xl text-[hsl(var(--background3))]"/>
                            </DrawerClose>
                    </DrawerHeader>
                    <section className="flex flex-col pl-2 items-center  space-y-[1%]">
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full  w-fit text-sm font-black items-center text-[hsl(var(--text))] ">Monster Type:</div>
                            <MobileDropDownComponent 
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
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm font-black items-center text-[hsl(var(--text))] ">Spell Type:</div>
                            <MobileDropDownComponent 
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
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm font-black items-center text-[hsl(var(--text))] ">Trap Type:</div>
                            <MobileDropDownComponent 
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
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm items-center font-black text-[hsl(var(--text))] ">Card Attribute:</div>
                            <MobileDropDownComponent 
                                value = {attributeFilter}
                                setValue = {setAttributeFilter}
                                items={uniqueAttribute.map(type => ({ label: type, value: type }))}
                                onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                                type={"attribute"}
                            />
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))] ">Card Archetype:</div>
                            <MobileDropDownComponent 
                                value = {archeTypeFilter}
                                setValue = {setArcheTypeFilter}
                                items={uniqueArchtype.map(type => ({ label: type, value: type }))}
                                onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                                type={"archetype"}
                            />
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                            <div className="w-[80%]"><FilterSliderComponent {...levelprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Pend Scale:</div>
                            <div className="w-[80%]"><FilterSliderComponent {...pendprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Link Value:</div>
                            <div className="w-[80%]"><FilterSliderComponent {...linkprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <span className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Attack</span>
                            <FilterSliderComponent {...atkprops}/>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <span className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Defense</span>
                            <FilterSliderComponent {...defprops}/>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm items-center font-black text-[hsl(var(--text))]">Rarity:</div>
                            <MobileDropDownComponent 
                                value = {rarityFilter}
                                setValue = {setRarityFilter}
                                items={uniqueRarity.map(type => ({ label: type, value: type }))}
                                onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                                type={"rarity"}
                            />
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm items-center font-black text-[hsl(var(--text))]">Card Set:</div>
                            <MobileDropDownComponent 
                                value = {setFilter}
                                setValue = {setSetFilter}
                                items={uniqueSet.map(type => ({ label: type, value: type }))}
                                onSelectOptional={(newValue) => setCanClearFilter(!!newValue)}
                                type={"set"}
                            />
                        </div>
                    </section>
                </div> 
            </DrawerContent>
        </Drawer>
    )}

export default MobileFilterDrawerComponent