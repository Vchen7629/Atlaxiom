import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthenticationState } from '../../../components/footer/types/hometypes';
import { startTransition } from 'react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  function handleButtonClick() {
    startTransition(() => {
      if (authenticated) {
        navigate("/privacyloggedin")
      } else {
        navigate('/privacy');
      }
    })
  };

  return (
    <div>
        <button 
          className="bg-transparent text-gray-300 cursor-pointer hover:text-gold"
          onClick={handleButtonClick} 
        >
            Privacy Policy
        </button>
    </div>
  );
}

export default PrivacyPolicy;
