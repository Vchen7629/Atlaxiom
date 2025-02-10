import { useNavigate } from 'react-router-dom';
import { AuthenticationState } from '../../../components/footer/types/hometypes';
import { useSelector } from 'react-redux';
import { startTransition } from 'react';

const ContactUs = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  function handleButtonClick() {
    startTransition(() => {
      if (authenticated) {
        navigate("/contactloggedin")
      } else {
        navigate('/contact');
      }
    })
  };

  return (
    <div>
        <button 
          className="bg-transparent text-gray-300 cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Contact
        </button>
    </div>
  );
}

export default ContactUs;