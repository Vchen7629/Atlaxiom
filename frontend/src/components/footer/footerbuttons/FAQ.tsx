import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/FAQ');
  };

  return (
    <div>
        <button 
          className="flex bg-transparent border-transparent w-fit h-8 px-2 items-center border-b-2 hover:border-b-2 hover:border-goldenrod" 
          onClick={handleButtonClick}
        >
            Site Help
        </button>
    </div>
  );
}

export default FAQ;