import { AttributeDropDownComponent } from "../dropdown/attributedropdown.tsx"
import { ArchetypeDropDownComponent } from "../dropdown/archetypedropdown.tsx"
import { CardSetDropDownComponent } from "../dropdown/cardsetdropdown.tsx"
import { LevelSliderComponent } from '../sliders/levelslider.tsx';
import { OwnedCardsFilterProps } from "../../types/ownedcardfiltertypes.ts";
import { RarityDropDownComponent } from "../dropdown/raritydropdown.tsx";
import { useEffect, useState } from "react";
import { Card } from "../../types/ownedcarddetailstypes.ts";
import { MonsterTypeDropDownComponent } from "../dropdown/monstertypedropdown.tsx";
import { SpellTypeDropDownComponent } from "../dropdown/spelltypedropdown.tsx";
import { TrapTypeDropDownComponent } from "../dropdown/traptypedropdown.tsx";
import { PendScaleSliderComponent } from "../sliders/pendscaleslider.tsx";
import { LinkScaleSliderComponent } from "../sliders/linkvalueslider.tsx";
import AtkFilterComponent from "./atkfiltercomponent.tsx";
import DefFilterComponent from "./deffiltercomponent.tsx";

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmarkSquare } from "@fortawesome/free-solid-svg-icons";

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
          const allCards: Card[] = Object.values(ownedCards?.entities?.defaultId?.ownedCards || {}).flat().filter(card => card) as Card[];

          const monsterTypeList = new Set(allCards.filter((card: any) => card.type.includes("Monster")).map((card: any) => card.race).filter(race => race));
          setUniqueMonsterType([...monsterTypeList])

          const spellTypeList = new Set(allCards.filter((card: any) => card.type.includes("Spell")).map((card: any) => card.race).filter(race => race));
          setUniqueSpellType([...spellTypeList])

          const trapTypeList = new Set(allCards.filter((card: any) => card.type.includes("Trap")).map((card: any) => card.race).filter(race => race));
          setUniqueTrapType([...trapTypeList])
    
          const attributeList = new Set(allCards.map((card: any) => card.attribute).filter(attribute => attribute));
          setUniqueAttribute([...attributeList])
    
          const archetypeList = new Set(allCards.map((card: any) => card.archetype).filter(archetype => archetype));
          setUniqueArchetype([...archetypeList])
    
          const setList = new Set(allCards.map((card: any) => card.set_name).filter(set_name => set_name));
          setUniqueSet([...setList])
    
          const rarityList = new Set(allCards.map((card: any) => card.rarity).filter(rarity => rarity));
          setUniqueRarity([...rarityList])
    
        }
      }, [ownedCards]);

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
                            <div className="flex h-full w-fit text-sm font-black items-center text-[hsl(var(--text))] ">Monster Type:</div>
                            <div><MonsterTypeDropDownComponent monstertypeprops={monstertypeprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm font-black items-center text-[hsl(var(--text))] ">Spell Type:</div>
                            <div><SpellTypeDropDownComponent spelltypeprops={spelltypeprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm font-black items-center text-[hsl(var(--text))] ">Trap Type:</div>
                            <div><TrapTypeDropDownComponent traptypeprops={traptypeprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm items-center font-black text-[hsl(var(--text))] ">Card Attribute:</div>
                            <div><AttributeDropDownComponent attributeprops={attributeprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))] ">Card Archetype:</div>
                            <ArchetypeDropDownComponent archetypeprops={archetypeprops}/>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                            <div className="w-[80%]"><LevelSliderComponent levelprops={levelprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Pend Scale:</div>
                            <div className="w-[80%]"><PendScaleSliderComponent pendprops={pendprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Link Value:</div>
                            <div className="w-[80%]"><LinkScaleSliderComponent linkprops={linkprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <span className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Attack</span>
                            <div><AtkFilterComponent atkfilterprops={atkfilterprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <span className="flex h-full w-fit text-sm  items-center font-black text-[hsl(var(--text))]">Defense</span>
                            <div><DefFilterComponent deffilterprops={deffilterprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm items-center font-black text-[hsl(var(--text))]">Rarity:</div>
                            <div><RarityDropDownComponent rarityprops={rarityprops}/></div>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex h-full w-fit text-sm items-center font-black text-[hsl(var(--text))]">Card Set:</div>
                            <div><CardSetDropDownComponent setprops={setprops}/></div>
                        </div>
                    </section>
                </div> 
            </DrawerContent>
        </Drawer>
    )}

export default MobileFilterDrawerComponent