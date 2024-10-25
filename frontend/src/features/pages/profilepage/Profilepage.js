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
    } = useGetSpecificUserQuery(userId);
        
    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const renderProfileContent = () => {
        const { ids, entities } = usersData || {}

        if (!Array.isArray(ids) || ids.length === 0) {
            return <p>No user data available</p>;
        }

        const defaultIdKey = ids[0];
        const user = entities[defaultIdKey];

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
        <Header/>
        <main className="flex items-center justify-center relative xs:min-h-[86vh] xl:min-h-[82.5vh] bg-metal bg-metal-size bg-metal-position">
            <div className="flex  bg-[#1a1919] p-[1%] rounded-3xl w-[85%] h-[90%]">
                <div className="flex flex-col items-center mt-[2%] w-[15%] h-[750px] border-r-2 border-gray-500">
                    <button 
                        className="bg-[#1a1919] mt-[10px] w-[70%] p-[10px] text-goldenrod border-b-2 border-[#1a1919] hover:border-gray-500" 
                        onClick={() => handleNavItemClick('profile')}
                    >
                        <FontAwesomeIcon icon={faUser} className="text-gray-500"/>
                        <span className="ml-[10px] text-goldenrod">Profile</span>
                    </button>
                    <button 
                        className="bg-[#1a1919] my-[5%] w-[70%] p-[10px] text-goldenrod border-b-2 border-[#1a1919] hover:border-gray-500" 
                        onClick={() => handleNavItemClick('statistics')}
                    >
                        <FontAwesomeIcon icon={faChartColumn} className="text-gray-500"/>
                        <span className="ml-[10px] text-goldenrod">View Statistics</span>
                    </button>
                    <button 
                        className="bg-[#1a1919] mb-[5%] w-[70%] p-[10px] text-goldenrod border-b-2 border-[#1a1919] hover:border-gray-500"
                        onClick={() => handleNavItemClick('security')}
                    >
                        <FontAwesomeIcon icon={faLock} className="text-gray-500"/>
                        <span className="ml-[10px] text-goldenrod">Security</span>
                    </button>
                    <button 
                        className="bg-[#1a1919] w-[70%] p-[10px] text-goldenrod border-b-2 border-[#1a1919] hover:border-gray-500" 
                        onClick={() => handleNavItemClick('delete')}
                    >
                        <FontAwesomeIcon icon={faUserSlash} className="text-gray-500"/>
                        <span className="ml-[10px] text-goldenrod">Delete Account</span>
                    </button>
                </div>
                <div className="flex flex-col w-3/4 h-full p-[20px]">
                    {renderProfileContent()}
                </div>
            </div>
        </main>
        <Footer/>
        </>
    );

    return content
    };

    export default Profilepage;