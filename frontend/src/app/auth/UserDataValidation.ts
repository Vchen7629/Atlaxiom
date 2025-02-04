export const USER_REGEX = /^[A-Za-z0-9 !@#$%]{3,99}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9 ._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,99}$/;
export const PWD_REGEX = /^[A-Za-z0-9!@#$%]{2,99}$/;

export const isUsernameValid = (username: string) => USER_REGEX.test(username);
export const isEmailValid = (email: string) => EMAIL_REGEX.test(email);
export const isPasswordValid = (password: string) => PWD_REGEX.test(password);