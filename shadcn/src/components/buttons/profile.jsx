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
          className="flex bg-transparent border-transparent w-fit h-8 px-8 items-center border-b-2 hover:bg-footer rounded-lg" 
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