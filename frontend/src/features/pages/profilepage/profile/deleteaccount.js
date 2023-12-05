import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash} from "@fortawesome/free-solid-svg-icons";
import { useDeleteUserMutation } from "../../../users/usersApiSlice";
import { isPasswordValid } from "../../../util/UserDataValidation";
import { useSendLogoutMutation } from "../../../auth/authApiSlice";

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
        setShowAccountDeleteForm(true);
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

                        console.log("User Deleted Successfully not yet logged out");
                        logoutResult = await sendLogout();
                            if (logoutResult) {
                                console.log("User deleted and logged out successfully");
                            }

                            if (logoutError) {
                                console.log("Logout ran into an issue")
                            }
                            navigate("/login");
                    }

                    if (deleteUserError) {
                        console.log("Error deleting user", error)
                    }

                    if (error) {
                        console.log("error", error)
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
                <div>
                    <form onSubmit={handleConfirmDeleteClick}>
                        <label htmlFor="password">Enter your password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="enter password"
                            value={password}
                            onChange={onPasswordChanged}
                        />
                        <button disabled={deleteUserloading}>
                            Confirm Deletion
                        </button>
                        <button onClick={handleCancelDeleteClick}>
                            Cancel
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )

}

export default DeleteAccount