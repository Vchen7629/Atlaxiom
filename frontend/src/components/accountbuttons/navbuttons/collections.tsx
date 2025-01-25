import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationState } from '../accounttypes.ts';

const Mycards = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: AuthenticationState) => state.auth.userId);

  const handleButtonClick = () => {
    navigate('/getcards', { state: { userId }});
  };

  return (
    <div>
        <button 
          className="flex items-center pb-2 border-b-2 bg-transparent border-transparent hover:border-b-2 hover:border-[hsl(var(--background3))] " 
          onClick={handleButtonClick}
        >
          <span className='lg:mr-2'><FontAwesomeIcon icon={faBox} /></span>
          <span className="fatextmargin font-bold text-[hsl(var(--text))] text-xs lg:text-lg">Collection</span>
        </button>
    </div>
  );
}

export default Mycards;