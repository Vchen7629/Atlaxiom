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
          className="flex bg-transparent border-transparent w-fit h-8 px-8 items-center border-b-2 hover:bg-footer rounded-lg" 
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon={faRightToBracket}/>
            <span className="fatextmargin text-white">
                  Sign in
            </span>
        </button>
    </div>
  );
}

export default Login;