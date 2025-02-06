import { faArrowRotateRight, faBars, faFilter, faGripHorizontal, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MobileCollectionFilterButtonPlaceholder() {
    return (
        <main className="flex-col relative space-y-2 justify-between items-center w-1/4 flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
            <div className="absolute left-[-4.5vw] translate-y-[110%] transform z-10">
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
            <span className="text-goldenrod text-3xl">Card Search </span>
            <div className="w-full h-8 flex">
                <div className="flex items-center px-2 bg-transparent border-2 border-gray-400 w-full h-8">
                    <FontAwesomeIcon icon={faSearch} className="fa-xs"/>
                    <span className="text-xs text-gray-300 ml-2">Enter Card Name</span>
                </div>
            </div>
            <div className="space-x-1 flex w-full ">
                <div className="flex justify-center items-center space-x-2 px-2 rounded-md bg-gray-700">
                    <FontAwesomeIcon icon={faFilter} className="fa-xs"/>
                    <span className="text-xs text-white"> Filter</span>
                </div>
                <div className="flex justify-center items-center space-x-2 ml-1 px-2 rounded-md bg-blue-500">
                    <FontAwesomeIcon icon={faPlusCircle} className="fa-xs"/>
                    <span className="text-xs text-white"> Add Card</span>
                </div>
                <div className="flex items-center justify-center rounded-lg p-2 ml-1 round-lg bg-gray-600">
                    <FontAwesomeIcon icon={faArrowRotateRight} className="fa-xs"/>
                </div>
                <div className='flex bg-footer rounded-lg'>
                    <span className="text-white p-1 px-2 rounded-xl mr-2 bg-[hsl(var(--background3))]">
                        <FontAwesomeIcon icon={faBars} className="fa-xs"/>
                    </span>
                    <span className="text-gray-400 p-1 rounded-xl  bg-transparent">
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-xs"/>
                    </span>
                </div>
            </div>
        </main>
    )
}

export function MobileCollectionAddCardButtonPlaceholder() {
    return (
        <main className="flex-col relative space-y-2 justify-between items-center w-1/4 flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
            <div className="absolute right-[5vw] top-[90%] transform translate-y-2 z-10">
                <svg 
                    width="80" 
                    height="60" 
                    viewBox="0 0 100 100" 
                    className="scale-x-[-1]" 
                >
                    <path
                        d="M20,80 L80,20 L65,20 M80,20 L80,35"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-[hsl(var(--background3))]"
                    />
                </svg>
            </div>
            <span className="text-goldenrod text-3xl">Card Search </span>
            <div className="w-full h-8 flex">
                <div className="flex items-center px-2 bg-transparent border-2 border-gray-400 w-full h-8">
                    <FontAwesomeIcon icon={faSearch} className="fa-xs"/>
                    <span className="text-xs text-gray-400 ml-2">Enter Card Name</span>
                </div>
            </div>
            <div className="space-x-1 flex w-full ">
                <div className="flex justify-center items-center space-x-2 px-2 rounded-md bg-gray-700">
                    <FontAwesomeIcon icon={faFilter} className="fa-xs"/>
                    <span className="text-xs text-white"> Filter</span>
                </div>
                <div className="flex justify-center items-center space-x-2 ml-1 px-2 rounded-md bg-blue-500">
                    <FontAwesomeIcon icon={faPlusCircle} className="fa-xs"/>
                    <span className="text-xs text-white"> Add Card</span>
                </div>
                <div className="flex items-center justify-center rounded-lg p-2 ml-1 round-lg bg-gray-600">
                    <FontAwesomeIcon icon={faArrowRotateRight} className="fa-xs"/>
                </div>
                <div className='flex bg-footer rounded-lg'>
                    <span className="text-white p-1 px-2 rounded-xl mr-2 bg-[hsl(var(--background3))]">
                        <FontAwesomeIcon icon={faBars} className="fa-xs"/>
                    </span>
                    <span className="text-gray-400 p-1 rounded-xl  bg-transparent">
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-xs"/>
                    </span>
                </div>
            </div>
        </main>
    )
}