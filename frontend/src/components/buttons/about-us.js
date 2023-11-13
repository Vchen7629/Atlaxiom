import React from 'react';
import { useNavigate } from 'react-router-dom';


const Aboutus = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/About-us');
  };

  return (
    <div>
        <button className="about-us" onClick={handleButtonClick}>
                About us
        </button>
    </div>
  );
}

export default Aboutus;