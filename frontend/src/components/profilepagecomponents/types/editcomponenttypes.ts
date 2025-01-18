export type SaveUsernameButton = {
    UpdateUsernameProps: {
        refetch: any;
        newUsername: string
        setNewUsername: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type SaveEmailButton = {
    UpdateEmailProps: {
        refetch: any;
        newEmail: string
        setNewEmail: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type SavePasswordButton = {
    UpdatePasswordProps: {
        refetch: any;
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