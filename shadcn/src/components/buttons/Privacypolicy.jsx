import React from 'react';
import { useNavigate } from 'react-router-dom';

const Privacypolicy = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/privacy-policy');
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent cursor-pointer border-b-2 hover:border-b-goldenrod text-white"
          onClick={handleButtonClick} 
        >
          Privacypolicy
        </button>
    </div>
  );
}

export default Privacypolicy;
