import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    navigate('/aboutus');
  }, [navigate]);

  return (
    <div>
        <button 
          className="bg-transparent border-transparent cursor-pointer border-b-2 px-2  hover:border-b-goldenrod text-white"
          onClick={handleButtonClick} 
        >
          About Us
        </button>
    </div>
  );
}

export default AboutUs;
