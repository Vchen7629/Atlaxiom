import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSendLogoutMutation } from '../../../features/auth/authApiSlice'    
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logOut } from '@/features/auth/authSlice';


const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    

    const [sendLogout, { isSuccess,isError }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess && !isError) {
            dispatch(logOut())
            navigate('/')
        }
    }, [isSuccess, isError, dispatch, navigate])

    return (
        <div>
            <button className="flex items-center pb-2 bg-transparent border-b-2 border-transparent hover:border-b-2 hover:border-red-400 " onClick={sendLogout}>
                <span className='lg:mr-2'><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span className="fatextmargin font-bold text-[hsl(var(--text))] text-red-400 text-xs lg:text-lg">Logout</span>
            </button>
        </div>
    );
}

export default Logout;