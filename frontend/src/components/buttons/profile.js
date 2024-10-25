import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/profile');
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent xs:w-16 xl:w-32 h-16 items-center border-b-2 hover:border-b-white" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faUser} />
            <span className="fatextmargin text-white">
                Profile
            </span>
        </button>
    </div>
  );
}

export default Profile;