import {  faBars, faFilter, faGripHorizontal, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PcCollectionFilterButtonPlaceholder() {
    return (
        <main className="relative justify-between items-center w-[80%] flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
            <div className="absolute right-[15vw] top-[60%] transform translate-y-2 z-10">
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
            <div className="flex flex-col ml-[2vw]">
                <span className=" text-goldenrod">My Collection</span>
                <span className="text-xs text-gray-400">Last Edited: 2025-02-06 05:31:59</span>
            </div>
            <div className="ml-[-3vw] w-1/2 h-8 flex">
                <div className="flex items-center px-2 bg-transparent border-2 border-[hsl(var(--background3))] w-1/2 h-8">
                    <FontAwesomeIcon icon={faSearch} className="fa-xs"/>
                    <span className="text-xs text-gray-300 ml-2">Enter Card Name</span>
                </div>
                <div className="flex justify-center items-center space-x-2 ml-2 px-3 py-1 rounded-md bg-gray-700">
                    <FontAwesomeIcon icon={faFilter} className="fa-xs"/>
                    <span className="text-xs text-white"> Filter</span>
                </div>
                <div className="flex justify-center items-center space-x-2 ml-2 px-2 py-1 rounded-md bg-blue-500">
                    <FontAwesomeIcon icon={faPlusCircle} className="fa-xs"/>
                    <span className="text-xs text-white"> Add Card</span>
                </div>
            </div>
            <div className="space-x-1 flex w-fit">
               <div className='flex bg-footer rounded-lg'>
                    <span className="text-white p-1 px-2 rounded-xl mr-2 bg-[hsl(var(--background3))]">
                        <FontAwesomeIcon icon={faBars} className="fa-xs"/>
                    </span>
                    <span className="text-gray-400 p-1 rounded-xl mr-1 bg-transparent">
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-xs"/>
                    </span>
                </div>
            </div>
        </main>
    )
}

export function PcCollectionAddCardButtonPlaceholder() {
    return (
        <main className="relative justify-between items-center w-[80%] flex py-2 text-white bg-[hsl(var(--header))] bg-opacity-60 px-2.5">
            <div className="absolute right-[10vw] top-[60%] transform translate-y-2 z-10">
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
            <div className="flex flex-col ml-[2vw]">
                <span className=" text-goldenrod">My Collection</span>
                <span className="text-xs text-gray-400">Last Edited: 2025-02-06 05:31:59</span>
            </div>
            <div className="ml-[-3vw] w-1/2 h-8 flex">
                <div className="flex items-center px-2 bg-transparent border-2 border-[hsl(var(--background3))] w-1/2 h-8">
                    <FontAwesomeIcon icon={faSearch} className="fa-xs"/>
                    <span className="text-xs text-gray-400 ml-2">Enter Card Name</span>
                </div>
                <div className="flex justify-center items-center space-x-2 ml-2 px-3 py-1 rounded-md bg-gray-700">
                    <FontAwesomeIcon icon={faFilter} className="fa-xs"/>
                    <span className="text-xs text-white"> Filter</span>
                </div>
                <div className="flex justify-center items-center space-x-2 ml-2 px-2 py-1 rounded-md bg-blue-500">
                    <FontAwesomeIcon icon={faPlusCircle} className="fa-xs"/>
                    <span className="text-xs text-white"> Add Card</span>
                </div>
            </div>
            <div className="space-x-1 flex w-fit">
               <div className='flex bg-footer rounded-lg'>
                    <span className="text-white p-1 px-2 rounded-xl mr-2 bg-[hsl(var(--background3))]">
                        <FontAwesomeIcon icon={faBars} className="fa-xs"/>
                    </span>
                    <span className="text-gray-400 p-1 rounded-xl mr-1 bg-transparent">
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-xs"/>
                    </span>
                </div>
            </div>
        </main>
    )
}