import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"

const Signup = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signup');
  };

  return (
    <div>
        <button className="logins" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faUserPlus}/>
            <span className="fatextmargin">
                  Sign Up
            </span>
        </button>
    </div>
  );
}

export default Signup;