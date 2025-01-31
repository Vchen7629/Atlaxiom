import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { AuthenticationState } from '../types/searchbartypes';
import { useCallback } from 'react';

const Cardsearch = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  const handleButtonClick = useCallback(() => {
    if (authenticated) {
      navigate('/searchloggedin');
    } else {
      navigate('/search')
    }
  }, [navigate]);

  return (
    <div>
        <button 
          className="flex font-bold h-10 px-4 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg border-2 border-[hsl(var(--border))]" 
          onClick={handleButtonClick}
          
        >
            <FontAwesomeIcon icon={faSearch} rotation={90} />
            <span className="fatextmargin">
                Card Search
            </span>
        </button>
    </div>
  );
}

export default Cardsearch;