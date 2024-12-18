import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash} from "@fortawesome/free-solid-svg-icons";
import { useDeleteUserMutation } from "../../../api-slices/usersApiSlice.ts";
import { isPasswordValid } from "../../../auth/UserDataValidation.ts";
import { useSendLogoutMutation } from "../../../auth/authApiSlice.ts";
import "../styling/deleteaccount.css"
import { UserId } from "../types/subpagetypes.ts";

const DeleteAccount = ({ user }: any) => {
    const userId = useSelector((state: UserId) => state.auth.userId);
    const [password, setPassword] = useState(user.password);
    const [validPassword, setValidPassword] = useState(false)
    const [showAccountDeleteform, setShowAccountDeleteForm] = useState(false);

    const onPasswordChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setPassword(target.value)
    }

    const navigate = useNavigate()

    const [sendLogout, {
        isError: logoutError,
    }] = useSendLogoutMutation()

    const [deleteUser, {
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


    const handleConfirmDeleteClick = async(e: React.FormEvent) => {
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
            <header className="Delete-account-header-container">
                <FontAwesomeIcon icon={faUserSlash} />
                <span className="delete-account-header-text">Delete Account</span>
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
                            <button className="Confirm-Delete-Button">
                                Confirm Deletion
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    )

}

export default DeleteAccount