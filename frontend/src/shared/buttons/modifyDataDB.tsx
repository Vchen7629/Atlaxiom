import { toast } from "sonner";

type ButtonProps<TSuccess, TError = unknown> = {
    onModify: () => Promise<TSuccess>; // async function for interacting with db
    successMessage: (data: TSuccess) => string;
    errorHandler: (error: TError) => string;
    children?: React.ReactNode; // the button text
    className?: string; // import styles from parent
}


// This component implements a button that interacts with the database
export default function ModifyDataDB<TSuccess, TError = unknown>({
    onModify, 
    successMessage,
    errorHandler,
    children,
    className
}: ButtonProps<TSuccess, TError>) {

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        const promise = onModify();
        toast.promise(promise, {
            loading: "loading... ",
            success: successMessage,
            error: errorHandler,
        })
    }

    return (
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    )

}