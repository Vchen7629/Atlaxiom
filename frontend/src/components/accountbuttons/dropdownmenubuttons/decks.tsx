import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { startTransition } from 'react';

const MyDecks = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    startTransition(() => {
      navigate('/deckmanager');
    })
  };

  return (
    <div>
        <button 
          className="flex items-center pb-2 border-b-2 border-transparent bg-transparent hover:border-b-2 hover:border-[hsl(var(--background3))] " 
          onClick={handleButtonClick}
        >
          <span className='lg:mr-2 text-[hsl(var(--background3))]'><FontAwesomeIcon icon={faBook} /></span>
          <span className="fatextmargin font-bold text-[hsl(var(--text))] text-xs lg:text-lg">Decks</span>
        </button>
    </div>
  );
}

export default MyDecks;