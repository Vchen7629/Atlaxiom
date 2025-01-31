import { useSelector } from "react-redux";
import { UserId } from "../../../pages/profilepage/types/subpagetypes";
import { useDeleteUserMutation } from "@/app/api-slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "@/app/auth/authApiSlice";
import { DeleteButtonProps } from "../types/deletecomponenttypes";
import { toast } from "sonner";
import {  toastErrorTwoMessage } from "@/components/cardcollectioncomponents/types/buttontypes";
import { useCallback } from "react";

const DeleteAccountButton = ({ deleteInput }: DeleteButtonProps) => {
    const userId = useSelector((state: UserId) => state.auth.userId);
    const navigate = useNavigate();
    const [deleteUser] = useDeleteUserMutation()
    const [sendLogout] = useSendLogoutMutation()
    const deleteMsg = ("DELETE")

    async function handleSubmitDelete() {
        if (!deleteInput) {
            throw new Error("No Input provided, please enter DELETE to delete account");
        }

        if (deleteInput !== deleteMsg) {
            throw new Error("Input doesn't match DELETE");
        } 
        try {
            await deleteUser({ id: userId }).unwrap();
            await sendLogout({}).unwrap();
            navigate("/")
        }   catch (error) {
            throw error
        }
    };

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const promise = handleSubmitDelete();
        toast.promise(promise, {
            loading: "loading...",
            success: () => "Successfully Deleted Account",
            error: (error: toastErrorTwoMessage) => {
                if (error?.status === 400) {
                    return "No username provided, Please provide a username";
                } else if (error?.message === "Input doesn't match DELETE") {
                    return "Input doesn't match DELETE";
                } else if (error?.message === "No Input provided, please enter DELETE to delete account") {
                    return "No Input provided, please enter DELETE to delete account";
                } else {
                    return "error deleting"
                }
            }
        })
    }, [handleSubmitDelete]);

    return (
        <button className="flex items-center justify-center rounded-2xl bg-red-500 w-36 h-10" onClick={handleClick}>
            Delete Account
        </button>
    );
}

export default DeleteAccountButton