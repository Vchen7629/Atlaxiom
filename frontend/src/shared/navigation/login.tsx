import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

const Login = ({ footer, header }: { footer: boolean, header: boolean}) => {
  const navigate = useNavigate();

  function handleButtonClick() {
    startTransition(() => {
        navigate('/login')
    })
  };

  return (
    <div>
      {footer ? (
        <button 
          className="hidden md:flex bg-transparent text-blue-300 font-bold cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Login
        </button>
      ) : header && (
        <button 
          className="hidden md:flex font-bold h-10 px-6 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg border-2 border-[hsl(var(--border))]" 
          onClick={handleButtonClick}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Login;