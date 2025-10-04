
export function DeleteAccountErrorHandler(error: { status: number, message: string}) {
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