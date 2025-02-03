import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  function handleButtonClick() {
    navigate('/aboutus');
  };

  return (
    <div>
        <button 
          className="bg-transparent text-gray-300 cursor-pointer hover:text-gold"
          onClick={handleButtonClick} 
        >
          About Us
        </button>
    </div>
  );
}

export default AboutUs;
