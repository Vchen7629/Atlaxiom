import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthenticationState } from '../types/hometypes';
import { useCallback } from 'react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  const handleButtonClick = useCallback(() => {
    if (authenticated) {
      navigate("/privacyloggedin")
    } else {
      navigate('/privacy');
    }
  }, [navigate]);

  return (
    <div>
        <button 
          className="bg-transparent border-transparent cursor-pointer border-b-2 px-2 hover:border-b-goldenrod text-white"
          onClick={handleButtonClick} 
        >
            Privacy Policy
        </button>
    </div>
  );
}

export default PrivacyPolicy;
