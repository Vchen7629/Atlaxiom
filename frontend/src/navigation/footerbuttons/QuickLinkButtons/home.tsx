import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { startTransition } from 'react';
import { UserIdState } from '@/pages/my-decks/deckpagetypes';

const Home = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: UserIdState) => state.auth.userId !== null);

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