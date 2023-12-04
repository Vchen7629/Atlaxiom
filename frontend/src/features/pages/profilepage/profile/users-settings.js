import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import "../styling/profilecontent.css"
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../../../users/usersApiSlice';

const UserSettings = ({ user }) => {
    const userId = useSelector((state) => state.auth.userId);
    const [username, setUsername] = useState(user.username)
    const [newUsername, setNewUsername] = useState('');

    const onUsernameChanged = e => setUsername(e.target.value)

    const [updateUsername, {
      isloading,
      isSuccess, 
      isError,
      error
    }] = useUpdateUserMutation(userId)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await updateUsername({ 
            id: user.id, 
            userData: { username },
          })
    
          // If the update is successful, you can handle it here
          console.log('User updated successfully:', updateUsername);
    
          // Clear form inputs
          setUsername('');
        } catch (error) {
          // Handle the error
          console.error('Error updating user:', error);
        }
      };

  return (
    <div>
        <header className="Profile-header-container">
            <div className="Profile-header">
            <FontAwesomeIcon icon={faGear} />
            <span className="Profile-title-text">User Settings</span>
            </div>
            <img className="Profile-picture" src="https://picsum.photos/200/300" alt="Profile" />
        </header>
        <main>
            <form onSubmit={handleSubmit}>
                <label>New Username:</label>
                <input 
                  type="text" 
                  id="username"
                  name="username"
                  value={username} 
                  onChange={onUsernameChanged}
                  required 
                />

                <button type="submit">Update Username</button>
            </form>
        </main>
    </div>
  );
}


export default UserSettings;