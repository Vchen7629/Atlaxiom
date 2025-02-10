import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { startTransition } from 'react';
import { AuthenticationState } from '@/components/header/types/searchbartypes';

const Home = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  function handleButtonClick() {
    startTransition(() => {
      if (authenticated ) {
        navigate('/loggedin');
      } else {
        navigate('/')
      }
    })
  };

  return (
    <div>
        <button 
          className="bg-transparent text-gray-300 cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Home
        </button>
    </div>
  );
}

export default Home;