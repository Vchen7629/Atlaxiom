import React, { useState } from 'react';
import "./styling/profile.css"
import "./styling/sidenav.css"
import "./styling/profilecontent.css"

const Profile = () => {
    const [selectedNavItem, setSelectedNavItem] = useState('users');

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const renderProfileContent = () => {
        switch (selectedNavItem) {
            case 'profile':
                return <div className="Profile-content-container">Profile</div>;
            case 'users':
                return <div className="Profile-content-container">View User Settings</div>;
            case 'ownedcards':
                return <div>View Owned Cards</div>;
            case 'security':
                return <div>Security</div>;
            case 'delete':
                return <div>Delete</div>;
            default:
                return <div>Default Content</div>;
        }
    };

    const content = (
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
    );

    return content

}

export default Profile