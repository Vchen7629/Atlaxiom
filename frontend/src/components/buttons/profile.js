import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"

const Profile = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/profile');
  };

  return (
    <div>
        <button className="profile" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faUser} />
            <span className="fatextmargin">
                Profile
            </span>
        </button>
    </div>
  );
}

export default Profile;