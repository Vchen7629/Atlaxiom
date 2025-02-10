import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

const Login = () => {
  const navigate = useNavigate();

  function handleButtonClick() {
    startTransition(() => {
        navigate('/login')
    })
  };

  return (
    <div>
        <button 
          className="bg-transparent text-blue-300 font-bold cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          Login
        </button>
    </div>
  );
}

export default Login;