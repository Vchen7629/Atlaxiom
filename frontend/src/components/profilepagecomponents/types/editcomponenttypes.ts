export type SaveUsernameButton = {
    UpdateUsernameProps: {
        refetch: () => void;
        newUsername: string
        setNewUsername: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type SaveEmailButton = {
    UpdateEmailProps: {
        refetch: () => void;
        newEmail: string
        setNewEmail: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type SavePasswordButton = {
    UpdatePasswordProps: {
        refetch: () => void;
        newPassword: string;
        setNewPassword: React.Dispatch<React.SetStateAction<string>>
    }
}

export type UsernameInput = {
    newUsername: string;
    setNewUsername: React.Dispatch<React.SetStateAction<string>>;
}

export type EmailInput = {
    newEmail: string;
    setNewEmail: React.Dispatch<React.SetStateAction<string>>;
}

export type PasswordInput = {
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
}