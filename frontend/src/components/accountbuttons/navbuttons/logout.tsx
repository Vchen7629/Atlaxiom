import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSendLogoutMutation } from '../../../features/auth/authApiSlice'    
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
            <button className="flex items-center pb-2 border-b-2 border-transparent hover:border-b-2 hover:border-red-400 " onClick={sendLogout}>
                <span className='mr-2'><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span className="fatextmargin font-bold text-[hsl(var(--text))] text-red-400">Logout</span>
            </button>
        </div>
    );
}

export default Logout;