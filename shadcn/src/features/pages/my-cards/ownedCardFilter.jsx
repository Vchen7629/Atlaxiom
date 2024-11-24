import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AttributeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/attributedropdown"
import { ArchetypeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/archetypedropdown"
import { SubTypeDropDownComponent } from "../../../components/shadcn_components/dropdown_components/subtypedrowndown"
import { CardSetDropDownComponent } from "../../../components/shadcn_components/dropdown_components/cardsetdropdown"
import { LevelSliderComponent } from '../../../components/shadcn_components/sliders/levelslider';


const FilterOwnedCards = ({ filterProps }) => {
    const {
        searchTerm,
        setSearchTerm,
        setCardTypeFilter,
        isMonsterFilterActive, 
        monsterCount, 
        setIsMonsterFilterActive,
        isSpellFilterActive,
        spellCount,
        setIsSpellFilterActive,
        isTrapFilterActive,
        trapCount,
        setIsTrapFilterActive,
        uniqueSubtype,
        subTypeFilter,
        setSubTypeFilter,
        uniqueArchtype,
        archeTypeFilter,
        setArcheTypeFilter,
        uniqueSet,
        setFilter,
        setSetFilter,
      } = filterProps;
    

    const handleMonsterFilter = () => {
        setCardTypeFilter('monster');
        setIsMonsterFilterActive(true);
        setIsSpellFilterActive(false);
        setIsTrapFilterActive(false);
      }
    
      const handleSpellFilter = () => {
        setCardTypeFilter('spell');
        setIsMonsterFilterActive(false);
        setIsSpellFilterActive(true);
        setIsTrapFilterActive(false);
      }
    
      const handleTrapFilter = () => {
        setCardTypeFilter('trap');
        setIsMonsterFilterActive(false);
        setIsSpellFilterActive(false);
        setIsTrapFilterActive(true);
      }
      const clearFilter = () => {
        setCardTypeFilter('');
        setIsMonsterFilterActive(false);
        setIsSpellFilterActive(false);
        setIsTrapFilterActive(false);
        setSubTypeFilter('');
        setArcheTypeFilter('');
        setSetFilter('');
      }

      const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
      }

      const handleClearClick = () => {
        setSearchTerm('')
      }

    return (
        <>
        <div className="relative w-[90%] flex h-11 items-center  rounded-2xl border-2 border-gray-500">
            <FontAwesomeIcon icon={faSearch} className="text-xl ml-4"/>
            <input 
                className="pl-[3%] w-full bg-transparent outline-none"
                type="text"
                value={searchTerm}
                onChange={handleSearchTerm}
                placeholder="Search Cards... "
            />
            <button className="curser-pointer absolute right-[3%] top-[19%] text-gray-400 bg-transparent border-transparent fa-xl" onClick={handleClearClick}>
                <FontAwesomeIcon icon={faTimes}/>
            </button>
            </div>
            <button className="w-[30%] rounded-3xl h-8 bg-cyan-500 border-2 border-black my-8" onClick={clearFilter}>Clear</button>
            <div className="flex w-[92%] max-w-[100%] h-10">
                <button
                    className={`w-[37%] flex ${isMonsterFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                    onClick={handleMonsterFilter}
                >
                    <div className="bg-[url('../img/monstercardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                    <div className='w-fit h-full text-[14px] flex items-center'>Monster Cards ({monsterCount})</div>
                </button>
                <button
                    className={`w-[32%] flex ${isSpellFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                    onClick={handleSpellFilter}
                >
                    <div className="bg-[url('../img/spellcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                    <div className='w-fit h-full text-[14px] flex items-center'>Spell Cards ({spellCount})</div>
                </button>
                <button
                    className={`w-[31%] flex ${isTrapFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                    onClick={handleTrapFilter}
                >
                    <div className="bg-[url('../img/trapcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                    <div className='w-fit h-full text-[14px] flex items-center'>Trap Cards ({trapCount})</div>
                </button>
            </div>
            <div className="flex mt-[5%] w-[22vw] justify-between">
                <div className="flex h-full w-[7vw] text-sm justify-center font-black items-center text-[hsl(var(--text))] ">Card Subtype:</div>
                <SubTypeDropDownComponent subtypes={uniqueSubtype} subTypeFilter={subTypeFilter}  setSubTypeFilter={setSubTypeFilter}/>
            </div>
            <div className="flex mt-[5%] w-[22vw] justify-between ">
                <div className="flex h-full w-[7vw] text-sm justify-center items-center font-black text-[hsl(var(--text))] ">Card Attribute:</div>
                <AttributeDropDownComponent/>
            </div>
            <div className="flex mt-[5%] w-[22vw] justify-between">
                <div className="flex h-full w-[7vw] text-sm justify-center items-center font-black text-[hsl(var(--text))] ">Card Archetype:</div>
                <ArchetypeDropDownComponent archetypes={uniqueArchtype} archeTypeFilter={archeTypeFilter}  setArcheTypeFilter={setArcheTypeFilter}/>
            </div>
            <div className="flex mt-[5%] w-[22vw] ">
                <div className="flex h-full w-[7vw] text-sm justify-center items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                <LevelSliderComponent className="w-[55%]"/>
                <div className="ml-2">Text</div>
            </div>
            <div className="flex mt-[5%] w-[22vw]">
                <div className="flex h-full w-[7vw] text-sm justify-center items-center font-black text-[hsl(var(--text))]">Card Set:</div>
                <CardSetDropDownComponent sets={uniqueSet} setFilter={setFilter} setSetFilter={setSetFilter}/>
            </div>
        </>
    )}

export default FilterOwnedCards