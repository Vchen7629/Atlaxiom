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
          className="flex bg-cyan-500 border-transparent text-white font-bold w-fit h-8 p-4 items-center rounded-lg"  
          onClick={handleButtonClick}
        >
          Sign Up
        </button>
    </div>
  );
}

export default Signup;