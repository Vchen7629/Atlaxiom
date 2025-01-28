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

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    console.log("hi")
    
    return (
        <>
        <div>
            <button 
            className="flex bg-[hsl(var(--profile))] xl:w-[9vw] h-10 px-4 lg:px-8 items-center justify-between rounded-xl lg:rounded-3xl  text-[hsl(var(--background3))]  border-2 border-[hsl(var(--background3))]" 
            onClick={toggleDropdown}
            >   
                <FontAwesomeIcon icon={faUser}/>
                <div className="fatextmargin font-bold mr-2 lg:text-xl">
                    {cachedUsername}
                </div>
                <FontAwesomeIcon icon={faCaretDown}/>
            </button>


        </div>

        {showDropdown && (
            <main className="lg:w-[9vw] w-[34vw] border-2 border-[hsl(var(--background3))] text-[hsl(var(--background3))] top-16 absolute flex flex-col space-y-2 right-[3vw] lg:right-5 h-fit bg-[hsl(var(--header))] rounded-2xl py-4">
                <div className="w-full flex pl-4"><Profile/></div>
                <div className="w-full flex pl-4"><CardSearch/></div>
                <div className="w-full flex pl-4"><Mycards/></div>
                <div className="w-full flex pl-4"><MyDecks/></div>
                <div className="w-full flex pl-4 text-red-500"><Logout/></div>
            </main>
        )}
        </>
    );
}

export default Accountsbutton;