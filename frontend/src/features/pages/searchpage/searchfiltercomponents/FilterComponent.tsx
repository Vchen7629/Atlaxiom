import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faGreaterThanEqual, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { PendSliderComponent } from "./slidercomponents/pendslider"
import { LinkSliderComponent } from "./slidercomponents/linkslider"
import { MonsterTypeDropDownComponent } from "./dropdowncomponents/monstertypedropdown"
import { SpellTypeDropDownComponent } from "./dropdowncomponents/spelltypedropdown"
import { TrapTypeDropDownComponent } from "./dropdowncomponents/traptypedropdown" 
import { AttributeDropDownComponent } from "./dropdowncomponents/attributecomponent"
import { SetDropDownComponent } from "./dropdowncomponents/setComponent"
import { CaretDownIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { FilterSidebar } from '../types/searchfiltercomptypes';
import LevelFilterComponent from './components/levelfiltercomponent';


const FilterCardComponent = ({ filterprops }: FilterSidebar) => {
    const {
      expandStatus,
      monsterType,
      setMonsterType,
      spellType,
      setSpellType,
      trapType,
      setTrapType,
      attributeType,
      setAttributeType,
      levelFilter,
      setLevelFilter,
      lessThanEqual,
      setLessThanEqual,
      equal,
      setEqual,
      greaterThanEqual,
      setGreaterThanEqual,
      setPendFilter,
      setLinkFilter,
    } = filterprops

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
      monsterType,
      setMonsterType,
      setSpellType,
      setTrapType,
      setAttributeType,
    }

    const spelldropdownprops = {
      setMonsterType,
      spellType,
      setSpellType,
      setTrapType,
      setAttributeType,
    }

    const trapdropdownprops = {
      setMonsterType,
      setSpellType,
      trapType,
      setTrapType,
      setAttributeType,
    }

    const attributedropdownprops = {
      attributeType,
      setAttributeType,
    }

    const levelfilterprops = {
      levelFilter,
      setLevelFilter,
      lessThanEqual,
      setLessThanEqual,
      equal,
      setEqual,
      greaterThanEqual,
      setGreaterThanEqual,
    }

    return (
        <div className="w-full flex">
    
            <div className={`flex text-[hsl(var(--text))] text-sm h-full pt-[3vh] ${expandStatus ? "w-full bg-[hsl(var(--ownedcardcollection))] border-gray-600 border-2 rounded-3xl" : "w-0"} flex-col`}>
              {expandStatus && (
                <>
                <div className="font-black text-2xl w-full text-center mb-2">Filter Search</div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Monster Type: </div>
                  <div><MonsterTypeDropDownComponent monsterdropdownprops={monsterdropdownprops}/></div>
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Spell Type: </div>
                  <div><SpellTypeDropDownComponent spelldropdownprops={spelldropdownprops}/></div>
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center'>Trap Type: </div>
                  <div><TrapTypeDropDownComponent trapdropdownprops={trapdropdownprops}/></div>
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
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
                    <div className="flex flex-col space-y-2 w-[85%] items-center">
                      <div className="flex w-full"><PendSliderComponent setPendFilter={setPendFilter}/></div>
                      <div className="flex justify-between w-full mr-2">
                        <div className="flex w-[30%]">
                          <button className="bg-footer h-7 px-2"><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                          <button className="bg-footer h-7 px-2"><FontAwesomeIcon icon={faEquals}/></button>
                          <button className="bg-footer h-7 px-2"><FontAwesomeIcon icon={faLessThanEqual}/></button>
                        </div>
                        <input
                          className="flex text-center bg-footer border-2 ml-2 w-[30%] border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2 space-y-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleLinkFilter}>
                    Link Rating:
                    {linkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {linkDropdown && (
                    <div className="flex flex-col space-y-2 w-[85%] items-center">
                      <div className="flex w-full"><LinkSliderComponent setLinkFilter={setLinkFilter}/></div>
                      <div className="flex justify-between w-full mr-2">
                        <div className="flex w-[30%]">
                          <button className="bg-footer h-7 px-2"><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                          <button className="bg-footer h-7 px-2"><FontAwesomeIcon icon={faEquals}/></button>
                          <button className="bg-footer h-7 px-2"><FontAwesomeIcon icon={faLessThanEqual}/></button>
                        </div>
                        <input
                          className="flex text-center bg-footer border-2 ml-2 w-[30%] border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-center my-2">   
                    <div className="flex items-center max-w-[85%] justify-center">
                        <div className="mr-2">Attack:</div>
                        <button className="bg-footer h-7 w-[8%]"><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                        <button className="bg-footer h-7 w-[8%]"><FontAwesomeIcon icon={faEquals}/></button>
                        <button className="bg-footer h-7 w-[8%]"><FontAwesomeIcon icon={faLessThanEqual}/></button>
                        <input
                            className="flex text-center bg-footer border-2 ml-2 w-[50%] border-transparent"
                          />
                    </div>
                </div>
                <div className="flex w-full justify-center my-2">   
                    <div className="flex items-center max-w-[85%] justify-center">
                        <div className="mr-2">Defense:</div>
                        <button className="bg-footer h-7 w-[8%]"><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                        <button className="bg-footer h-7 w-[8%]"><FontAwesomeIcon icon={faEquals}/></button>
                        <button className="bg-footer h-7 w-[8%]"><FontAwesomeIcon icon={faLessThanEqual}/></button>
                        <input
                            className="flex text-center bg-footer border-2 ml-2 w-[50%] border-transparent"
                          />
                    </div>
                </div>
                <div className="flex w-full justify-center my-2">
                  Forbidden List Status
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[5vw] font-black items-center text-white'>Set: </div>
                  <div><SetDropDownComponent/></div>
                </div>
                </>
              )}   
            </div>
    </div>
    )
}

export default FilterCardComponent;