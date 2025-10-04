import { toastErrorMessage } from "../types/toast";

export default function NormalizeToToastError(error: unknown): toastErrorMessage {
    // Already a toastErrorMessage so return it
    if (error && typeof error === 'object' && 'status' in error) {
        return error as toastErrorMessage;
    }

    // Has a name property
    if (error && typeof error === 'object' && 'name' in error) {
        return {
            status: 500,
            response: {
                data: {
                    message: (error as { name: string }).name
                }
            }
        };
    }
    
    // Default fallback
    return {
        status: 500,
        response: {
            data: {
                message: "An unexpected error occurred"
            }
        }
    };
}