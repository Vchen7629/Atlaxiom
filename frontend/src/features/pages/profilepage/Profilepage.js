import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn, faGear, faLock, faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import "./styling/profilecontent.css"
import "./styling/profile.css"
import "./styling/sidenav.css"
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';
import ProfileContent from './profile-subpages/profile';
<<<<<<< HEAD
import UserSettings from './profile-subpages/users-settings';
=======
>>>>>>> 14ef751 (testing)
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
<<<<<<< HEAD

                return (
                    <ProfileContent user={user} />
                );
            case 'users-settings':
                return (
                    <UserSettings user={user} />
                    );
=======
                return (
                    <ProfileContent user={user} />
                );
>>>>>>> 14ef751 (testing)
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
        <main className="Profile-page-background">
<<<<<<< HEAD
            <section className="Profile-page-body-container">
=======
            <div className="Profile-page-body-container">
>>>>>>> 14ef751 (testing)
                <div className="Profile-side-nav-container">
                    <button className="Profile-side-nav-button" onClick={() => handleNavItemClick('profile')}>
                        <FontAwesomeIcon icon={faUser} className="button-icon"/>
                        <span className="button-text">
                            Profile
                        </span>
                    </button>
<<<<<<< HEAD
                    <button className="User-setting-nav-button" onClick={() => handleNavItemClick('users-settings')}>
                        <FontAwesomeIcon icon={faGear} className="button-icon"/>
                        <span className="button-text">View User Settings</span>
                    </button>
=======
>>>>>>> 14ef751 (testing)
                    <button className="Owned-cards-nav-button" onClick={() => handleNavItemClick('statistics')}>
                        <FontAwesomeIcon icon={faChartColumn} className="button-icon"/>
                        <span className="button-text">View Statistics</span>
                    </button>
                    <button className="security-nav-button"onClick={() => handleNavItemClick('security')}>
                        <FontAwesomeIcon icon={faLock} className="button-icon"/>
                        <span className="button-text">Security</span>
                    </button>
                    <button className="delete-nav-button" onClick={() => handleNavItemClick('delete')}>
                        <FontAwesomeIcon icon={faUserSlash} className="button-icon"/>
                        <span className="button-text">Delete Account</span>
                    </button>
                </div>
                <div className="Profile-content-container">
                    {renderProfileContent()}
                </div>
<<<<<<< HEAD
            </section>
=======
            </div>
>>>>>>> 14ef751 (testing)
        </main>
        <Footer/>
        </>
    );

    return content
    };

    export default Profilepage;