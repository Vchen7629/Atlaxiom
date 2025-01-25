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
          className="flex items-center pb-2 bg-transparent border-b-2 border-transparent hover:border-b-2 hover:border-[hsl(var(--background3))] " 
          onClick={handleButtonClick}
        >
            <div className='lg:mr-2'><FontAwesomeIcon icon={faUser} /></div>
            <div className="fatextmargin font-bold text-[hsl(var(--text))] text-xs lg:text-lg">My Profile</div>
        </button>
    </div>
  );
}

export default Profile;