import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { EmailInput, PasswordInput, UsernameInput } from "../types/editcomponenttypes";

export const EditUsernameInputComponent = ({ newUsername, setNewUsername }: UsernameInput) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNewUsername(inputValue);
    };

    const handleClearClick = () => {
        setNewUsername('');
    };

    return (
        <div className="flex w-[25vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <input
                    className="bg-transparent w-full h-full text-md focus:outline-none"
                    type="text"
                    value={newUsername}
                    onChange={handleInputChange}
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

export const EditEmailInputComponent = ({ newEmail, setNewEmail }: EmailInput) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNewEmail(inputValue);
    };

    const handleClearClick = () => { 
        setNewEmail('') 
    }

    return (
        <div className="flex w-[25vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <input
                    className="bg-transparent w-full h-full text-md focus:outline-none"
                    type="text"
                    value={newEmail}
                    onChange={handleInputChange}
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

export const EditPasswordInputComponent = ({ newPassword, setNewPassword }: PasswordInput) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setNewPassword(inputValue);
    };

    const handleClearClick = () => {
        setNewPassword('')
    };

    return (
        <div className="flex w-[25vw] h-[40px] pl-3 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
            <div className="flex items-center w-full">
                <input
                    className="bg-transparent w-full h-full text-md focus:outline-none"
                    type="text"
                    value={newPassword}
                    onChange={handleInputChange}
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


