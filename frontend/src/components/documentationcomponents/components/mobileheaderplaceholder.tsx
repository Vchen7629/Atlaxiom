import { ModeToggle } from "@/components/shadcn_components/darklightmode/mode-toggle";
import { faBook, faBox, faCaretDown, faRightFromBracket, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MobileHeaderDarkModePlaceholder() {
    return (
        <header className="relative justify-between items-center w-full flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
            <div className="absolute left-[3vw] top-1/2 transform -translate-y-1/2 z-10">
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
            <div className="absolute left-2 xl:relative"><ModeToggle/></div>
            <div className="absolute left-[40%] text-[hsl(var(--background3))] bg-transparent font-black text-xl md:text-3xl">Atlaxiom</div>
            <div className='flex w-fit justify-between items-center space-x-[1vw]'>
                <div className="flex text-sm bg-[hsl(var(--profile))] h-8 px-3 items-center justify-between rounded-3xl text-[hsl(var(--background3))]  border-2 border-[hsl(var(--background3))]">   
                    <FontAwesomeIcon icon={faUser}/>
                    <div className="mx-2"> Username</div>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </div>
            </div>
        </header>
    )
}

export function MobileHeaderSignUpPlaceholder() {
    return (
        <div className="h-[16vh] w-full">
            <header className="relative justify-between items-center w-full flex py-2 text-[hsl(var(--text))] bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
                <div className="absolute right-[5vw] translate-y-[150%] transform z-10">
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
                <div className="absolute left-2 xl:relative"><ModeToggle/></div>
                <div className="absolute left-[40%] text-[hsl(var(--background3))] bg-transparent font-black text-xl md:text-3xl">Atlaxiom</div>
                <div className='flex flex-col w-fit justify-between items-center space-x-[1vw]'>
                    <span className="text-3xl text-[hsl(var(--background3))]">☰</span>
                </div>
                <div className='absolute flex flex-col p-2 space-y-2 right-0 top-14 h-24 w-[9%] bg-[hsl(var(--header))] border-2 border-[hsl(var(--background3))] text-lg '>
                    <span className="text-sm">Card Search</span>
                    <span className="text-sm">Login</span>
                    <span className="text-sm">Signup</span>
                </div>
            </header>
        </div>
    )
}

export function MobileHeaderSearchbarPlaceholder() {
    return (
        <div className="h-[16vh] w-full">
            <header className="relative justify-between items-center w-full flex py-2 text-[hsl(var(--text))] bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
                <div className="absolute right-[5vw] translate-y-[65%] transform z-10">
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
                <div className="absolute left-2 xl:relative"><ModeToggle/></div>
                <div className="absolute left-[40%] text-[hsl(var(--background3))] bg-transparent font-black text-xl md:text-3xl">Atlaxiom</div>
                <div className='flex flex-col w-fit justify-between items-center space-x-[1vw]'>
                    <span className="text-3xl text-[hsl(var(--background3))]">☰</span>
                </div>
                <div className='absolute flex flex-col p-2 space-y-2 right-0 top-14 h-24 w-[9%] bg-[hsl(var(--header))] border-2 border-[hsl(var(--background3))] text-lg '>
                    <span className="text-sm">Card Search</span>
                    <span className="text-sm">Login</span>
                    <span className="text-sm">Signup</span>
                </div>
            </header>
        </div>
    )
}

export function MobileHeaderCollectionPlaceholder() {
    return (
        <div className="h-[16vh] w-full">
            <header className="relative justify-between items-center w-full flex py-2 text-[hsl(var(--text))] bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
                <div className="absolute right-[8vw] translate-y-[160%] transform z-10">
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
                <div className="absolute left-2 xl:relative"><ModeToggle/></div>
                <div className="absolute left-[40%] text-[hsl(var(--background3))] bg-transparent font-black text-xl md:text-3xl">Atlaxiom</div>
                <div className="flex text-sm h-8 w-32 px-2 bg-[hsl(var(--profile))] border-2 border-[hsl(var(--background3))] justify-between items-center text-[hsl(var(--profile))] rounded-3xl">
                    <FontAwesomeIcon icon={faUser} className="text-[hsl(var(--background3))]"/>
                    <span className="ml-2 text-[hsl(var(--text))]">User </span>
                    <FontAwesomeIcon icon={faCaretDown} className="text-[hsl(var(--background3))]"/>
                </div>
                <div className='absolute flex flex-col p-2 space-y-3 right-3 top-14 h-42 w-[13%] bg-[hsl(var(--header))] border-2 border-[hsl(var(--background3))] rounded-lg text-lg '>
                    <div className="flex text-sm items-center space-x-2 pl-3">
                        <FontAwesomeIcon icon={faUser} className="text-[hsl(var(--background3))]"/>
                        <span>My Profile</span>
                    </div>
                    <div className="flex text-sm items-center space-x-2 pl-3">
                        <FontAwesomeIcon icon={faSearch} className="text-[hsl(var(--background3))]"/>
                        <span>Card Search</span>
                    </div>
                    <div className="flex text-sm items-center space-x-2 pl-3">
                        <FontAwesomeIcon icon={faBox} className="text-[hsl(var(--background3))]"/>
                        <span>Collection</span>
                    </div>
                    <div className="flex text-sm items-center space-x-2 pl-3">
                        <FontAwesomeIcon icon={faBook} className="text-[hsl(var(--background3))]"/>
                        <span>Decks</span>
                    </div>
                    <div className="flex text-sm items-center space-x-2 pl-3 text-red-400">
                        <FontAwesomeIcon icon={faRightFromBracket}/>
                        <span>Logout</span>
                    </div>
                </div>
            </header>
        </div>
    )
}