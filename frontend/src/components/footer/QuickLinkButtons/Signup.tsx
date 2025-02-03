import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

const Signup = () => {
  const navigate = useNavigate();

  function handleButtonClick() {
    startTransition(() => {
        navigate('/signup')
    })
  };

  return (
    <div>
        <button 
          className="bg-transparent text-blue-300 font-bold cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Signup
        </button>
    </div>
  );
}

export default Signup;