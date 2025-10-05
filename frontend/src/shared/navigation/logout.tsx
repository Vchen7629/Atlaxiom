import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSendLogoutMutation } from '@/app/api-slices/authApiSlice'    
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
    const navigate = useNavigate();

    const [sendLogout, { isSuccess,isError }] = useSendLogoutMutation()

    async function handleLogout() {
        try {
            await sendLogout({}).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Failed to log out: ', err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        } else if (isError) {
            console.log("logout failed");
        }
    }, [isSuccess, isError, navigate]);

    return (
        <div>
            <button className="flex items-center pb-2 bg-transparent border-b-2 border-transparent hover:border-b-2 hover:border-red-400 " onClick={handleLogout}>
                <span className='lg:mr-2 text-red-400'><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span className="fatextmargin font-bold text-[hsl(var(--text))] text-red-400 text-xs lg:text-lg">Logout</span>
            </button>
        </div>
    );
}

export default Logout;