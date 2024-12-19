export type SaveUsernameButton = {
    UpdateUsernameProps: {
        refetch: any;
        username: string;
        newUsername: string
        setNewUsername: React.Dispatch<React.SetStateAction<string>>;
        setUserErrMsg: React.Dispatch<React.SetStateAction<string>>;
        setUserSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type SaveEmailButton = {
    UpdateEmailProps: {
        refetch: any;
        email: string;
        newEmail: string
        setNewEmail: React.Dispatch<React.SetStateAction<string>>;
        setEmailErrMsg: React.Dispatch<React.SetStateAction<string>>;
        setEmailSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type SavePasswordButton = {
    UpdatePasswordProps: {
        refetch: any;
        newPassword: string;
        setNewPassword: React.Dispatch<React.SetStateAction<string>>
        setPasswordErrMsg: React.Dispatch<React.SetStateAction<string>>;
        setPasswordSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type UsernameInput = {
    UsernameInputProps: {
        newUsername: string;
        setNewUsername: React.Dispatch<React.SetStateAction<string>>;
        setUserErrMsg: React.Dispatch<React.SetStateAction<string>>;
        setUserSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type EmailInput = {
    EmailInputProps: {
        newEmail: string;
        setNewEmail: React.Dispatch<React.SetStateAction<string>>;
        setEmailErrMsg: React.Dispatch<React.SetStateAction<string>>;
        setEmailSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
    }
}

export type PasswordInput = {
    PasswordInputProps: {
        newPassword: string;
        setNewPassword: React.Dispatch<React.SetStateAction<string>>;
        setPasswordErrMsg: React.Dispatch<React.SetStateAction<string>>;
        setPasswordSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
    }
}