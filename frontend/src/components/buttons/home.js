import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styling/footerbuttons.css"


const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div>
        <button className="home" onClick={handleButtonClick}>
                Home
        </button>
    </div>
  );
}

export default Home;