import { useSelector } from "react-redux";
import { UserId } from "../../../pages/profilepage/types/subpagetypes";
import { useUpdateUserMutation } from "@/features/api-slices/usersApiSlice";
import { SaveUsernameButton } from "../types/editcomponenttypes";

const UsernameUpdateButton = ({ UpdateUsernameProps } : SaveUsernameButton) => {
    const {
        refetch,
        username,
        newUsername, setNewUsername,
        setUserErrMsg,
        setUserSuccessMsg,
    } = UpdateUsernameProps

    const userId = useSelector((state: UserId) => state.auth.userId);

    const [updateUsername ] = useUpdateUserMutation(userId)

    const handleSubmitUsername = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!newUsername) {
            setUserErrMsg("Please enter a Username");
            setNewUsername('')
            return;
        } 

        if (newUsername === username) {
            setUserErrMsg("Username entered is the same as current");
            setNewUsername('')
            return;
        }

        try {
            await updateUsername({
                id: userId,
                userData: { username: newUsername },
            }).unwrap();
                
            setNewUsername('')
            setUserSuccessMsg("Username successfully updated!")
            refetch();
        } catch (error) {
            setUserErrMsg("Error Updating Username");
            setNewUsername('')
            return;
        }
    };

    return (
        <button className="flex items-center justify-center rounded-2xl bg-blue-500 w-36 h-10" onClick={handleSubmitUsername}>
            Save Username
        </button>
    );
}

export default UsernameUpdateButton