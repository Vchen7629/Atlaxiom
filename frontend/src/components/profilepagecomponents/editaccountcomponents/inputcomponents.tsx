import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { EmailInput, PasswordInput, UsernameInput } from "../types/editcomponenttypes";

export const EditUsernameInputComponent = ({ UsernameInputProps }: UsernameInput) => {
    const {
        newUsername, setNewUsername,
        setUserErrMsg,
        setUserSuccessMsg,
    } = UsernameInputProps

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNewUsername(inputValue);
        setUserErrMsg('');
        setUserSuccessMsg('');
    };

    const handleClearClick = () => {
        setNewUsername('');
        setUserErrMsg('');
        setUserSuccessMsg('');
    };

    const handleUsernameFocus = () => {
        setUserErrMsg('');
        setUserSuccessMsg('');
    }

    return (
        <div className="flex w-[25vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <input
                    className="bg-transparent w-full h-full text-md focus:outline-none"
                    type="text"
                    value={newUsername}
                    onChange={handleInputChange}
                    onFocus={handleUsernameFocus}
                    placeholder="Enter New Username..."
                />
                {newUsername && (
                    <button className="cursor-pointer mr-[10px]" onClick={handleClearClick}>
                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                    </button>
                )}
                </div>
        </div>
    )
}

export const EditEmailInputComponent = ({ EmailInputProps }: EmailInput) => {
    const {
        newEmail,
        setNewEmail,
        setEmailErrMsg,
        setEmailSuccessMsg,
    } = EmailInputProps

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNewEmail(inputValue);
        setEmailErrMsg('');
        setEmailSuccessMsg('');
    };

    const handleClearClick = () => {
        setNewEmail('');
        setEmailErrMsg('');
        setEmailSuccessMsg('');
    };

    const handleEmailFocus = () => {
        setEmailErrMsg('');
        setEmailSuccessMsg('');
    }

    return (
        <div className="flex w-[25vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <input
                    className="bg-transparent w-full h-full text-md focus:outline-none"
                    type="text"
                    value={newEmail}
                    onChange={handleInputChange}
                    onFocus={handleEmailFocus}
                    placeholder="Enter new Email..."
                />
                {newEmail && (
                    <button className="cursor-pointer mr-[10px]" onClick={handleClearClick}>
                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                    </button>
                )}
                </div>
        </div>
    )
}

export const EditPasswordInputComponent = ({ PasswordInputProps }: PasswordInput) => {
    const {
        newPassword,
        setNewPassword,
        setPasswordErrMsg,
        setPasswordSuccessMsg,
    } = PasswordInputProps

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNewPassword(inputValue);
        setPasswordErrMsg('');
        setPasswordSuccessMsg('');
    };

    const handleClearClick = () => {
        setNewPassword('');
        setPasswordErrMsg('');
        setPasswordSuccessMsg('');
    };

    const handlePasswordFocus = () => {
        setPasswordErrMsg('');
        setPasswordSuccessMsg('');
    }

    return (
        <div className="flex w-[25vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <input
                    className="bg-transparent w-full h-full text-md focus:outline-none"
                    type="text"
                    value={newPassword}
                    onChange={handleInputChange}
                    onFocus={handlePasswordFocus}
                    placeholder="Enter new Password"
                />
                {newPassword && (
                    <button className="cursor-pointer mr-[10px]" onClick={handleClearClick}>
                        <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                    </button>
                )}
                </div>
        </div>
    )
}


