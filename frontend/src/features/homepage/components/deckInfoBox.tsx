import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Folder, FolderPlus, SquareDashedMousePointer, Star } from "lucide-react";
import { CreateDeckBackground } from "./animatedCreateDeck";

export function DeckInfoBoxComponent() {
    return (
        <div className='animate-fade-in-up relative flex flex-col lg:flex-row space-y-[5vh] lg:space-y-0 lg:space-x-[5vh] w-full lg:max-h-[50vh] '>
          <div className="flex lg:hidden w-full h-full shadow-lg shadow-[hsl(var(--shadow))]">
            <CreateDeckBackground/>
          </div>
          <div className="w-full lg:w-[50%] h-full flex flex-col space-y-[5vh] ">
            <div className="flex space-x-6 w-full justify-center text-[hsl(var(--background3))]">
              <Folder className='w-10 h-9'/>
              <span className='text-3xl font-bold'>Create and Manage your Decks</span>
            </div>
            <div className="flex space-x-4 items-center">
              <FolderPlus className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Create new card decks</span>
            </div>
            <div className="flex space-x-4 items-center">
              <SquareDashedMousePointer className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Add owned and cards from database to your decks via drag and drop</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Star className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Favorite, Duplicate, and Delete Owned Decks</span>
            </div>
            <div className="flex space-x-4 items-center">
              <FontAwesomeIcon icon={faSearch} className='fa-xl text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Search through owned decks</span>
            </div>
          </div>
          <div className="hidden lg:flex w-[50%] h-full shadow-lg shadow-[hsl(var(--shadow))]">
            <CreateDeckBackground/>
          </div>
        </div>
    )
}