import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../styling/profilecontent.css"

const ProfileContent = ({ user }) => {
  const { username, email, roles, description } = user;

  return (
    <>
      <header className="Profile-header-container">
          <FontAwesomeIcon icon={faUser} />
          <span className="Profile-title-text">Profile Page</span>
      </header>
      <main>
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
      </>
  );
};

export default ProfileContent;