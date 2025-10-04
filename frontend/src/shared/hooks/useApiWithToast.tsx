import { toast } from "sonner";
import { toastErrorMessage } from "@/shared/types/toast";

type Api<T> = (cardName: string) => Promise<T>

export default function useApiWithToast<T extends { name: string } | undefined>(
    apiCall: Api<T>, // input: calls api method and returns promise of type T: { name: string } | undefined 
    successMessage: (data: T) => string, // success param:
    errorFormatter: (error: toastErrorMessage) => string // pass in your api formating function,
) { 
    return (arg: string) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();

            const promise = apiCall(arg);

            toast.promise(promise, {
                loading: "loading...",
                success: successMessage, 
                error: errorFormatter
            })
        }
    }
}