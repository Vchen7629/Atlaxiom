import React from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <button 
          className="flex  bg-[hsl(var(--background3))] font-bold w-fit h-8 p-4 items-center rounded-lg text-[hsl(var(--text))]" 
          onClick={handleButtonClick}
        >
          Login
        </button>
    </div>
  );
}

export default Login;