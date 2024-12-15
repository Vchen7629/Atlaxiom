import { AttributeDropDownComponent } from "../../../../components/shadcn_components/dropdown_components/attributedropdown"
import { ArchetypeDropDownComponent } from "../../../../components/shadcn_components/dropdown_components/archetypedropdown"
import { SubTypeDropDownComponent } from "../../../../components/shadcn_components/dropdown_components/subtypedrowndown"
import { CardSetDropDownComponent } from "../../../../components/shadcn_components/dropdown_components/cardsetdropdown"
import { LevelSliderComponent } from '../../../../components/shadcn_components/sliders/levelslider';
import MyCardsSearchbarComponent from './searchbar.tsx';
import { OwnedCardsFilterProps } from "../types/ownedcardfiltertypes";

const FilterOwnedCards = ({ filterProps }: OwnedCardsFilterProps) => {
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
        filterpage,
        setFilterPage,
        statisticspage,
        setStatisticsPage,
        expandStatus,
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

      const handleFilterClick = () => {
        setFilterPage(true)
        setStatisticsPage(false)
      }

      const handleStatisticsClick = () => {
        setFilterPage(false)
        setStatisticsPage(true)
      }

      const searchbarprops = {
        searchTerm,
        setSearchTerm,
      }

    
    return (
        <>
        {expandStatus && (
            <>
            <section className="items-center h-8 flex mb-8 justify-between bg-gray-600 rounded-2xl">
                <button className={`px-4 rounded-2xl w-fit h-8 font-black ${filterpage ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent text-gray-400"}`} onClick={handleFilterClick}>Filter Cards</button>
                <button className={`px-4 rounded-2xl w-fit h-8 font-black ${statisticspage ? "bg-[hsl(var(--background3))]" : "bg-transparent text-gray-400"}`} onClick={handleStatisticsClick}>Collection Statistics</button>
            </section>
            <section className="flex w-[90%] items-center mb-6 justify-between">
                <MyCardsSearchbarComponent searchbarprops={searchbarprops} />   
                <button 
                    className="w-[20%] rounded-xl h-8 bg-[hsl(var(--background3))] " 
                    onClick={clearFilter}
                >
                    Clear 
                </button>
            </section>

            <div className="flex w-[92%] h-10">
                <button
                    className={`w-[37%] flex ${isMonsterFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                    onClick={handleMonsterFilter}
                >
                    <div className="bg-[url('../img/monstercardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                    <div className='w-fit h-full text-[12px] flex items-center'>Monster Cards ({monsterCount})</div>
                </button>
                <button
                    className={`w-[32%] flex ${isSpellFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                    onClick={handleSpellFilter}
                >
                    <div className="bg-[url('../img/spellcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                    <div className='w-fit h-full text-[12px] flex items-center'>Spell Cards ({spellCount})</div>
                </button>
                <button
                    className={`w-[31%] flex ${isTrapFilterActive ? 'text-gold' : 'text-[hsl(var(--text))]'} focus:outline-none`}
                    onClick={handleTrapFilter}
                >
                    <div className="bg-[url('../img/trapcardicon.png')] relative bg-contain bg-no-repeat h-full w-1/4 "/>
                    <div className='w-fit h-full text-[12px] flex items-center'>Trap Cards ({trapCount})</div>
                </button>
            </div>
            <section className="flex flex-col w-[92%] items-start">
                <div className="flex mt-[5%] w-full">
                    <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Card Subtype:</div>
                    <SubTypeDropDownComponent subtypes={uniqueSubtype} subTypeFilter={subTypeFilter}  setSubTypeFilter={setSubTypeFilter}/>
                </div>
                <div className="flex mt-[5%] w-full">
                    <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))] ">Card Attribute:</div>
                    <AttributeDropDownComponent/>
                </div>
                <div className="flex mt-[5%] w-full">
                    <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))] ">Card Archetype:</div>
                    <ArchetypeDropDownComponent archetypes={uniqueArchtype} archeTypeFilter={archeTypeFilter}  setArcheTypeFilter={setArcheTypeFilter}/>
                </div>
                <div className="flex mt-[5%] w-full">
                    <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                    <LevelSliderComponent className="w-[55%]"/>
                    <div className="ml-2">Text</div>
                </div>
                <div className="flex mt-[5%] w-full ">
                    <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))]">Card Set:</div>
                    <CardSetDropDownComponent sets={uniqueSet} setFilter={setFilter} setSetFilter={setSetFilter}/>
                </div>
            </section>
            </>
        )}
            
        </>
    )}

export default FilterOwnedCards