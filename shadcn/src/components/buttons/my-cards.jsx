import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useGetSpecificOwnedDeckQuery } from '../../features/api-slices/decksapislice';


const Mycards = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const {} = useGetSpecificOwnedDeckQuery(userId, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleButtonClick = () => {
    navigate('/getcards', { state: { userId }});
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent xs:w-16 xl:w-32 h-16 items-center border-b-2 hover:border-b-white" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faBook} />
            <span className="fatextmargin text-white">
                My Cards
            </span>
        </button>
    </div>
  );
}

export default Mycards;