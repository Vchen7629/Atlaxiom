import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <button className="logins" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faUser}/>
<<<<<<< HEAD
            <span className="fatextmargin">
                  Login
            </span>
=======
          <span className="fatextmargin">
                Login
          </span>
>>>>>>> 5a1f343a60e800cd9368e61a45af8641ea9b74a6
        </button>
    </div>
  );
}

export default Login;