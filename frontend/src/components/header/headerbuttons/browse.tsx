import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationState } from '../types/searchbartypes';
import { useSelector } from 'react-redux';

const Banlist = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  const handleButtonClick = () => {
    if (authenticated) {
      navigate('/banlistloggedin');
    } else {
      navigate('/banlist');
    }
  };

  return (
    <div>
        <button 
          className="flex w-fit h-8 px-2 py-4 text-[hsl(var(--text))] items-center border-b-2 border-transparent hover:border-[hsl(var(--background3))]" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBan} />
            <div className="ml-2">
                Browse
            </div>
        </button>
    </div>
  );
}

export default Banlist;