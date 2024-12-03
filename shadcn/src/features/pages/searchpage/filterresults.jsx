import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faGreaterThanEqual, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { LevelSliderComponent } from "../../../components/shadcn_components/sliders/levelslider"
import { PendSliderComponent } from "../../../components/shadcn_components/sliders/pendslider"
import { LinkSliderComponent } from "../../../components/shadcn_components/sliders/linkslider"
import { MonsterTypeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/monstertypedrowndown"
import { RarityDropDownComponent} from "../../../components/shadcn_components/dropdown_components/raritydropdown"
import { CaretDownIcon, CaretRightIcon } from '@radix-ui/react-icons';


const FilterResults = ({ expandStatus }) => {
    const [spellDropdown, setSpellDropdown] = useState(false);
    const [trapDropdown, setTrapDropdown] = useState(false);
    const [attributeDropdown, setAttributeDropdown] = useState(false);
    const [levelDropdown, setLevelDropdown] = useState(false);
    const [pendDropdown, setPendDropdown] = useState(false);
    const [linkDropdown, setLinkDropdown] = useState(false);

    const handleSpellFilter = () => {
        setSpellDropdown(prevState => !prevState);
    }
    
    const handleTrapFilter = () => {
        setTrapDropdown(prevState => !prevState);
    }
    
    const handleAttributeFilter = () => {
        setAttributeDropdown(prevState => !prevState);
    }
    
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
        <div className="w-full flex justify-end items-center">
    
            <div className={`flex  text-sm h-full ${expandStatus ? "w-full bg-[hsl(var(--background4))]" : "w-0"} flex-col pt-[25%]`}>
              {expandStatus && (
                <>
                <div className="font-black text-2xl w-full text-center">Filter Search</div>
                <div className="flex flex-col w-full items-center min-h-6 my-2">Monster Type</div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[6vw] font-black items-center text-white'>Monster Type: </div>
                  <div><MonsterTypeDropDownComponent/></div>
                </div>
                <div className="flex justify-center w-full min-h-6 my-2">
                  <div className='flex h-full w-[5vw] font-black items-center text-white'>Rarity: </div>
                  <div><RarityDropDownComponent/></div>
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleSpellFilter}>
                    Spell:
                    {spellDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button> 
                  {spellDropdown && (
                    <div className='flex w-full justify-center items-center '>
                      <button className="w-[12%] h-full bg-footer"> All </button>
                      <button className="w-[12%] ml-[1px] h-full bg-[url('../img/cardtypeicons/normalspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-full bg-[url('../img/cardtypeicons/continuousspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-full bg-[url('../img/cardtypeicons/fieldspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-full bg-[url('../img/cardtypeicons/equipspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-full bg-[url('../img/cardtypeicons/quickplayspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-full bg-[url('../img/cardtypeicons/ritualspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleTrapFilter}>
                    Trap:
                    {trapDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button>
                  {trapDropdown && (
                    <div className='flex items-center w-[88%]'>
                      <button className="w-[24%] h-6 bg-footer"> All </button>
                      <button className="w-[24%] ml-[1px] h-6 bg-[url('../img/cardtypeicons/normalspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[24%] ml-[1px] h-6 bg-[url('../img/cardtypeicons/continuousspell.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[24%] ml-[1px] h-6 bg-[url('../img/cardtypeicons/countertrap.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                    </div>
                  )} 
                </div>
                <div className="flex flex-col w-full items-center min-h-6 my-2">
                  <button className="flex w-[85%] justify-between text-left font-black" onClick={handleAttributeFilter}>
                    Attribute:
                    {attributeDropdown ? (<CaretDownIcon className="h-6 w-6 text-gold"/>): (<CaretRightIcon className="h-6 w-6"/>)}
                  </button> 
                  {attributeDropdown && (
                    <div className='flex w-full justify-center items-center '>
                      <button className="w-[12%] h-6 bg-[url('../img/attributeicons/dark.png')] bg-no-repeat bg-center bg-contain  bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-6 bg-[url('../img/attributeicons/divine.png')] bg-no-repeat bg-center bg-contain bg-footer "/>
                      <button className="w-[12%] ml-[1px] h-6 bg-[url('../img/attributeicons/earth.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-6 bg-[url('../img/attributeicons/fire.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-6 bg-[url('../img/attributeicons/light.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-6 bg-[url('../img/attributeicons/wind.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                      <button className="w-[12%] ml-[1px] h-6 bg-[url('../img/attributeicons/water.png')] bg-no-repeat bg-center bg-contain bg-footer"/>
                    </div>
                  )}
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
                
                <div>Set</div>
                </>
              )}   
            </div>
    </div>
    )
}

export default FilterResults;