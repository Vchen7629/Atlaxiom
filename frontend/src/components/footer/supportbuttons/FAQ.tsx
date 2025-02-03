import { useNavigate } from 'react-router-dom';
import { AuthenticationState } from '../types/hometypes';
import { useSelector } from 'react-redux';
import { startTransition } from 'react';

const FAQ = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

  function handleButtonClick() {
    startTransition(() => {
      if (authenticated) {
        navigate("/FAQloggedin")
      } else {
        navigate('/FAQ');
      }
    })
  };

  return (
    <div>
        <button 
          className="bg-transparent text-gray-300 cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Documentation
        </button>
    </div>
  );
}

export default FAQ;