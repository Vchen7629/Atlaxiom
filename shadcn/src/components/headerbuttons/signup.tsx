import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signup');
  };

  return (
    <div>
        <button 
          className="flex font-bold w-fit h-8 py-4 items-center text-[hsl(var(--text))] border-b-2 border-transparent hover:border-[hsl(var(--background3))]" 
          onClick={handleButtonClick}
        >
          Sign Up
        </button>
    </div>
  );
}

export default Signup;