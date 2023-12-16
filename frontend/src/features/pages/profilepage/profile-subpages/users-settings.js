import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "../styling/usersetting.css"
import { useSelector } from 'react-redux';
import { useUpdateUserMutation, useGetSpecificUserQuery } from '../../../api-slices/usersApiSlice';
import { isEmailValid, isUsernameValid } from '../../../util/UserDataValidation';

const UserSettings = ({ user }) => {
    const userId = useSelector((state) => state.auth.userId);

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [usernameError, setUsernameError] = useState('')
    const [usernameSuccess, setUsernameSuccess] = useState('')

    const [email, setEmail] = useState(user.email)
    const [validEmail, setValidEmail] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [emailSuccess, setEmailSuccess] = useState('')

    const [updateClick, setUpdateClick] = useState(false)

    const { refetch: refetchUser } = useGetSpecificUserQuery(userId);

    const onUsernameChanged = (e) => {
      setUsername(e.target.value)
      setUsernameError('')
      setUsernameSuccess('')
      setUpdateClick(false)
    }

    const onEmailChanged = (e) => {
      setEmail(e.target.value)
      setEmailError('')
      setEmailSuccess('')
      setUpdateClick(false)
    }

    const [updateUsername, {
      isSuccess: isUsernameSuccess,
      isError: isUsernameError,
      error: usernameErrorRes,
      reset: resetUsernameError,
    }] = useUpdateUserMutation(userId)

    console.log("hi 1", isUsernameError)
    console.log("hi 2", usernameErrorRes)


    const [updateEmail, {
      isSuccess: isEmailSuccess,
      isError: isEmailError,
    }] = useUpdateUserMutation(userId)

    useEffect(() => {
      if (!username) {
        setValidUsername(false);
        setUsernameError("Please enter an Username")
        setUsernameSuccess('')
      } else if (!isUsernameValid(username)) {
        setValidUsername(false);
        setUsernameError("Please enter a valid username")
        setUsernameSuccess('')
      } else if (username === user.username) {
        setValidUsername(false);
        setUsernameError("Username entered is the same as current");
        setUsernameSuccess('')
      } else if (isUsernameError && usernameErrorRes?.status === 409) {
        setValidUsername(false);
        setUsernameError("Username already Taken")
        setUsernameSuccess('')
        resetUsernameError()
      } else {
        console.log("testing")
        setValidUsername(true);
        setUsernameError('')
        resetUsernameError()
        setUsernameSuccess("Username Updated Successfully")
      }
    }, [username, updateClick, isUsernameError])

    useEffect(() => {
      if (!email) {
        setValidEmail(false);
        setEmailError("Please enter an Email")
      } else if (!isEmailValid(email)) {
        setValidEmail(false);
        setEmailError("Please enter a valid email")
      } else {
        setValidEmail(true);
        setEmailError('')
      }
    }, [email, updateClick])

    const canSaveUsername = validUsername 
    const canSaveEmail = validEmail

    const handleSubmitUsername = async (e) => {
        e.preventDefault();
        setUpdateClick(true);
        

        if (canSaveUsername) {
          await updateUsername({ 
            id: user.id, 
            userData: { username, email },
          })
            if (isUsernameSuccess) {
              setUsername('');
              refetchUser();
            } 
        }
      };

    const handleSubmitEmail = async (e) => {
      e.preventDefault();

      if (canSaveEmail) {
        await updateEmail({
          id: user.id,
          userData: { username, email },
        })
            if (isEmailSuccess) {
              setEmail('');
              refetchUser();
            }
        }
      };
      

  return (
    <div>
        <header className="user-setting-header-container">
            <FontAwesomeIcon icon={faGear} />
            <span className="user-setting-title-text">User Settings</span>
        </header>
        <main>
            <form onSubmit={handleSubmitUsername}>
              <div className="Username-form-container">
                <div className="username-header">
                  <div className="change-username-header">
                    Change Username:
                  </div>
                  <input
                      type="text"
                      className="username-update-input-body"
                      id="username"
                      name="username"
                      placeholder=" "
                      value={username}
                      onChange={onUsernameChanged}
                    />
                  <label className="username-update-input-label" htmlFor="username">
                    Enter New Username
                  </label>
                  <button className="update-username-button">
                    Update Username
                  </button>
                </div>
                {usernameError && updateClick && (
                  <div className="user-setting-update-error-message">
                    {usernameError}
                  </div>
                )}
                {usernameSuccess && updateClick && (
                  <div className="user-setting-update-success-message">
                    {usernameSuccess}
                  </div>
                )}
              </div>
            </form>

            <form onSubmit={handleSubmitEmail}>
              <div className="Form-container">
                <div className="email-header">
                  <div className="change-email-header">Change Email: </div>
                </div>
                <div className="form">
                    <div>
                      <input 
                      type="text" 
                      className="email-update-input-body"
                      id="email"
                      name="email"
                      placeholder="enter new email"
                      value={email} 
                      onChange={onEmailChanged}
                      />
                      <button 
                        className={`update-email-button ${canSaveEmail ? 'canSave' : ''}`}
                        disabled={!canSaveEmail} 
                      >
                        Update Email
                      </button>
                    </div>
                </div>
              </div>
            </form>
        </main>
    </div>
  );
}


export default UserSettings;