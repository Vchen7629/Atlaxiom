import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchCardBentoBackground } from "./searchforcardsbackground";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Database, SlidersHorizontal, Sword, TrendingUpIcon } from "lucide-react";

export function SearchHomePageComponent() {

    return (
        <div className='animate-fade-in-up relative flex flex-col lg:flex-row space-x-[5vh] w-full max-h-[50vh] '>
          <div className=" w-full lg:w-[50%] h-full">
            <SearchCardBentoBackground/>
          </div>
          <div className="w-full lg:w-[50%] h-full flex flex-col space-y-[5vh] ">
            <div className="flex space-x-8 w-full justify-center text-[hsl(var(--background3))]">
              <FontAwesomeIcon icon={faSearch} className='fa-2xl'/>
              <span className='text-3xl font-bold'>Search For Cards</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Database className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Search From a database of thousands of Yu-gi-oh Cards</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Sword className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>View card statistics and data</span>
            </div>
            <div className="flex space-x-4 items-center">
              <SlidersHorizontal className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Apply Various Filters to your search</span>
            </div>
            <div className="flex space-x-4 items-center">
              <TrendingUpIcon className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>View Historical Price Data of the Card</span>
            </div>
          </div>
        </div>
    )
}