import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ProfileHeader } from '../types/componenttypes';
import { useSelector } from 'react-redux';
import { UsernameState } from '@/components/accountbuttons/accounttypes';

const ProfilePageHeader = ({ usersData }: ProfileHeader) => {
    const username = usersData?.username
    const totalOwnedCards = usersData?.totalOwnedCards
    const totalOwnedDecks = usersData?.totalOwnedDecks
    const creation = usersData?.creation
    const cachedUsername = useSelector((state: UsernameState) => state.auth.username);

    return (
        <div className="flex flex-col min-h-[25vh] mt-4">
          <section className="h-full rounded-3xl px-12 items-center justify-between flex w-full bg-[hsl(var(--profilebackground))] text-[hsl(var(--text))]">
            <div className="flex items-center">  
              <FontAwesomeIcon icon={faUser} className="mr-7 text-5xl text-[hsl(var(--background3))]"/>
              <div className='flex flex-col space-y-[1vh] lg:space-y-2'>
                <span className="text-3xl font-bold">{username || cachedUsername}</span>
                <span className='text-xs lg:text-lg' >Joined: {creation || "Jan 1, 2025"}</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-[1vh] lg:space-y-0 lg:space-x-12">
              <div className="flex lg:flex-col items-center">
                <span className='hidden lg:flex text-xl text-[hsl(var(--background3))]'>Collected Cards</span> 
                <span className="flex lg:hidden text-xl font-bold text-[hsl(var(--background3))] mr-2">Cards:</span>
                <span className="font-bold text-md  lg:text-xl">{totalOwnedCards || 1}</span>
              </div>
              <div className="flex lg:flex-col items-center">
                <span className='hidden lg:flex text-xl text-[hsl(var(--background3))]'>Owned Decks</span> 
                <span className="flex lg:hidden text-xl font-bold text-[hsl(var(--background3))] mr-2">Decks:</span>
                <span className="font-bold text-md lg:text-xl">{totalOwnedDecks || 1}</span>
              </div>
            </div> 
          </section>  
        </div>
    );
}

export default ProfilePageHeader