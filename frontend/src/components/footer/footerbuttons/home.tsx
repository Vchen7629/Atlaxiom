import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthenticationState } from '../types/hometypes';
import { useCallback } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  const handleButtonClick = useCallback(() => {
    if (authenticated) {
      navigate('/loggedin');
    } else {
      navigate('/')
    }
  }, [navigate]);

  return (
    <div>
        <button 
          className="bg-transparent border-transparent text-white px-2 cursor-pointer border-b-2 hover:border-b-goldenrod" 
          onClick={handleButtonClick}
        >
          Home
        </button>
    </div>
  );
}

export default Home;