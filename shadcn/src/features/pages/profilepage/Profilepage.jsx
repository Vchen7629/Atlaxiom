import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faLock, faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';
import ProfileContent from './profile-subpages/profile';
import DeleteAccount from './profile-subpages/deleteaccount';
import UserStatistics from './profile-subpages/statistics';
import Security from './profile-subpages/security';


const Profilepage = () => {
    const [selectedNavItem, setSelectedNavItem] = useState('');
    const userId = useSelector((state) => state.auth.userId);

    useEffect(() => {
    }, [userId]);
    
    const { 
        data: usersData, 
        isLoading,
        isError,
        error,
        refetch 
    } = useGetSpecificUserQuery(userId);
        
    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);

        if (navItem === 'statistics') {
            refetch();
        }
    };

    const renderProfileContent = () => {
        const { ids, entities } = usersData || {}

        if (!Array.isArray(ids) || ids.length === 0) {
            return <p>No user data available</p>;
        }

        const defaultIdKey = ids[0];
        const user = entities[defaultIdKey];
        console.log("profile user:", user?.username)

        if (isError) {
          return <p>Error loading user data</p>;
        }
        
        if (isLoading || usersData == null) {
          return <p>Loading user data...</p>;
        } 
        if (!userId) {
          return <p>Please Login</p>;
        }

        if (error) {
            return <p>Err</p>
        }
              
        switch (selectedNavItem) {
            case 'profile':
                return (
                    <ProfileContent user={user} />
                );
            case 'statistics':
                return (
                    <UserStatistics user={user} />
                    );
            case 'security':
                return (
                    <Security user={user} />
                    );
            case 'delete':
                return (
                    <DeleteAccount user={user}/>
                );
            default:
                return (
                    <ProfileContent user={user} />
                );
            }
        };

    const content = (
        <>
        <main className="min-h-[100vh] flex flex-col justify-center">
            <Header/>
            <div className="flex justify-center bg-[hsl(var(--background1))] min-h-[95vh]">
                    <div className="flex w-full px-[10%] my-[3%] justify-between">
                        <div className="flex flex-col relative w-[30%] top-[10%] h-fit pl-4 border-2 border-[hsl(var(--shadow-color))] rounded-2xl bg-[hsl(var(--background1))]">
                            <button 
                                className="flex mt-[3%] p-[10px] text-goldenrod items-center" 
                                onClick={() => handleNavItemClick('profile')}
                            >
                                <FontAwesomeIcon icon={faUser} className="text-gray-500"/>
                                <span className="ml-[10px] text-goldenrod">Profile</span>
                            </button>
                            <button 
                                className="flex my-[3%] p-[10px] text-goldenrod items-center" 
                                onClick={() => handleNavItemClick('statistics')}
                            >
                                <FontAwesomeIcon icon={faChartColumn} className="text-gray-500"/>
                                <span className="ml-[10px] text-goldenrod">View Statistics</span>
                            </button>
                            <button 
                                className="flex mb-[3%] p-[10px] text-goldenrod items-center"
                                onClick={() => handleNavItemClick('security')}
                            >
                                <FontAwesomeIcon icon={faLock} className="text-gray-500"/>
                                <span className="ml-[10px] text-goldenrod">Security</span>
                            </button>
                            <button 
                                className="flex mb-[3%] p-[10px] text-goldenrod items-center" 
                                onClick={() => handleNavItemClick('delete')}
                            >
                                <FontAwesomeIcon icon={faUserSlash} className="text-gray-500"/>
                                <span className="ml-[10px] text-goldenrod">Delete Account</span>
                            </button>
                        </div>
                        <div className="flex flex-col mt-[3%] align-center w-full px-[20px]">
                            {renderProfileContent()}
                        </div>
                </div>
            </div>
            <Footer/>
        </main>
        </>
    );

    return content
    };

    export default Profilepage;