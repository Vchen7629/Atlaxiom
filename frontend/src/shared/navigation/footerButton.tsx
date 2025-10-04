import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { startTransition } from 'react';
import { UserIdState } from '@/features/decks/types/deckPage';


const NavButton = (
    { route, logged_in_route, button_text}: 
    { route: string, logged_in_route: string, button_text: string}
) => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: UserIdState) => state.auth.userId !== null);

  function handleButtonClick() {
    startTransition(() => {
        if (authenticated) {
            navigate(logged_in_route);
        } else {
            navigate(route)
        }
    })
  };

  return (
    <div>
        <button 
          className="bg-transparent text-gray-300 cursor-pointer hover:text-gold" 
          onClick={handleButtonClick}
        >
          {button_text}
        </button>
    </div>
  );
}

export default NavButton;