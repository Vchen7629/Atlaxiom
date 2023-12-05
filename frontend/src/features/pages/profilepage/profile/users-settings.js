import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "../styling/usersetting.css"
import { useSelector } from 'react-redux';
import { useUpdateUserMutation, useGetSpecificUserQuery } from '../../../users/usersApiSlice';
import { isEmailValid, isUsernameValid } from '../../../util/UserDataValidation';

const UserSettings = ({ user }) => {
    const userId = useSelector((state) => state.auth.userId);
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [validusername, setValidUsername] = useState(false)
    const [validemail, setValidEmail] = useState(false)
    const [showUsernameInput, setShowUsernameInput] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);

    const { refetch: refetchUser } = useGetSpecificUserQuery(userId);

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)

    const handleUsernameButtonClick = () => {
      setShowUsernameInput(!showUsernameInput);
    };

    const handleEmailButtonClick = () => {
      setShowEmailInput(!showEmailInput);
    };

    const [updateUsername, {
      isSuccess: isUsernameSuccess,
      isError: isUsernameError,
      error: usernameError
    }] = useUpdateUserMutation(userId)

    const [updateEmail, {
      isSuccess: isEmailSuccess,
      isError: isEmailError,
      error: emailError
    }] = useUpdateUserMutation(userId)

    useEffect(() => {
      setValidUsername(isUsernameValid(username))
    }, [username])

    useEffect(() => {
      setValidEmail(isEmailValid(email))
    }, [email])

    const canSaveUsername = [validusername].every(Boolean)
    const canSaveEmail = [validemail].every(Boolean)

    const handleSubmitUsername = async (e) => {
        e.preventDefault();

        if (canSaveUsername) {
          await updateUsername({ 
            id: user.id, 
            userData: { username, email },
          })
            if (isUsernameSuccess) {
              console.log('User updated successfully:', updateUsername);
              setUsername('');
              refetchUser();
            }

            if (isUsernameError) {
              console.log("error saving username")
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
              console.log("Email updated successfully");
              setEmail('');
              refetchUser();
            }

            if (isEmailError) {
              console.log("error saving email")
            }
        }
      };
      

  return (
    <div>
        <header className="user-setting-header-container">
            <div className="user-setting-header">
              <FontAwesomeIcon icon={faGear} />
              <span className="user-setting-title-text">User Settings</span>
            </div>
            <img className="user-setting-picture" src="https://picsum.photos/200/300" alt="Profile" />
        </header>
        <main>
            <form onSubmit={handleSubmitUsername}>
              <div className="Form-container">
                <div className="username-header">
                  <div className="change-username-header">Change Username: </div>
                  <button className="change-username-header-button" onClick={handleUsernameButtonClick}>
                    Change Username
                  </button>
                </div>
                <div className="form">
                  {showUsernameInput && (
                    <>
                      <input
                        type="text"
                        className="username-update-input-body"
                        id="username"
                        name="username"
                        placeholder="enter new username"
                        value={username}
                        onChange={onUsernameChanged}
                      />
                      <button 
                        className={`update-username-button ${canSaveUsername ? 'canSave' : ''}`}
                        disabled={!canSaveUsername} 
                      >
                        Update Username
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>

            <form onSubmit={handleSubmitEmail}>
              <div className="Form-container">
                <div className="email-header">
                  <div className="change-email-header">Change Email: </div>
                  <button className="change-email-header-button" onClick={handleEmailButtonClick}>
                    Change Email
                  </button>
                </div>
                <div className="form">
                  {showEmailInput && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </form>
        </main>
    </div>
  );
}


export default UserSettings;