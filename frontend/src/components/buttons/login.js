import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <button className="logins" onClick={handleButtonClick}>
                Login
        </button>
    </div>
  );
}

export default Login;