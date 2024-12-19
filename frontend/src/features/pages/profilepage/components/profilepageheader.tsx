import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser } from '@fortawesome/free-solid-svg-icons';
import { ProfileHeader } from '../types/componenttypes';

const ProfilePageHeader = ({ user }: ProfileHeader) => {
    const { username, totalOwnedCards, totalOwnedDecks, creation } = user;

    return (
        <>
        <div className="flex flex-col min-h-[25vh] mt-4">
          <section className="h-full rounded-3xl px-12 items-center justify-between flex w-full bg-[hsl(var(--profilebackground))] text-[hsl(var(--text))]">
            <div className="flex items-center">  
              <FontAwesomeIcon icon={faUser} className="mr-7 text-5xl text-gold"/>
              <div className='flex flex-col space-y-2'>
                <span className="text-3xl font-bold">{username}</span>
                <span >Joined: {creation}</span>
              </div>
            </div>
            <div className="flex space-x-12">
              <div className="flex flex-col items-center">
                <span className='text-[hsl(var(--background3))]'>Collected Cards</span> 
                <span className="font-bold text-xl">{totalOwnedCards}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className='text-[hsl(var(--background3))]'>Owned Decks</span> 
                <span className="font-bold text-xl">{totalOwnedDecks}</span>
              </div>
            </div>
            
          </section>
          
        </div>
      </>
    );
}

export default ProfilePageHeader