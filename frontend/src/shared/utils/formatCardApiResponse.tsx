import { toastErrorMessage } from "@/shared/types/toast";

// This is a utility function for formating the api response when querying the
// owned cards endpoint
export default function FormatCardApiResponse(error: toastErrorMessage, type: string) {
    if (error?.status === 404) {
        return error?.response?.data?.message || "Card Not Found";
    } else if (error?.status === 400) {
        return error?.response?.data?.message || `Missing UserId, Card Name or Valid ${type}OwnedAmount`;
    } else if (error?.status === 405) {
        return error?.response?.data?.message || `Unable to ${type} card to 0, try deleting the card instead`;
    } if (error?.status === 409) {
        return error?.response?.data?.message || "You already Own this Card";
    }else {
        return "An unexpected error occurred";
    }
}
