import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Cardsearch = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state) => state.auth.token !== null);

  const handleButtonClick = () => {
    if (authenticated) {
      navigate('/searchloggedin');
    } else {
      navigate('/search')
    }
  };

  return (
    <div>
        <button 
          className="flex bg-transparent border-transparent w-fit h-8 px-8 items-center border-b-2 hover:bg-footer rounded-lg" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faSearch} rotation={90} />
            <span className="fatextmargin text-white">
                Card Search
            </span>
        </button>
    </div>
  );
}

export default Cardsearch;