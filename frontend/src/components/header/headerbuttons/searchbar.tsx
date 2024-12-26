import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { AuthenticationState } from '../header/types/searchbartypes';

const Cardsearch = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  const handleButtonClick = () => {
    if (authenticated) {
      navigate('/searchloggedin');
    } else {
      navigate('/search')
    }
  };

  return (
    <div>
        <button 
          className="flex w-fit h-8 px-2 py-4 text-[hsl(var(--text))] items-center border-b-2 border-transparent hover:border-[hsl(var(--background3))]" 
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