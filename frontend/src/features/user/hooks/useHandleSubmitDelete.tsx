import { useDeleteUserMutation } from "@/app/api-slices/usersApiSlice";
import { useSendLogoutMutation } from "@/app/api-slices/authApiSlice";
import { useNavigate } from "react-router-dom";

export function useHandleSubmitDelete() {
    const navigate = useNavigate();
    const [deleteUser] = useDeleteUserMutation();
    const [sendLogout] = useSendLogoutMutation();

    return async function handleSubmitDelete(deleteInput: string) {
        const deleteMsg = "DELETE"

        if (!deleteInput) {
            throw new Error("No Input provided, please enter DELETE to delete account");
        }

        if (deleteInput !== deleteMsg) {
            throw new Error("Input doesn't match DELETE");
        } 
        await deleteUser().unwrap();
        await sendLogout().unwrap();
        navigate("/")
    };
};