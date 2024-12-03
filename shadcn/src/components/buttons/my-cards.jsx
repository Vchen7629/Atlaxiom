import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBox } from '@fortawesome/free-solid-svg-icons';

const Mycards = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const handleButtonClick = () => {
    navigate('/getcards', { state: { userId }});
  };

  return (
    <div>
        <button 
          className="flex w-fit h-8 px-2 py-4 text-[hsl(var(--text))] items-center border-b-2 border-transparent hover:border-[hsl(var(--background3))]" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBox} />
            <span className="fatextmargin">
                Collection
            </span>
        </button>
    </div>
  );
}

export default Mycards;