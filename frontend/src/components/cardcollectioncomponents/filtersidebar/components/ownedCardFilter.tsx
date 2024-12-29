import { AttributeDropDownComponent } from "../dropdown/attributedropdown.tsx"
import { ArchetypeDropDownComponent } from "../dropdown/archetypedropdown.tsx"
import { SubTypeDropDownComponent } from "../dropdown/subtypedrowndown.tsx"
import { CardSetDropDownComponent } from "../dropdown/cardsetdropdown.tsx"
import { LevelSliderComponent } from '../sliders/levelslider.tsx';
import MyCardsSearchbarComponent from '../../components/searchbar.tsx';
import { OwnedCardsFilterProps } from "../../types/ownedcardfiltertypes.ts";
import { RarityDropDownComponent } from "../dropdown/raritydropdown.tsx";

const FilterOwnedCards = ({ filterProps }: OwnedCardsFilterProps) => {
    const {
        expandStatus,
        searchTerm, setSearchTerm,
        setCardTypeFilter,
        isMonsterFilterActive, setIsMonsterFilterActive,
        monsterCount, 
        setIsSpellFilterActive, isSpellFilterActive,
        spellCount,
        isTrapFilterActive, setIsTrapFilterActive,
        trapCount,
        uniqueSubtype,
        subTypeFilter, setSubTypeFilter,
        uniqueAttribute,
        attributeFilter, setAttributeFilter,
        uniqueArchtype,
        archeTypeFilter, setArcheTypeFilter,
        setLevelFilter,
        uniqueSet,
        setFilter, setSetFilter,
        uniqueRarity,
        rarityFilter, setRarityFilter,
        filterpage, setFilterPage,
        statisticspage, setStatisticsPage,
        setListCurrentPage,
        setGalleryCurrentPage,
      } = filterProps;
    

    const handleMonsterFilter = () => {
        setCardTypeFilter('monster');
        setListCurrentPage(1);
        setGalleryCurrentPage(1);
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
        setAttributeFilter('');
        setArcheTypeFilter('');
        setLevelFilter(0);
        setRarityFilter('');
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

    const searchbarprops = { searchTerm, setSearchTerm }

    const subtypeprops = {
        uniqueSubtype,
        subTypeFilter, setSubTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const attributeprops = {
        uniqueAttribute,
        attributeFilter, setAttributeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const archetypeprops = {
        uniqueArchtype,
        archeTypeFilter, setArcheTypeFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const rarityprops = {
        uniqueRarity,
        rarityFilter, setRarityFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const levelprops = {
        setLevelFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
    }

    const setprops = {
        uniqueSet,
        setFilter, setSetFilter,
        setListCurrentPage,
        setGalleryCurrentPage,
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

                <section className="flex w-[92%] h-10 ">
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
                </section>
                
                <section className="flex flex-col w-[92%] items-start">
                    <div className="flex mt-[5%] w-full">
                        <div className="flex h-full w-[7vw] text-sm font-black items-center text-[hsl(var(--text))] ">Card Subtype:</div>
                        <SubTypeDropDownComponent subtypeprops={subtypeprops}/>
                    </div>
                    <div className="flex mt-[5%] w-full">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))] ">Card Attribute:</div>
                        <AttributeDropDownComponent attributeprops={attributeprops}/>
                    </div>
                    <div className="flex mt-[5%] w-full">
                        <div className="flex h-full w-[7vw] text-sm  items-center font-black text-[hsl(var(--text))] ">Card Archetype:</div>
                        <ArchetypeDropDownComponent archetypeprops={archetypeprops}/>
                    </div>
                    <div className="flex mt-[5%] w-full">
                        <div className="flex h-full w-[10vw] text-sm  items-center font-black text-[hsl(var(--text))]">Card Level:</div>
                        <LevelSliderComponent levelprops={levelprops}/>
                    </div>
                    <div className="flex mt-[5%] w-full ">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))]">Rarity:</div>
                        <RarityDropDownComponent rarityprops={rarityprops}/>
                    </div>
                    <div className="flex mt-[5%] w-full ">
                        <div className="flex h-full w-[7vw] text-sm items-center font-black text-[hsl(var(--text))]">Card Set:</div>
                        <CardSetDropDownComponent setprops={setprops}/>
                    </div>
                </section>
            </>
        )}
            
        </>
    )}

export default FilterOwnedCards