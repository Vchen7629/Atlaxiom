import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Mydecks = () => {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate('/deckmanager');
  };

  return (
    <div>
        <button 
          className="flex font-bold h-10 px-4 py-4 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg border-2 border-[hsl(var(--border))]" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBook} />
            <span className="fatextmargin">
                My Decks
            </span>
        </button>
    </div>
  );
}

export default Mydecks;