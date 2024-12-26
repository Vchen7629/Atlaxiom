import { faEnvelope, faLock, faUser, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { EditEmailInputComponent, EditPasswordInputComponent, EditUsernameInputComponent } from "../editaccountcomponents/inputcomponents.tsx";
import UsernameUpdateButton from "../editaccountcomponents/usernameupdatebutton.tsx";
import EmailUpdateButton from "../editaccountcomponents/emailupdatebutton.tsx";
import PasswordUpdateButton from "../editaccountcomponents/passwordupdatebutton.tsx";
import DeleteAccountInputComponent from "../deleteaccountcomponents/deleteaccountinput.tsx";
import DeleteAccountButton from "../deleteaccountcomponents/deleteaccountbutton.tsx";
import { EditAccount } from "../types/subpagetypes.ts";

const EditAccountPage = ({ user, refetch }: EditAccount) => {
    const { username, email } = user;
    const [changeUsername, setChangeUsername] = useState(true);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [deleteInput, setDeleteInput] = useState('');

    const [userErrMsg, setUserErrMsg] = useState('');
    const [userSuccessMsg, setUserSuccessMsg] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [emailSuccessMsg, setEmailSuccessMsg] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');
    const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
    const [deleteErrMsg, setDeleteErrMsg] = useState('')

    const UsernameInputProps = {
        newUsername, setNewUsername,
        setUserErrMsg,
        setUserSuccessMsg,
    }

    const UpdateUsernameProps = {
        refetch,
        username,
        newUsername, setNewUsername,
        setUserErrMsg,
        setUserSuccessMsg,
    }

    const EmailInputProps = {
        newEmail, setNewEmail,
        setEmailErrMsg,
        setEmailSuccessMsg,
    }

    const UpdateEmailProps = {
        refetch,
        email,
        newEmail, setNewEmail,
        setEmailErrMsg,
        setEmailSuccessMsg,
    }

    const PasswordInputProps = {
        newPassword, setNewPassword,
        setPasswordErrMsg,
        setPasswordSuccessMsg,
    }

    const UpdatePasswordProps = {
        refetch,
        newPassword, setNewPassword,
        setPasswordErrMsg,
        setPasswordSuccessMsg
    }

    const DeleteInputProps = {
        deleteInput, setDeleteInput,
        setDeleteErrMsg,
    } 

    const DeleteButtonProps = {
        deleteInput,
        setDeleteErrMsg,
    }

    const handleChangeUserNameClick = () => {
        setChangeUsername(true);
        setChangeEmail(false);
        setChangePassword(false);
        setDeleteAccount(false);
    }

    const handleChangeEmailClick = () => {
        setChangeUsername(false);
        setChangeEmail(true);
        setChangePassword(false);
        setDeleteAccount(false);
    }

    const handleChangePasswordClick = () => {
        setChangeUsername(false);
        setChangeEmail(false);
        setChangePassword(true);
        setDeleteAccount(false);
    }

    const handleDeleteAccountClick = () => {
        setChangeUsername(false);
        setChangeEmail(false);
        setChangePassword(false);
        setDeleteAccount(true);
    }

    return (
        <div className="flex pl-4 pt-4">
            <section className="flex flex-col h-full w-1/4 space-y-6 text-xl text-[hsl(var(--text))]">
                <button className="w-full flex items-center space-x-6" onClick={handleChangeUserNameClick}>
                    <div className={`flex items-center justify-center w-10 h-10 ${changeUsername ? "bg-[hsl(var(--background3))]" : "bg-footer text-white"} rounded-xl`}>
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                    <span>Change Username</span>
                </button>
                <button className="w-full flex items-center space-x-6" onClick={handleChangeEmailClick}>
                    <div className={`flex items-center justify-center w-10 h-10 ${changeEmail ? "bg-[hsl(var(--background3))]" : "bg-footer text-white"} rounded-xl`}>
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </div>
                    <span>Change Email</span>
                </button>
                <button className="w-full flex items-center space-x-6" onClick={handleChangePasswordClick}>
                    <div className={`flex items-center justify-center w-10 h-10 ${changePassword ? "bg-[hsl(var(--background3))]" : "bg-footer text-white"} rounded-xl`}>
                        <FontAwesomeIcon icon={faLock}/>
                    </div>
                    <span>Change Password</span>
                </button>
                <button className="w-full flex items-center space-x-6" onClick={handleDeleteAccountClick}>
                    <div className={`flex items-center justify-center w-10 h-10 ${deleteAccount ? "bg-red-500" : "bg-footer text-white"} rounded-xl`}>
                        <FontAwesomeIcon icon={faUserSlash}/>
                    </div>
                    <span>Delete Account</span>
                </button>
            </section>
            <section className="h-[50vh] w-3/4">
                {changeUsername && (
                    <div className="flex flex-col">
                        <header className="font-bold text-3xl text-[hsl(var(--text))]">Change Username</header>
                        <div className="text-gray-400 font-bold my-4"> Current Username: {username}</div>
                        <div className="text-[hsl(var(--text))] mb-4"> New Username: </div>
                        <div className="mb-8"><EditUsernameInputComponent UsernameInputProps={UsernameInputProps} /></div>
                        <div><UsernameUpdateButton UpdateUsernameProps={UpdateUsernameProps} /></div>
                        {userErrMsg && (
                            <div className="bg-red-500 w-fit px-4 py-2 rounded-lg mt-12">{userErrMsg}</div>
                        )}
                        {userSuccessMsg && (
                            <div className="bg-green-500 w-fit px-4 py-2 rounded-lg mt-12">{userSuccessMsg}</div>
                        )}
                    </div>
                )} 
                {changeEmail && (
                    <div className="flex flex-col">
                        <header className="font-bold text-3xl text-[hsl(var(--text))]">Change Email</header>
                        <div className="text-gray-400 font-bold my-4"> Current Email: {email}</div>
                        <div className="text-[hsl(var(--text))] mb-4"> New Email: </div>
                        <div className="mb-8"><EditEmailInputComponent EmailInputProps={EmailInputProps} /></div>
                        <div><EmailUpdateButton UpdateEmailProps={UpdateEmailProps}/></div>
                        {emailErrMsg && (
                            <div className="bg-red-500 w-fit px-4 py-2 rounded-lg mt-12">{emailErrMsg}</div>
                        )}
                        {emailSuccessMsg && (
                            <div className="bg-green-500 w-fit px-4 py-2 rounded-lg mt-12">{emailSuccessMsg}</div>
                        )}
                    </div>
                )}
                {changePassword && (
                    <div className="flex flex-col">
                        <header className="font-bold text-3xl text-[hsl(var(--text))]">Change Password</header>
                        <div className="text-[hsl(var(--text))] my-4">New Password: </div>
                        <div className="mb-8"><EditPasswordInputComponent PasswordInputProps={PasswordInputProps} /></div>
                        <div><PasswordUpdateButton UpdatePasswordProps={UpdatePasswordProps}/></div>
                        {passwordErrMsg && (
                            <div className="bg-red-500 w-fit px-4 py-2 rounded-lg mt-12">{passwordErrMsg}</div>
                        )}
                        {passwordSuccessMsg && (
                            <div className="bg-green-500 w-fit px-4 py-2 rounded-lg mt-12">{passwordSuccessMsg}</div>
                        )}
                    </div>
                )}
                {deleteAccount && (
                    <div className="flex flex-col">
                        <header className="font-bold text-3xl text-[hsl(var(--text))] mb-4">Delete Your Account</header>
                        <div className="text-gray-500 w-1/2 mb-8">
                            Deleting your account will remove all of your information from our database. This
                            cannot be undone.
                        </div>
                        <div className="flex flex-col space-y-4">
                            <DeleteAccountInputComponent DeleteInputProps={DeleteInputProps}/>
                            <DeleteAccountButton DeleteButtonProps={DeleteButtonProps}/>
                        </div>
                        {deleteErrMsg && (
                            <div className="bg-transparent text-red-400 w-fit px-4 py-2 rounded-lg ">{deleteErrMsg}</div>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}

export default EditAccountPage