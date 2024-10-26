import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../api-slices/usersApiSlice";
import "../styling/security.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Security = ({ user }) => {
    const userId = useSelector((state) => state.auth.userId);
    const [password, setPassword] = useState(user.password)
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()

    const [updatePassword, {
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation(userId)

    const handleSubmitPassword = async (e) => {
        e.preventDefault();

        await updatePassword({
            id: user.id,
            userData: { password },
        })
            
            if (isSuccess) {
                setPassword('')
                navigate("/login")
            }

            if (isError) {
                setErrMsg("Password was incorrect")
            }
    }


    return (
        <>
            <header className="security-header-container">
                <FontAwesomeIcon icon={faLock}/>
                <span className="security-header-text">User Security</span>
            </header>
            <main>
                <form onSubmit={handleSubmitPassword}>
                    <div className="Security-form-container">
                        
                    </div>
                </form>
            </main>
        </>
    )
}

export default Security