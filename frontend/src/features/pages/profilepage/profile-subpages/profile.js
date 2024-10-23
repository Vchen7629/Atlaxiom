<<<<<<< HEAD
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../styling/profilecontent.css"

const ProfileContent = ({ user }) => {
  const { username, email, roles, description } = user;
=======
import React, {useCallback, useEffect, useState }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../styling/profilecontent.css"
import { useSelector } from 'react-redux';
import { useUpdateUserMutation, useGetSpecificUserQuery } from '../../../api-slices/usersApiSlice';
import { isEmailValid, isUsernameValid } from '../../../util/UserDataValidation';

const ProfileContent = ({ user }) => {
  const userId = useSelector((state) => state.auth.userId);
  const { username, email, roles, description, creation, lastUpdated } = user;

  const [updateusername, setUpdateUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [usernameSuccess, setUsernameSuccess] = useState('')
  const [usernameConflict, setUsernameConflict] = useState(false)
  const [userbuttonClick, setUserButtonClick] = useState(false)

  const [updateemail, setUpdateEmail] = useState(user.email)
  const [validEmail, setValidEmail] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState('')
  const [emailbuttonClick, setEmailButtonClick] = useState(false)

  const [bio, setBio] = useState(user.description)

  const [updateClick, setUpdateClick] = useState(false)
  const { refetch: refetchUser } = useGetSpecificUserQuery(userId);

  const onUsernameChanged = useCallback((e) => {
    setUpdateUsername(e.target.value)
    setUsernameError('')
    setUsernameSuccess('')
    setUpdateClick(false)
  }, [])

  const onEmailChanged = useCallback((e) => {
    setUpdateEmail(e.target.value)
    setEmailError('')
    setEmailSuccess('')
    setUpdateClick(false)
  }, [])

  const [updateUser, {
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation(userId)

  const canSaveUsername = validUsername 
  const canSaveEmail = validEmail

  const handleEditUserName = () => {
    setUserButtonClick(true)
    setEmailButtonClick(false)
    setUpdateClick(false)
  }

  const handleEditEmail = () => {
    setUserButtonClick(false)
    setEmailButtonClick(true)
    setUpdateClick(false)
  }

  const handleSubmitUsername = async (e) => {
    e.preventDefault();
    setUpdateClick(true);

    if (!updateusername) {
      setUsernameError("Please enter a Username");
      return;
    } else if (!isUsernameValid(updateusername)) {
      setUsernameError("Please enter a valid username");
      return;
    } else if (updateusername === user.username) {
      setUsernameError("Username entered is the same as current");
      return;
    }

    try {
      await updateUser({ 
        id: user.id, 
        userData: { username: updateusername, email },
      });

      setUpdateUsername('');
      refetchUser();
      setUserButtonClick(false);
    } catch (err) {
      if (error.response && error.response.data) {
        setUsernameError(error.response.data.message);
      } 
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setUpdateClick(true);

    if (!updateemail) {
      setEmailError("Please enter an Email");
      return;
    } else if (!isEmailValid(updateemail)) {
      setEmailError("Please enter a valid email");
      return;
    } else if (updateemail === email.username) {
      setEmailError("Email entered is the same as current");
      return;
    }


    try {
      await updateUser({ 
        id: user.id, 
        userData: { username, email: updateemail },
      })
      
      setUpdateEmail('');
      refetchUser();
      setEmailButtonClick(false);
    } catch (error) {
      setEmailError("An error occurred while updating the email");
    }
  };

  const handleSubmitBio = async (e) => {
    e.preventDefault();

    try {
      await updateUser({
        id: user.id,
        userData: { username, email, description: bio },
      })

      if (isSuccess) {
        refetchUser();
        console.log("Bio updated successfully!");
      }
    } catch (err) {
      console.error("Error updating bio:", err);
    }
  };
>>>>>>> 14ef751 (testing)

  return (
    <>
      <header className="Profile-header-container">
          <FontAwesomeIcon icon={faUser} />
<<<<<<< HEAD
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
=======
          <span className="Profile-title-text">Account Details</span>
      </header>
      <div className="Account-details-container">
        <div className="profile-username-container">
          {!userbuttonClick && (
            <>
              <div className="profile-username-header">Username:</div>
              <div className="input-container">
                <div className="profile-username-body">{username}</div>
                <button 
                  className="edit-username-button"
                  onClick={handleEditUserName}
                >
                  Edit
                </button>
              </div>
            </>
          )}
          {userbuttonClick && (
            <>
              <form style={{display:"flex", alignItems: "center", width: "1200px"}}>
                <div className="profile-username-header">Username:</div>
                <input
                  type="text"
                  className="username-update-input-body"
                  placeholder="Enter New username"
                  value={updateusername}
                  onChange={onUsernameChanged}
                />
                <button 
                  type="submit"
                  className="submit-username-button"
                  onClick={handleSubmitUsername}
                >
                  Update 
                </button>
              </form>
              {usernameError && <div className="submit-error-message">{usernameError}</div>}
            </>
          )}
        </div>
        <div className="profile-email-container">
          {!emailbuttonClick && (
            <>
              <div className="profile-email-header">Email:</div>
              <div className="input-container">
                <div className="profile-email-body">{email}</div>
                <button
                  className="edit-email-button"
                  onClick={handleEditEmail}
                >
                  Edit
                </button>
              </div>
            </>
          )}
          {emailbuttonClick && (
            <>
              <form onSubmit={handleSubmitEmail} style={{display:"flex", alignItems: "center", width: "46%"}}>
                <div className="profile-email-header">Email:</div>
                <input
                  type="text"
                  className="email-update-input-body"
                  placeholder="Enter New Email"
                  value={updateemail}
                  onChange={onEmailChanged}
                />
                <button
                  type="submit"
                  className="submit-email-button"
                >
                  Update
                </button>
              </form>
              {emailError && <div className="email-submit-error-message">{emailError}</div>}
            </>
          )}
>>>>>>> 14ef751 (testing)
        </div>
        <div className="profile-roles-container">
          <span className="profile-roles-header">Roles:</span>
          <div className="profile-roles-body">{roles?.join(', ')}</div>
        </div>
<<<<<<< HEAD
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
=======
        <form 
          className="description-container"
          onSubmit={handleSubmitBio}
        >
          <label>Bio:</label>
          <div style={{display: "flex", flexDirection: "column"}}> 
            <textarea
              className="description-body"
              placeholder="Enter description"
              value={bio}
              onChange={(e) => setBio(e.target.value)} 
            >
              {description}
            </textarea>
            <button 
              type="submit"
              className="Submit-button"
            >
              Enter
            </button>
          </div>
        </form>
        <div className="profile-email-container">
          <span className="profile-email-header">Joined:</span>
          <div className="profile-email-body">{creation}</div>
        </div>
        <div className="profile-email-container">
          <span className="profile-email-header">last Updated:</span>
          <div className="profile-email-body">{lastUpdated}</div>
        </div>
      </div>
>>>>>>> 14ef751 (testing)
      </>
  );
};

export default ProfileContent;