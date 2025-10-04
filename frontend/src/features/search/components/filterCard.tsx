import { useState} from 'react';
/*import { MonsterTypeDropDownComponent } from "./dropdowncomponents/monstertypedropdown"
import { SpellTypeDropDownComponent } from "./dropdowncomponents/spelltypedropdown"
import { TrapTypeDropDownComponent } from "./dropdowncomponents/traptypedropdown" 
import { AttributeDropDownComponent } from "./dropdowncomponents/attributecomponent"
import { SetDropDownComponent } from "./dropdowncomponents/setComponent"*/
import { CaretDownIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { FilterSidebar } from '../../../shared/types/cardSearchFilter';
/*import LevelFilterComponent from './components/levelfiltercomponent';
import AtkFilterComponent from './components/atkfiltercomponent';
import DefFilterComponent from './components/deffiltercomponent';
import PendFilterComponent from './components/pendfiltercomponent';
import LinkFilterComponent from './components/linkfiltercomponent';*/
import { DropDown } from './dropDown';
import { AttributeTypes, MonsterTypes, SpellTypes, TrapTypes } from '@/shared/utils/dropDownItems';
import InputFilter from '../util/inputFilter';
import { SetDropDownComponent } from '@/features/search/components/set';


const FilterCardComponent = ({ filterprops }: FilterSidebar) => {
    const {
      cardData,
      setCanClearFilters,
      expandStatus,
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
        card.card_sets?.forEach(setData => {
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
        <div className="w-full flex">
            <div className={`flex text-[hsl(var(--text))] text-sm h-fit py-[3vh] ${expandStatus ? "w-full bg-[hsl(var(--ownedcardcollection))] border-[hsl(var(--background3))] border-2 rounded-xl" : "w-0"} flex-col`}>
              {expandStatus && (
                <>
                <div className="font-black text-2xl w-full text-center mb-2">Filter Search</div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Monster Type: </div>
                  <div>
                    <DropDown 
                      value = {monsterType}
                      setValue = {setMonsterType}
                      items={MonsterTypes.map(m => ({ value: m.monsterType, label: m.label }))}
                      onSelectOptional={(newValue) => {
                          setSpellType("");          // clear other filters
                          setTrapType("");
                          setCanClearFilters(!!newValue);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Spell Type: </div>
                  <div>
                    <DropDown 
                      value = {spellType}
                      setValue = {setSpellType}
                      items={SpellTypes.map(m => ({ value: m.spellType, label: m.label }))}
                      onSelectOptional={(newValue) => {
                          setMonsterType("");          // clear other filters
                          setTrapType("");
                          setCanClearFilters(!!newValue);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Trap Type: </div>
                  <div>
                    <DropDown 
                      value = {trapType}
                      setValue = {setTrapType}
                      items={TrapTypes.map(m => ({ value: m.trapType, label: m.label }))}
                      onSelectOptional={(newValue) => {
                          setMonsterType("");          // clear other filters
                          setSpellType("");
                          setCanClearFilters(!!newValue);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Attribute: </div>
                  <div>
                    <DropDown 
                      value = {attributeType}
                      setValue = {setAttributeType}
                      items={AttributeTypes.map(m => ({ value: m.attributeType, label: m.label }))}
                      onSelectOptional={(newValue) => {setCanClearFilters(!!newValue)}}
                    />
                  </div>
                </div>
                  
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button 
                    className="flex w-[85%] justify-between text-left font-black" 
                    onClick={() => setLevelDropdown(prevState => !prevState)}>
                    Level / Rank:
                    {levelDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {levelDropdown && (
                    <InputFilter
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
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button 
                    className="flex w-[85%] justify-between text-left font-black" 
                    onClick={() => setPendDropdown(prevState => !prevState)}
                  >
                    Pendulum Value:
                    {pendDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {pendDropdown && (
                    <InputFilter
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
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button 
                    className="flex w-[85%] justify-between text-left font-black" 
                    onClick={() => setLinkDropdown(prevState => !prevState)}
                  >
                    Link Rating:
                    {linkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {linkDropdown && (
                    <InputFilter
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
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button 
                    className="flex w-[85%] justify-between text-left font-black" 
                    onClick={() => setAtkDropdown(prevState => !prevState)}
                  >
                    Attack:
                    {atkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {atkDropdown && (
                    <InputFilter
                      filterValue={atkFilter}
                      setFilterValue={setAtkFilter}
                      lessThanEqual={atkLessThanEqual}
                      setLessThanEqual={setAtkLessThanEqual}
                      equal={atkEqual}
                      setEqual={setAtkEqual}
                      greaterThanEqual={atkGreaterThanEqual}
                      setGreaterThanEqual={setAtkGreaterThanEqual}
                      setCanClearFilters={setCanClearFilters}
                      minNumber={0}
                      maxNumber={5000}
                    />
                  )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button 
                    className="flex w-[85%] justify-between text-left font-black" 
                    onClick={() => setDefDropdown(prevState => !prevState)}
                  >
                    Defense:
                    {defDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {defDropdown && (
                    <InputFilter
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
                  <div className="flex justify-center w-full items-center min-h-6 my-2">
                    <div className='flex h-full w-[6vw] font-black items-center'>Set: </div>
                    <div><SetDropDownComponent setfilterprops={setfilterprops}/></div>
                  </div>
                </div>
                </>
              )}
        </div>
    </div>
    )
}

export default FilterCardComponent;