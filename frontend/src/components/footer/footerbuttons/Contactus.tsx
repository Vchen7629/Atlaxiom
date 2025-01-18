import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthenticationState } from './hometypes';

const ContactUs = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);
  

  const handleButtonClick = () => {
    if (authenticated) {
      navigate("/privacyloggedin")
    } else {
      navigate('/privacy');
    }
  };

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

export default ContactUs;
