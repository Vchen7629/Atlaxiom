import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { UserIdState } from '@/features/decks/types/deckPage';

const PrivacyPolicyButton = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: UserIdState) => state.auth.userId !== null);

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

export default PrivacyPolicyButton;
