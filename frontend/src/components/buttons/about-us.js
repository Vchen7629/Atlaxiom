import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const Aboutus = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/About-us');
  };

  return (
    <div>
        <button className="about-us" onClick={handleButtonClick}>
            <FontAwesomeIcon icon={faQuestion} />
            <span className="fatextmargin">
                About us
            </span>
        </button>
    </div>
  );
}

export default Aboutus;