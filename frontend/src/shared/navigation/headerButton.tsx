import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { startTransition } from 'react';

const HeaderNavButton = (
    { route, button_text}: 
    { route: string, button_text: string}
) => {
  const navigate = useNavigate();

  function handleButtonClick() {
    startTransition(() => {
      navigate(route);
    })
  };

  return (
    <div>
        <button 
          className="flex font-bold h-10 px-4 py-4 bg-[hsl(var(--background3))] items-center text-[hsl(var(--profile))] rounded-lg border-2 border-[hsl(var(--border))]" 
          onClick={handleButtonClick}
        >
            <FontAwesomeIcon icon={faFile} />
            <span className="fatextmargin">
                {button_text}
            </span>
        </button>
    </div>
  );
}

export default HeaderNavButton;