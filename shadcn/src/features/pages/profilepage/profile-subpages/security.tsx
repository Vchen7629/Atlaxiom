import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../api-slices/usersApiSlice.ts";
import "../styling/security.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserId } from "../types/subpagetypes";


const Security = ({ user }: any) => {
    const userId = useSelector((state: UserId) => state.auth.userId);
    const [password, setPassword] = useState(user.password)
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()

    const [updatePassword, {
        isSuccess,
        isError,
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
        <main className="flex flex-col min-h-full pb-[1vh]">
            <header className="pb-[2vh] border-b-2 border-gray-500 text-goldenrod text-4xl">
                <FontAwesomeIcon icon={faLock} className="ml-7"/>
                <span className="ml-5">User Security</span>
            </header>
            <main>
                <form onSubmit={handleSubmitPassword}>
                    <div className="Security-form-container">
                        
                    </div>
                </form>
            </main>
        </main>
    )
}

export default Security