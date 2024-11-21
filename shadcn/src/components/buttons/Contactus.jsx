import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/contact');
  };

  return (
    <div>
        <button 
          className="bg-transparent border-transparent cursor-pointer border-b-2 px-2 hover:border-b-goldenrod text-white"
          onClick={handleButtonClick} 
        >
            Contact Us
        </button>
    </div>
  );
}

export default ContactUs;
