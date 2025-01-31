import { faCaretDown, faEnvelope, faLock, faUser, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { EditEmailInputComponent, EditPasswordInputComponent, EditUsernameInputComponent } from "../../../components/profilepagecomponents/editaccountcomponents/inputcomponents.tsx";
import UsernameUpdateButton from "../../../components/profilepagecomponents/editaccountcomponents/usernameupdatebutton.tsx";
import EmailUpdateButton from "../../../components/profilepagecomponents/editaccountcomponents/emailupdatebutton.tsx";
import PasswordUpdateButton from "../../../components/profilepagecomponents/editaccountcomponents/passwordupdatebutton.tsx";
import DeleteAccountInputComponent from "../../../components/profilepagecomponents/deleteaccountcomponents/deleteaccountinput.tsx";
import DeleteAccountButton from "../../../components/profilepagecomponents/deleteaccountcomponents/deleteaccountbutton.tsx";
import { EditAccount } from "../types/subpagetypes.ts";
import { Toaster } from "sonner";

const EditAccountPage = ({ usersData, refetch }: EditAccount) => {
    const username = usersData?.username;
    const email = usersData?.email;
    const [changeUsername, setChangeUsername] = useState(true);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [deleteInput, setDeleteInput] = useState('');

    const pages = ["username", "email", "password", "delete"];

    const [selectedPage, setSelectedPage] = useState<string>(pages[0])

    const handlePageChange = (value: string) => {
        setSelectedPage(value);
    
        setChangeUsername(false);
        setChangeEmail(false);
        setChangePassword(false);
        setDeleteAccount(false);
    
        if (value === "username") setChangeUsername(true);
        if (value === "email") setChangeEmail(true);
        if (value === "password") setChangePassword(true);
        if (value === "delete") setDeleteAccount(true);
      };

    const UpdateUsernameProps = {
        refetch,
        newUsername, setNewUsername
    }

    const UpdateEmailProps = {
        refetch,
        newEmail, setNewEmail,
    }

    const UpdatePasswordProps = {
        refetch,
        newPassword, setNewPassword,
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
        <div className="flex flex-col lg:flex-row pl-8 pt-8 bg-[hsl(var(--profilebackground))] rounded-xl">
            <Toaster richColors expand visibleToasts={4} position="bottom-center"/>
            <section className="flex xl:hidden w-full pr-[5vw] h-fit mb-2 items-center justify-between">
                {changeUsername ? (
                    <header className="flex h-fit items-center space-x-4 xl:hidden font-bold text-xl text-[hsl(var(--text))]">
                        <FontAwesomeIcon icon={faUser} className="text-[hsl(var(--background3))] fa-xl" />
                        <span>Change Username</span>
                    </header>
                ) : changeEmail ? (
                    <header className="flex h-fit items-center space-x-4 xl:hidden font-bold text-xl text-[hsl(var(--text))]">
                        <FontAwesomeIcon icon={faEnvelope} className="text-[hsl(var(--background3))] fa-xl" />
                        <span>Change Email</span>
                    </header>
                ) : changePassword ? (
                    <header className="flex h-fit items-center space-x-4 xl:hidden font-bold text-xl text-[hsl(var(--text))]">
                        <FontAwesomeIcon icon={faLock} className="text-[hsl(var(--background3))] fa-xl" />
                        <span>Update Password</span>
                    </header>
                ) : deleteAccount && (
                    <header className="flex h-fit items-center space-x-4 xl:hidden font-bold text-xl text-[hsl(var(--text))]">
                        <FontAwesomeIcon icon={faUserSlash} className="text-red-400 fa-xl" />
                        <span>Delete Account</span>
                    </header>
                )}
                <select 
                    className="flex bg-transparent text-[hsl(var(--text))] items-center px-4 space-x-2 sm:w-[15vw] lg:w-[10vw] h-[4vh] rounded-lg outline-none border-2 border-[hsl(var(--text))]"
                    onChange={(e) => handlePageChange(e.target.value)}
                    value={selectedPage}
                >
                    {pages.map((pages, index) => (
                        <option key={index}>{pages}</option>
                    ))}
                    <FontAwesomeIcon icon={faCaretDown} className="text-[hsl(var(--text))]"/>
                </select>
            </section>
            <section className="hidden xl:flex flex-col h-full w-1/4 space-y-6 text-xl text-[hsl(var(--text))]">
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
                    <span>Update Password</span>
                </button>
                <button className="w-full flex items-center space-x-6" onClick={handleDeleteAccountClick}>
                    <div className={`flex items-center justify-center w-10 h-10 ${deleteAccount ? "bg-red-500" : "bg-footer text-white"} rounded-xl`}>
                        <FontAwesomeIcon icon={faUserSlash}/>
                    </div>
                    <span>Delete Account</span>
                </button>
            </section>
            <section className="h-[50vh] w-full lg:w-3/4 ">
                {changeUsername && (
                    <div className="flex flex-col">
                        <header className="hidden xl:flex font-bold text-3xl text-[hsl(var(--text))]">Change Username</header>
                        <div className="text-gray-400 font-bold my-4"> Current Username: {username}</div>
                        <div className="text-[hsl(var(--text))] mb-4"> New Username: </div>
                        <div className="mb-8"><EditUsernameInputComponent newUsername={newUsername} setNewUsername={setNewUsername}/></div>
                        <div><UsernameUpdateButton UpdateUsernameProps={UpdateUsernameProps} /></div>
                    </div>
                )} 
                {changeEmail && (
                    <div className="flex flex-col">
                        <header className="hidden xl:flex font-bold text-3xl text-[hsl(var(--text))]">Change Email</header>
                        <div className="text-gray-400 font-bold my-4"> Current Email: {email}</div>
                        <div className="text-[hsl(var(--text))] mb-4"> New Email: </div>
                        <div className="mb-8"><EditEmailInputComponent newEmail={newEmail} setNewEmail={setNewEmail} /></div>
                        <div><EmailUpdateButton UpdateEmailProps={UpdateEmailProps}/></div>
                    </div>
                )}
                {changePassword && (
                    <div className="flex flex-col">
                        <header className="hidden xl:flex font-bold text-3xl text-[hsl(var(--text))]">Change Password</header>
                        <div className="text-[hsl(var(--text))] my-4">New Password: </div>
                        <div className="mb-8"><EditPasswordInputComponent newPassword={newPassword} setNewPassword={setNewPassword} /></div>
                        <div><PasswordUpdateButton UpdatePasswordProps={UpdatePasswordProps}/></div>
                    </div>
                )}
                {deleteAccount && (
                    <div className="flex flex-col">
                        <header className="hidden xl:flex font-bold text-3xl text-[hsl(var(--text))] mb-4">Delete Your Account</header>
                        <div className="text-gray-500 w-1/2 mb-8">
                            Deleting your account will remove all of your information from our database. This
                            cannot be undone.
                        </div>
                        <div className="flex flex-col space-y-4">
                            <DeleteAccountInputComponent deleteInput={deleteInput} setDeleteInput={setDeleteInput}/>
                            <DeleteAccountButton deleteInput={deleteInput}/>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default EditAccountPage