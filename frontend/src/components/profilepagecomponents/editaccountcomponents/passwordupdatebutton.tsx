import { useSelector } from "react-redux";
import { UserId } from "../../../features/pages/profilepage/types/subpagetypes";
import { useUpdateUserMutation } from "@/features/api-slices/usersApiSlice";
import { SavePasswordButton } from "../types/editcomponenttypes";

const PasswordUpdateButton = ({ UpdatePasswordProps } : SavePasswordButton) => {
    const {
        refetch,
        newPassword, setNewPassword,
        setPasswordErrMsg,
        setPasswordSuccessMsg
    } = UpdatePasswordProps

    const userId = useSelector((state: UserId) => state.auth.userId);

    const [updatePassword] = useUpdateUserMutation(userId)

    const handleSubmitPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!newPassword) {
            setPasswordErrMsg("Please enter a Password");
            setNewPassword('')
            return;
        } 

        try {
            await updatePassword({
                id: userId,
                userData: { password: newPassword },
            }).unwrap();
                
            setNewPassword('')
            setPasswordSuccessMsg("Password successfully updated!")
            refetch();
        } catch (error) {
            setPasswordErrMsg("Error Updating Password");
            setNewPassword('')
            return;
        }
    };

    return (
        <button className="flex items-center justify-center rounded-2xl bg-blue-500 w-36 h-10" onClick={handleSubmitPassword}>
            Save Password
        </button>
    );
}

export default PasswordUpdateButton