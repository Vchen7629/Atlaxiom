import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { AuthenticationState } from '@/components/footer/types/hometypes';
import { startTransition } from 'react';

const CardSearch = () => {
    const navigate = useNavigate();
    const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

    const handleButtonClick = () => {
        startTransition(() => {
            if (authenticated) {
                navigate('/searchloggedin');
            } else {
                navigate('/search')
            }
        })
    };

    return (
        <div>
            <button 
            className="flex items-center pb-2 bg-transparent border-b-2 border-transparent hover:border-b-2 hover:border-[hsl(var(--background3))] " 
            onClick={handleButtonClick}
            >
                <div className='mr-0 lg:mr-2 text-[hsl(var(--background3))]'><FontAwesomeIcon icon={faSearch} rotation={90} /></div>
                <div className="fatextmargin font-bold text-[hsl(var(--text))] text-xs lg:text-lg">Card Search</div>
            </button>
        </div>
    );
}

export default CardSearch;