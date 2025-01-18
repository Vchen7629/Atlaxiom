import { useSelector } from "react-redux";
import { UserId } from "../../../pages/profilepage/types/subpagetypes";
import { useUpdateUserMutation } from "@/features/api-slices/usersApiSlice";
import { SavePasswordButton } from "../types/editcomponenttypes";
import { toast } from "sonner";

const PasswordUpdateButton = ({ UpdatePasswordProps } : SavePasswordButton) => {
    const {
        refetch,
        newPassword, setNewPassword,
    } = UpdatePasswordProps

    const userId = useSelector((state: UserId) => state.auth.userId);

    const [updatePassword] = useUpdateUserMutation(userId)

    const handleSubmitPassword = async () => {
        try {
            await updatePassword({
                id: userId,
                userData: { password: newPassword },
            }).unwrap();  
            setNewPassword('')
            refetch();
        } catch (error) {
            throw error
        }
    };

    return (
        <button 
            className="flex items-center justify-center rounded-2xl bg-blue-500 w-36 h-10" 
            onClick={(event) => {
                event.preventDefault()
                const promise = handleSubmitPassword()
                toast.promise(promise, {
                    loading: "loading...",
                    success: () => "Password Updated Successfully",
                    error: (error: any) => {
                        if (error?.status === 404) {
                            return "User Not Found";
                        } else if (error?.status === 400) {
                            return "No password provided, Please enter a password";
                        }
                        return "error updating"
                    }
                })
            }}
        >
            Save Password
        </button>
    );
}

export default PasswordUpdateButton