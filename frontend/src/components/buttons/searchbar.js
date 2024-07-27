import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"
import { useSelector } from 'react-redux';

const Cardsearch = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/search');
  };

  return (
    <div>
        <button className="menu_card_search" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faSearch} rotation={90} />
            <span className="fatextmargin">
                Card Search
            </span>
        </button>
    </div>
  );
}

export default Cardsearch;