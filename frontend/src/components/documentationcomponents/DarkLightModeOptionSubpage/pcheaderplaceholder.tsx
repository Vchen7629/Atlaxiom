import { ModeToggle } from "@/components/shadcn_components/darklightmode/mode-toggle";
import { faBook, faBox, faCaretDown, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PcHeaderPlaceholder() {
    return (
        <header className="relative justify-between items-center w-full flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
            <div className="absolute right-[10vw] top-1/2 transform -translate-y-1/2 z-10">
                <svg 
                    width="90" 
                    height="70" 
                    viewBox="0 0 100 60" 
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
            <div className="flex space-x-2">
                <div className="flex text-sm h-8 px-4 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg">
                    <FontAwesomeIcon icon={faSearch} rotation={90} />
                    <span className="ml-2">Card Search </span>
                </div>
                <div className="flex text-sm h-8 px-4 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg">
                    <FontAwesomeIcon icon={faBox}/>
                    <span className="ml-2">Collection</span>
                </div>
                <div className="flex text-sm h-8 px-4 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg">
                    <FontAwesomeIcon icon={faBook}/>
                    <span className="ml-2">My Decks</span>
                </div>
            </div>
            <div className="absolute left-1/2 text-[hsl(var(--background3))] bg-transparent font-black text-xl md:text-3xl">Atlaxiom</div>
            <div className='flex w-fit justify-between items-center space-x-[1vw]'>
                <div className="absolute left-2 xl:relative"><ModeToggle/></div>
                <div className="flex text-sm bg-[hsl(var(--profile))] h-8 px-3 items-center justify-between rounded-3xl text-[hsl(var(--background3))]  border-2 border-[hsl(var(--background3))]">   
                    <FontAwesomeIcon icon={faUser}/>
                    <div className="mx-2"> Username</div>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </div>
            </div>
        </header>
    )
}