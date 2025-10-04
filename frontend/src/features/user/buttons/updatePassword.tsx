import { useSelector } from "react-redux";
import { UserId } from "../types/subpagetypes";
import { useUpdateUserMutation } from "@/app/api-slices/usersApiSlice";
import { SavePasswordButton } from "../types/editcomponenttypes";
import { toast } from "sonner";
import { toastErrorMessage } from "@/shared/types/toast";

const PasswordUpdateButton = ({ UpdatePasswordProps } : SavePasswordButton) => {
    const {
        refetch,
        newPassword, setNewPassword,
    } = UpdatePasswordProps

    const userId = useSelector((state: UserId) => state.auth.userId);

    const [updatePassword] = useUpdateUserMutation()

    async function handleSubmitPassword() {
        await updatePassword({
            id: userId,
            userData: { password: newPassword },
        }).unwrap();  
        setNewPassword('')
        refetch();
    };

    function handleClick()  {
        const promise = handleSubmitPassword();
        toast.promise(promise, {
            loading: "loading...",
            success: () => "Password Updated Successfully",
            error: (error: toastErrorMessage) => {
                if (error?.status === 404) {
                    return "User Not Found";
                } else if (error?.status === 400) {
                    return "No password provided, Please enter a password";
                } else {
                    return "error updating"
                }
            }
        })
    }

    return (
        <button className="flex items-center justify-center rounded-2xl bg-blue-500 w-36 h-10" onClick={handleClick}>
            Save Password
        </button>
    );
}

export default PasswordUpdateButton