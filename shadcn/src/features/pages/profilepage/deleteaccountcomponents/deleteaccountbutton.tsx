import { useSelector } from "react-redux";
import { UserId } from "../types/subpagetypes";
import { useDeleteUserMutation } from "@/features/api-slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "@/features/auth/authApiSlice";
import { DeleteButtonProps } from "../types/deletecomponenttypes";

const DeleteAccountButton = ({ DeleteButtonProps }: DeleteButtonProps) => {
    const {
        deleteInput,
        setDeleteErrMsg,
        //setDeleteSuccessMsg,
    } = DeleteButtonProps

    const userId = useSelector((state: UserId) => state.auth.userId);
    const navigate = useNavigate();
    const [deleteUser] = useDeleteUserMutation(userId)
    const [sendLogout] = useSendLogoutMutation()
    const deleteMsg = ("DELETE")

    const handleSubmitDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!deleteInput) {
            setDeleteErrMsg("Enter DELETE to confirm Deletion");
            return;
        } 

        if (deleteInput !== deleteMsg) {
            setDeleteErrMsg("Input doesn't match DELETE");
            return;
        }

        try {
            await deleteUser({ id: userId }).unwrap();
            await sendLogout({}).unwrap();
            navigate("/")
        } catch (error) {
            setDeleteErrMsg("Error Deleting Account");
            return;
        }
    };

    return (
        <button className="flex items-center justify-center rounded-2xl bg-red-500 w-36 h-10" onClick={handleSubmitDelete}>
            Delete Account
        </button>
    );
}

export default DeleteAccountButton