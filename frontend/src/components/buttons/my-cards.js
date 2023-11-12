import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Mycards = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/dash/ownedcards');
  };

  return (
    <div>
        <button className="my-cards" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faBook} />
            <span className="fatextmargin">
                My Cards
            </span>
        </button>
    </div>
  );
}

export default Mycards;