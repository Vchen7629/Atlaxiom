import React, {useCallback, useState }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation, useGetSpecificUserQuery } from '../../../api-slices/usersApiSlice';
import { isEmailValid, isUsernameValid } from '../../../auth/UserDataValidation';

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

  return (
    <>
    <div className="flex flex-col min-h-full pb-[1vh] ">
      <header className="pb-[2vh] border-b-2 border-gray-500 text-goldenrod text-4xl">
          <FontAwesomeIcon icon={faUser} className="ml-7"/>
          <span className="ml-5">Profile</span>
      </header>
      <div className="flex flex-col h-[50vh] my-[3vh] overflow-y-auto">
        <div className="flex items-center mb-[2vh] text-2xl">
          {!userbuttonClick && (
            <>
              <div className="p-1.25 text-white">Username:</div>
              <div className="flex w-[40%] items-center">
                <div className="w-fit min-w-[60%] text-orange-400 p-1.25 ml-5">{username}</div>
                <button 
                  className="w-20 h-[35px] bg-gray-500 text-2xl"
                  onClick={handleEditUserName}
                >
                  Edit
                </button>
              </div>
            </>
          )}
          {userbuttonClick && (
            <>
              <form className="flex items-center w-[1200px] h-12.5">
                <div className="p-1.25 text-white">Username:</div>
                <input
                  type="text"
                  className="bg-[#4c607a18] border-solid border-gray-500 text-2xl text-orange-400 w-[412px] px-5 h-[45px] hover:border-2 hover:border-orange-500"
                  placeholder="Enter New username"
                  value={updateusername}
                  onChange={onUsernameChanged}
                />
                <button 
                  type="submit"
                  className="w-[100px] h-[45px] rounded-tr-2xl rounded-br-2xl bg-gold text-xl"
                  onClick={handleSubmitUsername}
                >
                  Update 
                </button>
              </form>
              {usernameError && <div className="ml-[-36%] text-red-700">{usernameError}</div>}
            </>
          )}
        </div>
        <div className="flex items-center mb-[2vh] text-2xl">
          {!emailbuttonClick && (
            <>
              <div className="p-1.25 text-white">Email:</div>
              <div className="flex w-[40%] items-center">
                <div className="w-fit min-w-[68.3%] text-orange-400 p-1.25 ml-5">{email}</div>
                <button
                  className="w-20 h-[35px] bg-gray-500  text-2xl"
                  onClick={handleEditEmail}
                >
                  Edit
                </button>
              </div>
            </>
          )}
          {emailbuttonClick && (
            <>
              <form onSubmit={handleSubmitEmail} className="flex items-center w-[1200px] h-12.5">
                <div className="p-1.25 text-white">Email:</div>
                <input
                  type="text"
                  className="bg-[#4c607a18] border-solid border-gray-500 text-2xl text-orange-400 w-[450px] px-5 h-[45px] hover:border-2 hover:border-orange-500"
                  placeholder="Enter New Email"
                  value={updateemail}
                  onChange={onEmailChanged}
                />
                <button
                  type="submit"
                  className="w-[100px] h-[45px] rounded-tr-2xl rounded-br-2xl bg-gold text-xl"
                >
                  Update
                </button>
              </form>
              {emailError && <div className="ml-[-36%] text-red-700">{emailError}</div>}
            </>
          )}
        </div>
        <div className="flex items-center mb-[2vh] text-2xl">
          <span className="p-1.25 text-white">Roles:</span>
          <div className="w-fit min-w-[60%] p-1.25 ml-5 text-orange-500">{roles?.join(', ')}</div>
        </div>
        <form 
          className="flex h-fit mb-[2vh] ml-1.25 text-white text-2xl"
          onSubmit={handleSubmitBio}
        >
          <label>Bio:</label>
          <div className="flex flex-col"> 
            <textarea
              className="bg-gray-500 text-black border-solid border-black p-2.5 w-[25vw] h-[15vh] ml-[40px] text-xl"
              placeholder="Enter description"
              value={bio}
              onChange={(e) => setBio(e.target.value)} 
            >
              {description}
            </textarea>
            <button 
              type="submit"
              className="w-[30%] bg-gold ml-[41px] rounded-md"
            >
              Enter
            </button>
          </div>
        </form>
        <div className="flex w-fit min-w-3/4 my-[2vh] text-2xl items-center">
          <span className="text-white p-1.25">Joined:</span>
          <div className="w-fit min-w-[60%] p-1.25 ml-5 text-orange-400">{creation}</div>
        </div>
        <div className="flex w-fit min-w-3/4 text-2xl items-center">
          <span className="text-white p-1.25 min-w-[40%]">last Updated:</span>
          <div className="w-fit min-w-[60%] p-1.25 ml-5 text-orange-400">{lastUpdated}</div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ProfileContent;