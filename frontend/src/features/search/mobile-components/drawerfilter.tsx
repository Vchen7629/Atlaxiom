"use client"
 
import { Button } from "@/shared/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer"
import { CaretDownIcon, CaretRightIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { MobileSetDropDownComponent } from "./set"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons"
import { FilterSidebar } from "../../../shared/types/cardSearchFilter"
import { MobileDropDown } from "./dropDown"
import { AttributeTypes, MonsterTypes, SpellTypes, TrapTypes } from "@/shared/utils/dropDownItems"
import MobileInputFilter from "../util/mobileInputFilter"

 
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
          card.card_sets?.forEach((setData) => {
            if (setData.set_name) set.add(setData.set_name);
          });
          return set;
        }, new Set<string>())
    ): [];
  
    const [levelDropdown, setLevelDropdown] = useState(false);
    const [pendDropdown, setPendDropdown] = useState(false);
    const [linkDropdown, setLinkDropdown] = useState(false);
    const [atkDropdown, setAtkDropdown] = useState(false);
    const [defDropdown, setDefDropdown] = useState(false);
  
    const setfilterprops = {
        setCanClearFilters,
        setName,
        setSetName,
        uniqueSetNames
    }
 
    return (
        <Drawer modal={false}>
            <DrawerTrigger asChild>
                <Button className={`h-11 border-2 text-[hsl(var(--text))] font-bold shadow-lg ml-2 px-4 py-3 rounded-xl ${filterActive ? "bg-[hsl(var(--filterbutton))]" : "bg-[hsl(var(--contrast))]"}`} variant="default">
                    Filter Cards
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-[hsl(var(--editdeckdraganddropbackground))] border-transparent px-[5vw]">
                <div className="mx-auto max-w-full">
                    <DrawerHeader className="flex w-full justify-between">
                        <DrawerTitle className="text-3xl text-[hsl(var(--background3))]">Filter Search</DrawerTitle>
                        <DrawerClose className="bg-transparent">
                            <FontAwesomeIcon icon={faXmarkSquare} className="fa-2xl text-[hsl(var(--background3))]"/>
                        </DrawerClose>
                    </DrawerHeader>
                    <div className="flex w-full justify-between items-center min-h-6 my-2 ">
                        <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Monster Type: </div>
                        <div>
                        <MobileDropDown
                            value={monsterType}
                            setValue={setMonsterType}
                            items={MonsterTypes.map(m => ({ value: m.monsterType, label: m.label }))}
                            onSelectOptional={(newValue) => {
                                setSpellType("");          
                                setTrapType("");
                                setCanClearFilters(!!newValue);
                            }}
                        />
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full min-h-6 my-2">
                        <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Spell Type: </div>
                        <div>
                        <MobileDropDown
                            value={spellType}
                            setValue={setSpellType}
                            items={SpellTypes.map(m => ({ value: m.spellType, label: m.label }))}
                            onSelectOptional={(newValue) => {
                                setMonsterType("");          
                                setTrapType("");
                                setCanClearFilters(!!newValue);
                            }}
                        />
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full min-h-6 my-2">
                        <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Trap Type: </div>
                        <div>
                        <MobileDropDown
                            value={trapType}
                            setValue={setTrapType}
                            items={TrapTypes.map(m => ({ value: m.trapType, label: m.label }))}
                            onSelectOptional={(newValue) => {
                                setSpellType("");          
                                setMonsterType("");
                                setCanClearFilters(!!newValue);
                            }}
                        />
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full min-h-6 my-2">
                        <div className='flex h-full w-fit font-black items-center text-[hsl(var(--text))]'>Attribute: </div>
                        <div>
                        <MobileDropDown
                            value={attributeType}
                            setValue={setAttributeType}
                            items={AttributeTypes.map(m => ({ value: m.attributeType, label: m.label }))}
                            onSelectOptional={(newValue) => setCanClearFilters(!!newValue)}
                        />
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                        <button 
                            className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" 
                            onClick={() => setLevelDropdown(prevState => !prevState)}>
                            Level / Rank:
                            {levelDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                        </button>
                        {levelDropdown && (
                            <MobileInputFilter
                                filterValue={levelFilter}
                                setFilterValue={setLevelFilter}
                                lessThanEqual={lessThanEqual}
                                setLessThanEqual={setLessThanEqual}
                                equal={equal}
                                setEqual={setEqual}
                                greaterThanEqual={greaterThanEqual}
                                setGreaterThanEqual={setGreaterThanEqual}
                                setCanClearFilters={setCanClearFilters}
                                minNumber={1}
                                maxNumber={12}
                            />
                        )}
                    </div>
                    <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                        <button 
                            className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" 
                            onClick={() => setPendDropdown(prevState => !prevState)}
                        >
                            Pendulum Value:
                            {pendDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                        </button>
                        {pendDropdown && (
                            <MobileInputFilter
                                filterValue={pendFilter}
                                setFilterValue={setPendFilter}
                                lessThanEqual={pendLessThanEqual}
                                setLessThanEqual={setPendLessThanEqual}
                                equal={pendEqual}
                                setEqual={setPendEqual}
                                greaterThanEqual={pendGreaterThanEqual}
                                setGreaterThanEqual={setPendGreaterThanEqual}
                                setCanClearFilters={setCanClearFilters}
                                minNumber={1}
                                maxNumber={13}
                            />
                        )}
                    </div>
                    <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                        <button 
                            className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" 
                            onClick={() => setLinkDropdown(prevState => !prevState)}
                        >
                            Link Rating:
                            {linkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                        </button>
                        {linkDropdown && (
                            <MobileInputFilter
                                filterValue={linkFilter}
                                setFilterValue={setLinkFilter}
                                lessThanEqual={linkLessThanEqual}
                                setLessThanEqual={setLinkLessThanEqual}
                                equal={linkEqual}
                                setEqual={setLinkEqual}
                                greaterThanEqual={linkGreaterThanEqual}
                                setGreaterThanEqual={setLinkGreaterThanEqual}
                                setCanClearFilters={setCanClearFilters}
                                minNumber={1}
                                maxNumber={6}
                            />
                        )}
                    </div>
                    <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                        <button 
                            className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" 
                            onClick={() => setAtkDropdown(prevState => !prevState)}
                        >
                            Attack:
                            {atkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                        </button>
                        {atkDropdown && (
                            <MobileInputFilter
                                filterValue={atkFilter}
                                setFilterValue={setAtkFilter}
                                lessThanEqual={atkLessThanEqual}
                                setLessThanEqual={setAtkLessThanEqual}
                                equal={atkEqual}
                                setEqual={setAtkEqual}
                                greaterThanEqual={atkGreaterThanEqual}
                                setGreaterThanEqual={setAtkGreaterThanEqual}
                                setCanClearFilters={setCanClearFilters}
                                minNumber={1}
                                maxNumber={5000}
                            />
                        )}
                    </div>
                    <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2 bg-transparent">
                        <button 
                            className="flex w-full justify-between text-left text-[hsl(var(--text))] font-black" 
                            onClick={() => setDefDropdown(prevState => !prevState)}
                        >
                            Defense:
                            {defDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                        </button>
                        {defDropdown && (
                            <MobileInputFilter
                                filterValue={defFilter}
                                setFilterValue={setDefFilter}
                                lessThanEqual={defLessThanEqual}
                                setLessThanEqual={setDefLessThanEqual}
                                equal={defEqual}
                                setEqual={setDefEqual}
                                greaterThanEqual={defGreaterThanEqual}
                                setGreaterThanEqual={setDefGreaterThanEqual}
                                setCanClearFilters={setCanClearFilters}
                                minNumber={1}
                                maxNumber={5000}
                            />
                        )}
                    </div>
                    <div className="flex justify-between w-full items-center min-h-6 my-2">
                        <div className='flex h-full w-fit font-black text-[hsl(var(--text))] items-center'>Set: </div>
                        <div><MobileSetDropDownComponent setfilterprops={setfilterprops}/></div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}