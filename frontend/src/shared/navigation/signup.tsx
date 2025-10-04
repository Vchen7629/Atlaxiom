import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ footer, header }: { footer: boolean, header: boolean}) => {
  const navigate = useNavigate();

  function handleButtonClick() {
    startTransition(() => {
      navigate('/signup');
    })
  };

  return (
    <div>
      {footer ? (
        <button 
          className="hidden md:flex bg-transparent text-blue-300 font-bold cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Signup
        </button>
      ) : header && (
        <button 
          className="hidden md:flex font-bold h-10 px-6 bg-[hsl(var(--text))] items-center text-[hsl(var(--profile))] rounded-lg border-2 border-[hsl(var(--border))]" 
          onClick={handleButtonClick}
        >
          Sign Up
        </button>
      )}
    </div>
  );
}

export default Signup;