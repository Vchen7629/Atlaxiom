import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import "./styling/headerbuttons.css"
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
    navigate('/card/getcards', { state: { userId }});
  };

  return (
    <div>
        <button className="my-cards" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faBook} />
            <span className="fatextmargin">
                My Cards
            </span>
        </button>
    </div>
  );
}

export default Mycards;