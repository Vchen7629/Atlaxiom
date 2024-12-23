export const USER_REGEX = /^[A-z0-9 !@#$%]{3,40}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9 ._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/;
export const PWD_REGEX = /^[A-z0-9!@#$%]{2,40}$/;

export const isUsernameValid = (username: string) => USER_REGEX.test(username);
export const isEmailValid = (email: string) => EMAIL_REGEX.test(email);
export const isPasswordValid = (password: string) => PWD_REGEX.test(password);