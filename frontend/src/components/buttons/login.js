import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"
import "./styling/login.css"

const Login = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <button className="logins" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faUser}/>
            <span className="fatextmargin">
                  Login
            </span>
        </button>
    </div>
  );
}

export default Login;