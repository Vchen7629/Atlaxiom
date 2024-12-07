import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Mydecks = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/deckmanager');
  };

  return (
    <div>
        <button 
          className="flex w-fit h-8 px-2 py-4 text-[hsl(var(--text))] items-center border-b-2 border-transparent hover:border-[hsl(var(--background3))]" 
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