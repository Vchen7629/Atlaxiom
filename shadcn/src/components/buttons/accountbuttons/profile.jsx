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
          className="flex items-center hover:bg-footer" 
          onClick={handleButtonClick}
        >
            <div className='mr-2 '><FontAwesomeIcon icon={faUser} /></div>
            <div className="fatextmargin text-white">My Profile</div>
        </button>
    </div>
  );
}

export default Profile;