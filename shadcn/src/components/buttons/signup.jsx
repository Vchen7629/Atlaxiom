import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signup');
  };

  return (
    <div>
        <button 
          className="flex bg-transparent border-transparent w-fit h-8 px-8 items-center border-b-2 hover:bg-footer rounded-lg"  
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon={faUserPlus}/>
            <span className="fatextmargin text-white">
                  Sign Up
            </span>
        </button>
    </div>
  );
}

export default Signup;