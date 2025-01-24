"use client"
 
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { CaretDownIcon, CaretRightIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { MobileMonsterTypeDropDownComponent } from "./mobilefilterdropdowncomponents/mobilemonstertypedropdown"
import { MobileSpellTypeDropDownComponent } from "./mobilefilterdropdowncomponents/mobilespelltypedropdown"
import { MobileTrapTypeDropDownComponent } from "./mobilefilterdropdowncomponents/mobiletraptypedropdown"
import { MobileAttributeDropDownComponent } from "./mobilefilterdropdowncomponents/mobileattributecomponent"
import MobileLevelFilterComponent from "./mobilefilterdropdowncomponents/mobilelevelfiltercomponent"
import MobilePendFilterComponent from "./mobilefilterdropdowncomponents/mobilependfiltercomponent"
import MobileLinkFilterComponent from "./mobilefilterdropdowncomponents/mobilelinkfiltercomponent"
import MobileAtkFilterComponent from "./mobilefilterdropdowncomponents/mobileatkfiltercomponent"
import MobileDefFilterComponent from "./mobilefilterdropdowncomponents/mobiledeffiltercomponent"
import { MobileSetDropDownComponent } from "./mobilefilterdropdowncomponents/mobilesetComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FilterSidebar } from "../types/searchfiltercomptypes"

 
export function MobileSearchFilterDrawer({ filterprops }: FilterSidebar) {
    const {
        filterActive,
        cardData,
        setCanClearFilters,
        monsterType, setMonsterType,
        spellType, setSpellType,
        trapType, setTrapType,
        attributeType, setAttributeType,
        setName, setSetName,
        levelFilter, setLevelFilter,
        lessThanEqual, setLessThanEqual,
        equal, setEqual,
        greaterThanEqual, setGreaterThanEqual,
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
        defGreaterThanEqual, setDefGreaterThanEqual
    } = filterprops

    const uniqueSetNames = Array.isArray(cardData) ? Array.from(
        cardData.reduce((set, card) => {
          card.card_sets?.forEach((setData: any) => {
            if (setData.set_name) set.add(setData.set_name);
          });
          return set;
        }, new Set<string>())
    ): [];
  
    const [levelDropdown, setLevelDropdown] = useState(false);
    const [pendDropdown, setPendDropdown] = useState(false);
    const [linkDropdown, setLinkDropdown] = useState(false);

    const handleLevelFilter = () => {
        setLevelDropdown(prevState => !prevState);
    }
    
    const handlePendFilter = () => {
        setPendDropdown(prevState => !prevState);
    }
    
    const handleLinkFilter = () => {
        setLinkDropdown(prevState => !prevState);
    }

    const monsterdropdownprops = {
        setCanClearFilters,
        monsterType, setMonsterType,
        setSpellType,
        setTrapType,
        setAttributeType,
      }
  
      const spelldropdownprops = {
        setCanClearFilters,
        setMonsterType,
        spellType, setSpellType,
        setTrapType,
        setAttributeType,
      }
  
      const trapdropdownprops = {
        setCanClearFilters,
        setMonsterType,
        setSpellType,
        trapType, setTrapType,
        setAttributeType,
      }
  
      const attributedropdownprops = {
        setCanClearFilters,
        attributeType, setAttributeType,
      }
  
      const levelfilterprops = {
        setCanClearFilters,
        levelFilter, setLevelFilter,
        lessThanEqual, setLessThanEqual,
        equal, setEqual,
        greaterThanEqual, setGreaterThanEqual,
      }
  
    const pendfilterprops = {
        setCanClearFilters,
        pendFilter, setPendFilter,
        pendLessThanEqual, setPendLessThanEqual,
        pendEqual, setPendEqual,
        pendGreaterThanEqual, setPendGreaterThanEqual,
    }
  
    const linkfilterprops = {
        setCanClearFilters,
        linkFilter, setLinkFilter,
        linkLessThanEqual, setLinkLessThanEqual,
        linkEqual, setLinkEqual,
        linkGreaterThanEqual, setLinkGreaterThanEqual,
    }
  
    const atkfilterprops = {
        setCanClearFilters,
        atkFilter, setAtkFilter,
        atkLessThanEqual, setAtkLessThanEqual,
        atkEqual, setAtkEqual,
        atkGreaterThanEqual, setAtkGreaterThanEqual
    }
  
    const deffilterprops = {
        setCanClearFilters,
        defFilter, setDefFilter,
        defLessThanEqual, setDefLessThanEqual,
        defEqual, setDefEqual,
        defGreaterThanEqual, setDefGreaterThanEqual
    }
  
    const setfilterprops = {
        setCanClearFilters,
        setName,
        setSetName,
        uniqueSetNames
    }
 
    return (
        <Drawer modal={false}>
        <DrawerTrigger asChild>
            <Button className={`h-[40px] text-white ml-2 px-4 py-3 rounded-xl ${filterActive ? "bg-[hsl(var(--filterbutton))]" : "bg-gray-600"}`} variant="default">
                Filter Cards
            </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-[hsl(var(--editdeckdraganddropbackground))] border-transparent px-[5vw]">
            <div className="mx-auto max-w-full">
                <DrawerHeader className="flex w-full justify-between">
                    <DrawerTitle className="text-3xl text-[hsl(var(--background3))]">Filter Search</DrawerTitle>
                    <DrawerClose className="bg-transparent">
                        <FontAwesomeIcon icon={faXmarkCircle} className="fa-xl text-gray-400"/>
                    </DrawerClose>
                </DrawerHeader>
                <div className="flex w-full justify-between items-center min-h-6 my-2 ">
                    <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Monster Type: </div>
                    <div><MobileMonsterTypeDropDownComponent monsterdropdownprops={monsterdropdownprops}/></div>
                </div>
                <div className="flex justify-between items-center w-full min-h-6 my-2">
                    <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Spell Type: </div>
                    <div><MobileSpellTypeDropDownComponent spelldropdownprops={spelldropdownprops}/></div>
                </div>
                <div className="flex justify-between items-center w-full min-h-6 my-2">
                    <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Trap Type: </div>
                    <div><MobileTrapTypeDropDownComponent trapdropdownprops={trapdropdownprops}/></div>
                </div>
                <div className="flex justify-between items-center w-full min-h-6 my-2">
                    <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Attribute: </div>
                    <div><MobileAttributeDropDownComponent attributedropdownprops={attributedropdownprops}/></div>
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                    <button className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" onClick={handleLevelFilter}>
                        Level / Rank:
                        {levelDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                    </button>
                    {levelDropdown && (
                        <MobileLevelFilterComponent levelfilterprops={levelfilterprops}/>
                    )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                    <button className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" onClick={handlePendFilter}>
                        Pendulum Value:
                        {pendDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                    </button>
                    {pendDropdown && (
                        <MobilePendFilterComponent pendfilterprops={pendfilterprops}/>
                    )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                    <button className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" onClick={handleLinkFilter}>
                        Link Rating:
                        {linkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                    </button>
                    {linkDropdown && (
                        <MobileLinkFilterComponent linkfilterprops={linkfilterprops}/>
                    )}
                </div>
                <MobileAtkFilterComponent atkfilterprops={atkfilterprops}/>
                <MobileDefFilterComponent deffilterprops={deffilterprops}/>
                <div className="flex justify-between w-full items-center min-h-6 my-2">
                    <div className='flex h-full w-fit font-black text-[hsl(var(--text))] items-center'>Set: </div>
                    <div><MobileSetDropDownComponent setfilterprops={setfilterprops}/></div>
                </div>
            </div>
        </DrawerContent>
        </Drawer>
    )
}