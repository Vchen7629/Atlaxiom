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
          className="bg-transparent border-transparent w-32 h-16 items-center border-b-2 hover:border-b-white " 
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