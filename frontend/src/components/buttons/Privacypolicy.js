import React from 'react';
import { useNavigate } from 'react-router-dom';

const Privacypolicy = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/privacy-policy');
  };

  return (
    <div>
        <button className="privpolbtn"onClick={handleButtonClick} >
                Privacypolicy
        </button>
    </div>
  );
}

export default Privacypolicy;
