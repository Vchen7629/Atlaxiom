import React, { useState, useEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCaretDown, faCartArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { useGetSpecificUserQuery } from '../../../features/api-slices/usersApiSlice';
import Profile from './profile';
import Mycards from '../my-cards';
import Logout from './logout';

const Accountsbutton = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const userId = useSelector((state) => state.auth.userId);

    const { 
        data: usersData, 
        isLoading,
        isError,
        error,
        refetch 
    } = useGetSpecificUserQuery(userId);

    useEffect(() => {
        if (userId) {
            console.log("Fetching data for userId:", userId);
            refetch();
        }
    }, [userId, refetch]);

    const userEntity = usersData?.entities?.[userId];
    const username = userEntity?.username || "Guest";

    console.log("User data is got", username)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
        <div>
            <button 
            className="flex bg-[hsl(var(--profile))] w-[180px] h-10 px-8 items-center justify-between rounded-3xl text-gold border-2 border-goldenrod" 
            onClick={toggleDropdown}
            >   
                <div>Hey</div>
                <div className="fatextmargin text-gold ">
                    {username}
                </div>
                <FontAwesomeIcon icon={faCaretDown}/>
            </button>


        </div>

        {showDropdown && (
            <main className="w-[200px] shadow-dropdow top-16 absolute flex flex-col right-26 h-[300px] bg-[hsl(var(--header))] rounded-2xl py-4">
                <div className="w-full flex pl-4"><Profile/></div>
                <div className="w-full flex pl-4"><Mycards/></div>
                <div className="w-full flex pl-4"><Logout/></div>
                <div className="bg-[hsl(var(--chart-1))] w-full h-20">Test</div>
            </main>
        )}
        </>
    );
}

export default Accountsbutton;