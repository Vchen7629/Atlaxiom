import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { startTransition } from 'react';
import { UserIdState } from '@/pages/my-decks/deckpagetypes';

const FAQ = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: UserIdState) => state.auth.userId !== null);

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