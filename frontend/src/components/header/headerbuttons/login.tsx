import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div>
        <button 
          className="flex font-bold w-fit h-8 py-4 bg-transparent items-center text-[hsl(var(--text))] border-b-2 border-transparent" 
          onClick={handleButtonClick}
        >
          Login
        </button>
    </div>
  );
}

export default Login;