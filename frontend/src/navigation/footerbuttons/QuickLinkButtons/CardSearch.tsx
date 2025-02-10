import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { startTransition } from 'react';
import { AuthenticationState } from '@/components/header/types/searchbartypes';

const CardSearch = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  function handleButtonClick() {
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
          className="bg-transparent text-gray-300 cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Card Search
        </button>
    </div>
  );
}

export default CardSearch;