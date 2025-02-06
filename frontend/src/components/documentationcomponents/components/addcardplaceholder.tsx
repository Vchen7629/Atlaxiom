import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import cardIcon from "../../../../img/blue-eyes-abyss-dragon.jpg"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export function AddCardPlaceholder() {
    return (
        // skipcq: JS-0415
        <div className="relative flex flex-col bg-gray-600 space-y-[2vh] ml-2 w-[40vw] h-[40vh] px-[1vw] pt-[1vh] rounded-lg"> 
            <div className="absolute right-[-3vw] top-1/2 transform translate-y-[-100%] z-10">
                <svg 
                    width="90" 
                    height="70" 
                    viewBox="0 0 100 60"
                    className="scale-x-[-1]" 
                >
                <path
                    d="M10,30 L80,30 L70,20 M80,30 L70,40"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-[hsl(var(--background3))]"
                />
                </svg>
            </div>
            <div className="flex w-full items-center justify-between">
                <span className="text-[hsl(var(--text))] font-bold text-xl">Add Card to collection</span>
                <div className="flex px-2 py-1 rounded-lg text-center bg-transparent border-2 border-[hsl(var(--background3))]">
                    <span className="text-sm text-[hsl(var(--text))]">Back to Card Search</span>
                </div>
            </div>
            <div className="flex w-full space-x-[2vw]">
                <img src={cardIcon} alt="image for placeholder card blue-eyes abyss dragon" className="h-[20vh]"/>
                <div className="w-[40vw] flex flex-col space-y-[1vh]">
                    <span className="text-xl text-[hsl(var(--background3))] font-bold">Blue-Eyes Abyss Dragon</span>
                    <p className="text-xs w-full text-white">
                        If this card is Special Summoned: You can add 1 Ritual Spell or 1 &quot;Polymerization&quot; from your Deck to your hand.
                        During your End Phase: You can add 1 Level 8 or higher Dragon monster from your Deck to your hand. You can banish 
                        this card from your GY; all Level 8 or higher Dragon monsters you control gain 1000 ATK. You can only use each effect 
                        of &quot;Blue-Eyes Abyss Dragon&quot; once per turn, and can only activate them while "Blue-Eyes White Dragon" is on your field 
                        or in your GY.
                    </p>
                    <div className="flex space-x-8">
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm text-[hsl(var(--background3))]">Card Type</span>
                            <span className="text-xs text-[hsl(var(--text))]">Effect Monster</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm text-[hsl(var(--background3))]">Archetype</span>
                            <span className="text-xs text-[hsl(var(--text))]">Blue-eyes</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm text-[hsl(var(--background3))]">Race</span>
                            <span className="text-xs text-[hsl(var(--text))]">Dragon</span>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <span className="text-xs text-[hsl(var(--background3))]">Attack: </span>
                        <span className="text-xs text-[hsl(var(--text))] pr-8">2500</span>
                        <span className="text-xs text-[hsl(var(--background3))]">Defense</span>
                        <span className="text-xs text-[hsl(var(--text))]">2500</span>
                </div>
            </div>
                <div className="flex flex-col space-y-2 w-[30vw] items-center">
                    <span className="text-lg text-[hsl(var(--background3))]">Card Sets</span>
                    <div className="flex items-center w-full px-2 py-1 bg-[hsl(var(--background1))] rounded-lg">
                        <span className="text-xs text-[hsl(var(--text))] max-w-[40%]">25th anniversary rarity collection </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[20%]">RA01-EN016 </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[20%]">Super Rare </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[10%] mr-2">$0</span>
                        <div className="flex items-center justify-center py-1 text-sm bg-[hsl(var(--background3))] rounded-sm w-[10%]">
                            <FontAwesomeIcon icon={faPlus} className="fa-xs"/>
                        </div>
                    </div>
                    <div className="flex items-center w-full px-2 py-1 bg-[hsl(var(--background1))] rounded-lg">
                        <span className="text-xs text-[hsl(var(--text))] max-w-[40%]">25th anniversary rarity collection </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[20%]">RA01-EN016 </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[20%]">Ultra Rare </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[10%] mr-2">$0</span>
                        <div className="flex items-center justify-center py-1 text-sm bg-[hsl(var(--background3))] rounded-sm w-[10%]">
                            <FontAwesomeIcon icon={faPlus} className="fa-xs"/>
                        </div>
                    </div>
                    <div className="flex items-center w-full px-2 py-1 bg-[hsl(var(--background1))] rounded-lg">
                        <span className="text-xs text-[hsl(var(--text))] max-w-[35%]">Legendary Duelists: Season 2</span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[20%]">LDS2-EN015 </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[20%]">Secret Rare </span>
                        <span className="text-xs text-[hsl(var(--text))] max-w-[15%] mr-3">$27</span>
                        <div className="flex items-center justify-center py-1 text-sm bg-[hsl(var(--background3))] rounded-sm w-[10%]">
                            <FontAwesomeIcon icon={faPlus} className="fa-xs"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}