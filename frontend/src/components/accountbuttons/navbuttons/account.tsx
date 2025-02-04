import { useState }from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import Profile from '../dropdownmenubuttons/profile.tsx';
import Logout from '../dropdownmenubuttons/logout.tsx';
import { UsernameState } from '../accounttypes.ts';
import Mycards from '../dropdownmenubuttons/collections.tsx';
import MyDecks from '../dropdownmenubuttons/decks.tsx';
import CardSearch from '../dropdownmenubuttons/cardsearch.tsx';

const Accountsbutton = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const cachedUsername = useSelector((state: UsernameState) => state.auth.username);
    console.log("cached", cachedUsername)

    function toggleDropdown() {
        setShowDropdown(!showDropdown);
    };
    
    return (
        <>
        <div>
            <button 
            className="flex bg-[hsl(var(--profile))] xl:max-w-[25vw] h-10 px-4 lg:px-8 items-center justify-between rounded-xl lg:rounded-3xl  text-[hsl(var(--background3))]  border-2 border-[hsl(var(--background3))]" 
            onClick={toggleDropdown}
            >   
                <FontAwesomeIcon icon={faUser}/>
                <div className="fatextmargin font-bold mx-2 lg:text-xl">
                    {cachedUsername}
                </div>
                <FontAwesomeIcon icon={faCaretDown}/>
            </button>
        </div>

        {showDropdown && (
            <main className="w-fit px-[4vw] md:px-[1.5vw] border-2 border-[hsl(var(--background3))] text-[hsl(var(--background3))] top-16 absolute flex flex-col space-y-2 right-[3vw] lg:right-5 h-fit bg-[hsl(var(--header))] rounded-2xl py-4">
                <div className="w-full flex"><Profile/></div>
                <div className="w-full flex"><CardSearch/></div>
                <div className="w-full flex"><Mycards/></div>
                <div className="w-full flex"><MyDecks/></div>
                <div className="w-full flex text-red-500"><Logout/></div>
            </main>
        )}
        </>
    );
}

export default Accountsbutton;