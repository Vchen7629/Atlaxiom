import { useSelector } from "react-redux";
import { UserId } from "../types/subpagetypes";
import { useUpdateUserMutation } from "@/app/api-slices/usersApiSlice";
import { SaveUsernameButton } from "../types/editcomponenttypes";
import { toast } from "sonner";
import { toastErrorMessage, toastSuccessMessage } from "@/shared/types/toast";

const UsernameUpdateButton = ({ UpdateUsernameProps } : SaveUsernameButton) => {
    const {
        refetch,
        newUsername, setNewUsername,
    } = UpdateUsernameProps

    const userId = useSelector((state: UserId) => state.auth.userId);

    const [updateUsername ] = useUpdateUserMutation()

    async function handleSubmitUsername() {
        await updateUsername({
            id: userId,
            userData: { username: newUsername },
        }).unwrap();
        setNewUsername('')
        refetch();
        return { name: newUsername }
    };

    function handleClick() {
        const promise = handleSubmitUsername();
        toast.promise(promise, {
            loading: "loading...",
            success: (data: toastSuccessMessage) => `Username Updated Successfully to: ${data?.name}`,
            error: (error: toastErrorMessage) => {
                if (error?.status === 404) {
                    return "User Not Found";
                } else if (error?.status === 400) {
                    return "No username provided, Please provide a username";
                } else if (error?.status === 409) {
                    return  "Duplicate Username, Please Enter a Different Username";
                } else {
                    return "An unexpected error occurred";
                }
            }
        })
    }

    return (
        <button className="flex items-center justify-center rounded-2xl bg-blue-500 w-36 h-10" onClick={handleClick}>
            Save Username
        </button>
    );
}

export default UsernameUpdateButton