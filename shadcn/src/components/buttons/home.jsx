import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent text-white px-2 cursor-pointer border-b-2 hover:border-b-goldenrod" 
          onClick={handleButtonClick}
        >
          Home
        </button>
    </div>
  );
}

export default Home;