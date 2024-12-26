import { useSelector } from "react-redux";
import { UserId } from "../../../features/pages/profilepage/types/subpagetypes";
import { useUpdateUserMutation } from "@/features/api-slices/usersApiSlice";
import { SaveEmailButton } from "../types/editcomponenttypes";

const EmailUpdateButton = ({ UpdateEmailProps } : SaveEmailButton) => {
    const {
        refetch,
        email,
        newEmail, setNewEmail,
        setEmailErrMsg,
        setEmailSuccessMsg,
    } = UpdateEmailProps

    const userId = useSelector((state: UserId) => state.auth.userId);

    const [updateUsername] = useUpdateUserMutation(userId)

    const handleSubmitEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!newEmail) {
            setEmailErrMsg("Please enter a Email");
            setNewEmail('')
            return;
        }
        
        if (newEmail === email) {
            setEmailErrMsg("Email entered is the same as current");
            setNewEmail('')
            return;
        }

        try {
            await updateUsername({
                id: userId,
                userData: { email: newEmail },
            }).unwrap();
            
            setNewEmail('')
            setEmailSuccessMsg("Email successfully updated!")
            refetch()
        } catch (error) {
            setEmailErrMsg("Error Updating Email");
            setNewEmail('')
            return;
        }
    };

    return (
        <button className="flex items-center justify-center rounded-2xl bg-blue-500 w-36 h-10" onClick={handleSubmitEmail}>
            Save Email
        </button>
    );
}

export default EmailUpdateButton