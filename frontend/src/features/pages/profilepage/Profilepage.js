import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import "./styling/profilecontent.css"
import "./styling/profile.css"
import "./styling/sidenav.css"
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { useGetSpecificUserQuery } from '../../users/usersApiSlice';
import ProfileContent from './profile/profile';
import UserSettings from './profile/users-settings';


const Profilepage = () => {
    const dispatch = useDispatch();
    const [selectedNavItem, setSelectedNavItem] = useState('');
    const userId = useSelector((state) => state.auth.userId);

    useEffect(() => {
        console.log("Current userId:", userId);
    }, [userId]);
    
    const { 
        data: usersData, 
        isLoading,
        isError,
        error, 
    } = useGetSpecificUserQuery(userId, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
    
    const navigate = useNavigate();
    
    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const renderProfileContent = () => {
        const { ids, entities } = usersData || {}

        // Check if ids is an array and has at least one element
        if (!Array.isArray(ids) || ids.length === 0) {
            return <p>No user data available</p>;
        }

        // Assuming the key for the user is "defaultId"
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

        // Now, you can use the user object properties in your component
        const { username, email, roles, description} = user;
        console.log('Render usersData:', usersData);
      
        switch (selectedNavItem) {
            case 'profile':

                return (
                    <ProfileContent user={user} />
                );
            case 'users-settings':
                return (
                    <div>
                        <UserSettings user={user} />
                    </div>
                    );
            case 'ownedcards':
                return (
                    <div>
                        View Owned Cards
                    </div>
                    );
            case 'security':
                return (
                    <div>
                        <header>Security</header>
                        <div>
                            Change Password
                        </div>
                    </div>
                    );
            case 'delete':
                return (
                    <div> 
                        Delete Account
                    </div>
                );
            default:
                return (
                    <div>
                        Default Content
                    </div>
                    );
                }
            };

    const content = (
        <>
        <Header/>
        <main className="Profile-page-background">
            <section className="Profile-page-body-container">
                <div className="Profile-side-nav-container">
                    <button className="Profile-side-nav-button" onClick={() => handleNavItemClick('profile')}>
                        <FontAwesomeIcon icon={faUser} className="button-icon"/>
                        <span className="button-text">Profile</span>
                    </button>
                    <button className="User-setting-nav-button" onClick={() => handleNavItemClick('users-settings')}>
                        <FontAwesomeIcon icon={faGear} className="button-icon"/>
                        <span className="button-text">View User Settings</span>
                    </button>
                    <button className="Owned-cards-nav-button" onClick={() => handleNavItemClick('ownedcards')}>
                        View Owned Cards
                    </button>
                    <button className="security-nav-button"onClick={() => handleNavItemClick('security')}>
                        Security
                    </button>
                    <button className="delete-nav-button" onClick={() => handleNavItemClick('delete')}>
                        Delete Account
                    </button>
                </div>
                <div className="Profile-content-container">
                    {renderProfileContent()}
                </div>
            </section>
        </main>
        <Footer/>
        </>
    );

    return content
    };

    export default Profilepage;