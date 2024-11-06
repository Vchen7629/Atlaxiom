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
          className="flex bg-transparent border-transparent w-fit h-8 px-8 items-center border-b-2 hover:bg-footer rounded-lg" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBan} />
            <div className="ml-2 text-white ">
                Banlist
            </div>
        </button>
    </div>
  );
}

export default Banlist;