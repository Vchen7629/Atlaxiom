/*import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUsername } from '../../users/userSlice';
import { setCredentials } from '../../auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./styling/profilecontent.css"
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';

const Profilepage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUsername);
  const [selectedNavItem, setSelectedNavItem] = useState('');
  const [userData, setUsersData] = useState(null);
  const [userLoading] = useState(false);
  const { username } = useSelector(state => state.users);
  const [userError] = useState(false)
  const accessToken = useSelector(state => state.auth.token)
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Current User:', currentUser);

        if (currentUser) {
            const response = await fetch(`http://localhost:3000/users/${username}`);
            //const response = await fetch(`http://localhost:3000/users/getall`);
            console.log('API Profile page Response:', response);

            if (response.ok) {
                const usersData = await response.json();
                console.log("Raw jsondata", usersData)
                setUsersData(usersData);
                //dispatch(setUsersData({ username: usersData.username }));
                //console.log("dispatched to username", usersData.username)
            } else {
                console.log("response was not ok")
            }
        } else {
          console.error('currentUser is not defined.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentUser, dispatch, username, accessToken]);

  const navigate = useNavigate();

  const handleNavItemClick = (navItem) => {
    setSelectedNavItem(navItem);
    };

  const renderProfileContent = () => {
    if (userError) {
      return <p>Error loading user data</p>;
    }
    
    if (userLoading) {
      return <p>Loading user data...</p>;
    } 
    if (!currentUser) {
      return <p>Please Login</p>;
    }
  
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
                            <div className="profile-username-body">{userData.username}</div>
                        </div>
                        <div className="profile-email-container">
                            <div className="profile-email-header">Email:</div>
                            <div className="profile-email-body">{userData.email}</div>
                        </div>
                        <div className="profile-roles-container">
                            <div className="profile-roles-header">Roles:</div>
                            <div className="profile-roles-body">{userData.roles?.join(', ')}</div>
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

    export default Profilepage;*/