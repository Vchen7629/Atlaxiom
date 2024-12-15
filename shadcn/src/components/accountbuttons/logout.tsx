import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'    
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Logout = () => {
    const navigate = useNavigate();

    const [sendLogout, {
        isSuccess,
        isError,
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess && !isError) navigate('/')
    }, [isSuccess, isError, navigate])

    return (
        <div>
            <button 
                className="flex items-center hover:bg-footer" 
                onClick={sendLogout}
            >
                <div className='mr-2'><FontAwesomeIcon icon={faRightFromBracket} /></div>
                <div className="fatextmargin text-red-400">Logout</div>
            </button>
        </div>
    );
}

export default Logout;