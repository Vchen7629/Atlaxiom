import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faGreaterThanEqual, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { LevelSliderComponent } from "../../my-cards/filtersidebarcomponents/slidercomponents/levelslider"
import { PendSliderComponent } from "../../../../components/shadcn_components/sliders/pendslider"
import { LinkSliderComponent } from "../../../../components/shadcn_components/sliders/linkslider"
import { MonsterTypeDropDownComponent } from "./dropdowncomponents/monstertypedropdown"
import { SpellTypeDropDownComponent } from "./dropdowncomponents/spelltypedropdown"
import { TrapTypeDropDownComponent } from "./dropdowncomponents/traptypedropdown" 
import { AttributeDropDownComponent } from "./dropdowncomponents/attributecomponent"
import { SetDropDownComponent } from "./dropdowncomponents/setComponent"
import { CaretDownIcon, CaretRightIcon } from '@radix-ui/react-icons';
import { FilterSidebar } from '../types/searchfiltercomptypes';


const FilterCardComponent = ({ filterprops }: FilterSidebar) => {
    const {
      expandStatus,
      setMonsterType,
      setSpellType,
      setTrapType,
      setAttributeType,
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

    return (
        <div className="w-full flex">
    
            <div className={`flex text-sm h-full pt-[3vh] ${expandStatus ? "w-full bg-[hsl(var(--background4))] border-gray-600 border-2 rounded-3xl" : "w-0"} flex-col`}>
              {expandStatus && (
                <>
                <div className="font-black text-2xl w-full text-center mb-2">Filter Search</div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center text-white'>Monster Type: </div>
                  <div><MonsterTypeDropDownComponent setMonsterType={setMonsterType}/></div>
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center text-white'>Spell Type: </div>
                  <div><SpellTypeDropDownComponent setSpellType={setSpellType}/></div>
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center text-white'>Trap Type: </div>
                  <div><TrapTypeDropDownComponent setTrapType={setTrapType}/></div>
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center text-white'>Attribute: </div>
                  <div><AttributeDropDownComponent setAttributeType={setAttributeType}/></div>
                </div>
                  
                <div  className="flex flex-col w-full items-center min-h-6 my-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleLevelFilter}>
                    Level / Rank:
                    {levelDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {levelDropdown && (
                    <div className="flex w-[85%] items-center">
                      <div className="flex w-[24%] mr-2">
                      <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                      <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faEquals}/></button>
                      <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faLessThanEqual}/></button>
                      </div>
                      <div className="flex w-full">
                        <LevelSliderComponent/>
                        <input
                          className="flex text-center bg-footer border-2 ml-2 w-[30%] border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handlePendFilter}>
                    Pendulum Value:
                    {pendDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {pendDropdown && (
                    <div className="flex w-[85%] items-center">
                      <div className="flex w-[24%] mr-2">
                        <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                        <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faEquals}/></button>
                        <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faLessThanEqual}/></button>
                      </div>
                      <div className="flex w-full">
                        <PendSliderComponent/>
                        <input
                          className="flex text-center bg-footer border-2 ml-2 w-[30%] border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleLinkFilter}>
                    Link Rating:
                    {linkDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {linkDropdown && (
                    <div className="flex w-[85%] items-center">
                      <div className="flex w-[24%] mr-2">
                        <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faGreaterThanEqual}/></button>
                        <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faEquals}/></button>
                        <button className="bg-footer h-7 w-1/3"><FontAwesomeIcon icon={faLessThanEqual}/></button>
                      </div>
                      <div className="flex w-full">
                        <LinkSliderComponent/>
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