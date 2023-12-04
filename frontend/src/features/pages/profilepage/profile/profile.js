import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../styling/profilecontent.css"

const ProfileContent = ({ user }) => {
  const { username, email, roles, description } = user;

  return (
    <div>
      <header className="Profile-header-container">
        <div className="Profile-header">
          <FontAwesomeIcon icon={faUser} />
          <span className="Profile-title-text">Profile Page</span>
        </div>
        <img className="Profile-picture" src="https://picsum.photos/200/300" alt="Profile" />
      </header>
      <main className="profile-body-container">
        <div className="profile-username-container">
          <div className="profile-username-header">Username:</div>
          <div className="profile-username-body">{username}</div>
        </div>
        <div className="profile-email-container">
          <span className="profile-email-header">Email:</span>
          <div className="profile-email-body">{email}</div>
        </div>
        <div className="profile-roles-container">
          <span className="profile-roles-header">Roles:</span>
          <div className="profile-roles-body">{roles?.join(', ')}</div>
        </div>
        <form className="description-container">
          <label>Description</label>
          <textarea
            className="description-body"
            placeholder="Enter description"
          >
            {description}
          </textarea>
        </form>
      </main>
    </div>
  );
};

export default ProfileContent;