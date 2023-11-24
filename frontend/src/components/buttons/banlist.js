import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"

const Banlist = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/banlist');
  };

  return (
    <div>
        <button className="banlist" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faBan} />
            <span className="fatextmargin">
                Banlist
            </span>
        </button>
    </div>
  );
}

export default Banlist;