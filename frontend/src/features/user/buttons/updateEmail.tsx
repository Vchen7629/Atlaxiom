import { useSelector } from "react-redux";
import { UserId } from "../types/subpagetypes";
import { useUpdateUserMutation } from "@/app/api-slices/usersApiSlice";
import { SaveEmailButton } from "../types/editcomponenttypes";
import { toast } from "sonner";
import { toastErrorMessage, toastSuccessMessage } from "@/shared/types/toast";

const UpdateEmailButton = ({ UpdateEmailProps } : SaveEmailButton) => {
    const {
        refetch,
        newEmail, setNewEmail,
    } = UpdateEmailProps

    const userId = useSelector((state: UserId) => state.auth.userId);

    const [updateUsername] = useUpdateUserMutation()

    async function handleSubmitEmail() {
        await updateUsername({
            id: userId,
            userData: { email: newEmail },
        }).unwrap();
        setNewEmail('')
        refetch()
        return { name: newEmail}
    };

    function handleClick() {
        const promise = handleSubmitEmail();
        toast.promise(promise, {
            loading: "loading...",
            success: (data: toastSuccessMessage) => `Email Updated Successfully to: ${data?.name}`,
            error: (error: toastErrorMessage) => {
                if (error?.status === 404) {
                    return "User Not Found";
                } else if (error?.status === 400) {
                    return "No email provided, Please provide a email";
                } else if (error?.status === 422) {
                    return  "Invalid Email Format";
                } else if (error?.status === 409) {
                    return  "Duplicate Email, Please Enter a Different Email";
                } else {
                    return "An unexpected error occurred";
                }
            }
        })
    }

    return (
        <button className="flex items-center justify-center rounded-2xl bg-blue-500 w-36 h-10" onClick={handleClick}>
            Save Email
        </button>
    );
}

export default UpdateEmailButton