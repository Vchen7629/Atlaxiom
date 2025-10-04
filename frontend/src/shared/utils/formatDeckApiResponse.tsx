import { toastErrorMessage } from "@/shared/types/toast";

// This is a utility function for formating the api response when querying the
// owned cards endpoint
export default function FormatDeckApiResponse(error: toastErrorMessage, type: string) {
    if (error?.status === 404) {
        return error?.response?.data?.message || "User Not Found";
    } else if (error?.status === 405 && type != "delete") {
        return error?.response?.data?.message || "Deck Not Found";
    } else if (error?.status === 400) {
        return error?.response?.data?.message || "Missing UserId, deckId";
    } else if (error?.status === 500) {
        return error?.response?.data?.message || `Failed to ${type} Deck`;
    } else {
        return error?.response?.data?.message || `Unknown error has occured`;
    }
}
