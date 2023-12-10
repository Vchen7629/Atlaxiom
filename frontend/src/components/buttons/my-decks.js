import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"

const Mydecks = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/mydeck');
  };

  return (
    <div>
        <button className="my-decks" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faBook} />
            <span className="fatextmargin">
                My Decks
            </span>
        </button>
    </div>
  );
}

export default Mydecks;