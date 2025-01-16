import { useState} from 'react';
import { MonsterTypeDropDownComponent } from "./dropdowncomponents/monstertypedropdown"
import { SpellTypeDropDownComponent } from "./dropdowncomponents/spelltypedropdown"
import { TrapTypeDropDownComponent } from "./dropdowncomponents/traptypedropdown" 
import { AttributeDropDownComponent } from "./dropdowncomponents/attributecomponent"
import { SetDropDownComponent } from "./dropdowncomponents/setComponent"
import { CaretDownIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { FilterSidebar } from '../types/searchfiltercomptypes';
import LevelFilterComponent from './components/levelfiltercomponent';
import AtkFilterComponent from './components/atkfiltercomponent';
import DefFilterComponent from './components/deffiltercomponent';
import PendFilterComponent from './components/pendfiltercomponent';
import LinkFilterComponent from './components/linkfiltercomponent';


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

    //console.log(uniqueSetNames);

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
        <div className="w-full flex">
            <div className={`flex text-[hsl(var(--text))] text-sm h-fit py-[3vh] ${expandStatus ? "w-full bg-[hsl(var(--ownedcardcollection))] border-gray-600 border-2 rounded-3xl" : "w-0"} flex-col`}>
              {expandStatus && (
                <>
                <div className="font-black text-2xl w-full text-center mb-2">Filter Search</div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Monster Type: </div>
                  <div><MonsterTypeDropDownComponent monsterdropdownprops={monsterdropdownprops}/></div>
                </div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Spell Type: </div>
                  <div><SpellTypeDropDownComponent spelldropdownprops={spelldropdownprops}/></div>
                </div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Trap Type: </div>
                  <div><TrapTypeDropDownComponent trapdropdownprops={trapdropdownprops}/></div>
                </div>
                <div className="flex justify-center items-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Attribute: </div>
                  <div><AttributeDropDownComponent attributedropdownprops={attributedropdownprops}/></div>
                </div>
                  
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleLevelFilter}>
                    Level / Rank:
                    {levelDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {levelDropdown && (
                    <LevelFilterComponent levelfilterprops={levelfilterprops}/>
                  )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handlePendFilter}>
                    Pendulum Value:
                    {pendDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {pendDropdown && (
                    <PendFilterComponent pendfilterprops={pendfilterprops}/>
                  )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleLinkFilter}>
                    Link Rating:
                    {linkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {linkDropdown && (
                    <LinkFilterComponent linkfilterprops={linkfilterprops}/>
                  )}
                </div>
                <AtkFilterComponent atkfilterprops={atkfilterprops}/>
                <DefFilterComponent deffilterprops={deffilterprops}/>
                <div className="flex justify-center w-full items-center min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center text-white'>Set: </div>
                  <div><SetDropDownComponent setfilterprops={setfilterprops}/></div>
                </div>
                </>
              )}   
            </div>
    </div>
    )
}

export default FilterCardComponent;