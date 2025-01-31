import { useNavigate } from 'react-router-dom';
import { AuthenticationState } from '../types/hometypes';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

const FAQ = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  const handleButtonClick = useCallback(() => {
    if (authenticated) {
      navigate("/FAQloggedin")
    } else {
      navigate('/FAQ');
    }
    console.log('hi')
  }, [navigate]);

  return (
    <div>
        <button 
          className="flex bg-transparent border-transparent w-fit h-8 px-2 items-center border-b-2 hover:border-b-2 hover:border-goldenrod" 
          onClick={handleButtonClick}
        >
            Site Help
        </button>
    </div>
  );
}

export default FAQ;