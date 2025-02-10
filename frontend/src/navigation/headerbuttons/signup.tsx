import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  function handleButtonClick() {
    startTransition(() => {
      navigate('/signup');
    })
  };

  return (
    <div>
        <button 
          className="flex font-bold h-10 px-6 bg-[hsl(var(--text))] items-center text-[hsl(var(--profile))] rounded-lg border-2 border-[hsl(var(--border))]" 
          onClick={handleButtonClick}
        >
          Sign Up
        </button>
    </div>
  );
}

export default Signup;