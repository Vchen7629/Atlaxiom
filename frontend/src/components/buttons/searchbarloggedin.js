import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"

const CardsearchLoggedIn = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/search');
  };

  return (
    <div>
        <button className="menu_card_search" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faSearch} rotation={90} />
            <span className="fatextmargin">
                Card Searchs
            </span>
        </button>
    </div>
  );
}

export default CardsearchLoggedIn;