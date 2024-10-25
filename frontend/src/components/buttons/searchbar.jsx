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
          className="bg-transparent border-transparent w-32 h-16 items-center border-b-2 hover:border-b-white " 
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