import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styling/footerbuttons.css"


const ContactInfo = () => {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/contact-info');
    };
  
    return (
      <div>
          <button className="contact-info"onClick={handleButtonClick} >
                  Contact Info
          </button>
      </div>
    );
  }

  export default ContactInfo;

