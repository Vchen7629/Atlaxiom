import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationState } from '../types/mycardstypes';
import { startTransition } from 'react';

const Mycards = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: AuthenticationState) => state.auth.userId);

  function handleButtonClick() {
    startTransition(() => {
      navigate('/getcards', { state: { userId }});
    })
  };

  return (
    <div>
        <button 
          className="flex font-bold h-10 px-4 py-4 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg border-2 border-[hsl(var(--border))]" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBox} />
            <span className="fatextmargin">
                Collection
            </span>
        </button>
    </div>
  );
}

export default Mycards;