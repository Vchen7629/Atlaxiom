import { toast } from "sonner";

type ButtonProps<T> = {
    onModify: () => Promise<T>; // async function for interacting with db
    successMessage: (data: T) => string;
    errorHandler: (error: T) => string;
    children?: React.ReactNode; // the button text
    className?: string; // import styles from parent
}


// This component implements a button that interacts with the database
export default function ModifyDataDB<T>({
    onModify, 
    successMessage,
    errorHandler,
    children,
    className
}: ButtonProps<T>) {

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