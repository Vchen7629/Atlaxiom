import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent w-32 h-16 items-center border-b-2 hover:border-b-white" 
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon={faRightToBracket}/>
            <span className="fatextmargin text-white">
                  Login
            </span>
        </button>
    </div>
  );
}

export default Login;