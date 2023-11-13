import React from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD

=======
>>>>>>> 5a1f343a60e800cd9368e61a45af8641ea9b74a6

const Aboutus = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/About-us');
  };

  return (
    <div>
        <button className="about-us" onClick={handleButtonClick}>
                About us
        </button>
    </div>
  );
}

export default Aboutus;