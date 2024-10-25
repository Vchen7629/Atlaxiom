import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons';

const Banlist = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/banlist');
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent w-32 h-16 items-center border-b-2 hover:border-b-white" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBan} />
            <span className="fatextmargin text-white">
                Banlist
            </span>
        </button>
    </div>
  );
}

export default Banlist;