import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUsername } from '../../users/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./styling/profilecontent.css"
import "./styling/profile.css"
import "./styling/sidenav.css"
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { useGetSpecificUserQuery } from '../../users/usersApiSlice';
import { setCredentials } from '../../auth/authSlice';

const Profilepage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUsername);
    const [selectedNavItem, setSelectedNavItem] = useState('');
    const { username } = useSelector(state => state.users);
    const accessToken = useSelector(state => state.auth.token)
    
    const { 
        data: usersData, 
        isLoading,
        isError,
        error, 
    } = useGetSpecificUserQuery(username);

    useEffect(() => {
        if (currentUser) {
          dispatch(setCredentials({ username, accessToken }));
        }
      }, [currentUser, dispatch, username, accessToken]);
    
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
        if (!currentUser) {
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
                    <div>
                        <header className="Profile-header-container">
                            <div className="Profile-header">
                                <FontAwesomeIcon icon={faUser} />
                                <span className="Profile-title-text">Profile Page</span>
                            </div>
                            <img
                                    className="Profile-picture"
                                    src="https://picsum.photos/200/300"
                            />
                        </header>
                        <main className="profile-body-container">
                            <div className="profile-username-container">
                                <div className="profile-username-header">Username:</div>
                                <div className="profile-username-body">{username}</div>
                            </div>
                            <div className="profile-email-container">
                                <div className="profile-email-header">Email:</div>
                                <div className="profile-email-body">{email}</div>
                            </div>
                            <div className="profile-roles-container">
                                <div className="profile-roles-header">Roles:</div>
                                <div className="profile-roles-body">{roles?.join(', ')}</div>
                            </div>
                            <div className="profile-roles-container">
                                <div className="profile-roles-header">Description:</div>
                                <div className="profile-roles-body">{description}</div>
                            </div>
                        </main>
                    </div>
                );
            case 'users':
                return (
                    <div>
                        View User Settings
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
                    <button onClick={() => handleNavItemClick('profile')}>Profile</button>
                    <button onClick={() => handleNavItemClick('users')}>View User Settings</button>
                    <button onClick={() => handleNavItemClick('ownedcards')}>View Owned Cards</button>
                    <button onClick={() => handleNavItemClick('security')}>Security</button>
                    <button onClick={() => handleNavItemClick('delete')}>Delete Account</button>
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