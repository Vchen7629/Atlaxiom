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
          className="flex bg-transparent border-transparent w-fit h-8 px-8 items-center border-b-2 hover:bg-footer rounded-lg" 
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