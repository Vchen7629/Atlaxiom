import { useState }from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faUser } from '@fortawesome/free-solid-svg-icons';
import Profile from './profile.tsx';
import Mycards from '../headerbuttons/my-cards.tsx';
import Logout from './logout.tsx';
import { UsernameState } from './accounttypes.ts';

const Accountsbutton = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const cachedUsername = useSelector((state: UsernameState) => state.auth.username);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
        <div>
            <button 
            className="flex bg-[hsl(var(--profile))] w-[180px] h-10 px-8 items-center justify-between rounded-3xl  text-[hsl(var(--background3))]  border-2 border-[hsl(var(--background3))]" 
            onClick={toggleDropdown}
            >   
                <FontAwesomeIcon icon={faUser}/>
                <div className="fatextmargin font-bold text-xl">
                    {cachedUsername}
                </div>
                <FontAwesomeIcon icon={faCaretDown}/>
            </button>


        </div>

        {showDropdown && (
            <main className="w-[180px] shadow-dropdow top-16 absolute flex flex-col right-4 h-fit bg-[hsl(var(--header))] rounded-2xl py-4">
                <div className="w-full flex pl-4"><Profile/></div>
                <div className="w-full flex pl-4"><Mycards/></div>
                <div className="w-full flex pl-4"><Logout/></div>
                
            </main>
        )}
        </>
    );
}

export default Accountsbutton;