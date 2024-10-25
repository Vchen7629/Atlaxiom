import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Mydecks = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/mydeckhomepage');
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent xs:w-16 xl:w-32 h-16 items-center border-b-2 hover:border-b-white" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBook} />
            <span className="fatextmargin text-white">
                My Decks
            </span>
        </button>
    </div>
  );
}

export default Mydecks;