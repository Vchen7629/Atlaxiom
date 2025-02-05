import { faArrowRotateRight, faBars, faGripHorizontal, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MobileFilterButtonPlaceholder() {
    return (
        <main className="flex-col relative space-y-2 justify-between items-center w-1/4 flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
            <div className="absolute left-[8vw] top-[80%] transform -translate-y-1/2 z-10">
                <svg 
                    width="60" 
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
            <span className="text-goldenrod text-3xl">Card Search </span>
            <div className="w-full h-8 flex">
                <div className="flex items-center px-2 bg-transparent border-2 border-gray-400 w-[87%] h-8">
                    <FontAwesomeIcon icon={faSearch} className="fa-xs"/>
                    <span className="text-xs text-gray-300 ml-2">Enter Card Name</span>
                </div>
                <div className="flex items-center justify-center rounded-lg p-2 ml-1 round-lg bg-gray-600"><FontAwesomeIcon icon={faArrowRotateRight} className="fa-xs"/></div>
            </div>
            <div className="space-x-1 flex w-full ">
               <div className='flex bg-footer rounded-lg'>
                    <span className={`text-white p-1 px-2 rounded-xl mr-2 bg-[hsl(var(--background3))]`}>
                        <FontAwesomeIcon icon={faBars} className="fa-xs"/>
                    </span>
                    <span className={`text-gray-400 p-1 rounded-xl mr-2 bg-transparent`}>
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-xs"/>
                    </span>
                </div>
                <span className="flex items-center justify-center ml-1 px-2 py-2 rounded-xl text-xs bg-gray-600 text-white"> Filter Card</span>
            </div>
        </main>
    )
}