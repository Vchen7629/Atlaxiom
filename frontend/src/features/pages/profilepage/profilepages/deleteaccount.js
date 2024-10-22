import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash} from "@fortawesome/free-solid-svg-icons";
import { useDeleteUserMutation } from "../../../api-slices/usersApiSlice";
import { isPasswordValid } from "../../../util/UserDataValidation";
import { useSendLogoutMutation } from "../../../auth/authApiSlice";
import "../styling/deleteaccount.css"

const DeleteAccount = ({ user }) => {
    const userId = useSelector((state) => state.auth.userId);
    const [password, setPassword] = useState(user.password);
    const [validPassword, setValidPassword] = useState(false)
    const [showAccountDeleteform, setShowAccountDeleteForm] = useState(false);

    const onPasswordChanged = e => setPassword(e.target.value)

    const navigate = useNavigate()

    const [sendLogout, {
        isError: logoutError,
    }] = useSendLogoutMutation()

    const [deleteUser, {
        isLoading: deleteUserloading,
        isError: deleteUserError,
        error,
        reset,
    }] = useDeleteUserMutation(userId)

    useEffect(() => {
        setValidPassword(isPasswordValid(password))
    }, [password])

    const canSavePassword = [validPassword].every(Boolean)

    const handledeletebuttonclick = () => {
        setShowAccountDeleteForm(!showAccountDeleteform);
    };

    const handleCancelDeleteClick = () => {
        setShowAccountDeleteForm(false);
        setPassword('');
    };

    const handleConfirmDeleteClick = async(e) => {
        e.preventDefault();

        if (canSavePassword) {
            try {

                let deleteResult;

                deleteResult = await deleteUser ({
                    id: user.id,
                    userData: { password }
                })
                    if (deleteUser) {
                        let logoutResult;
                        logoutResult = await sendLogout();
                            if (logoutResult) {
                                navigate("/login");
                            }
                            if (logoutError) {
                                console.error("Logout ran into an issue")
                            }
                            
                    }

                    if (deleteUserError) {
                        console.error("Error deleting user", error)
                    }

                    if (error) {
                        console.error("error", error)
                    }
            } finally {
                reset();
            }
        }
    };


    return (
        <div>
            <header className="user-setting-header-container">
                <div className="user-setting-header">
                    <FontAwesomeIcon icon={faUserSlash} />
                    <span className="user-setting-title-text">Delete Account</span>
                </div>
                <img className="user-setting-picture" src="https://picsum.photos/200/300" alt="Profile" />
            </header>
            <main>
                <div className="banner-container">
                    <div className="banner-text">Delete Your Account:</div>
                    <button
                        className="show-form-button"
                        onClick={handledeletebuttonclick}
                    >
                        Delete 
                    </button>
                </div>
                {showAccountDeleteform && (
                    <div className="delete-form-container">
                        <form onSubmit={handleConfirmDeleteClick}>
                            <input
                                type="password"
                                className="delete-account-input-field"
                                id="password"
                                name="password"
                                placeholder="enter password"
                                value={password}
                                onChange={onPasswordChanged}
                            />
                            <button 
                                className="Confirm-Delete-Button"
                            >
                                Confirm Deletion
                            </button>
                            <button onClick={handleCancelDeleteClick}>
                                Cancel
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    )

}

export default DeleteAccount