    import { useState, useEffect } from "react"
    import { useAddNewUserMutation } from "../../features/api-slices/usersApiSlice"
    import { useNavigate } from "react-router-dom"
    import { isUsernameValid, isPasswordValid, isEmailValid } from "../../features/auth/UserDataValidation"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { ErrorRes } from "./types/creationformtypes"

    const AccountCreationForm = () => {

        const [addNewUser, {
            isLoading, 
            isSuccess,
            isError,
            error
        }] = useAddNewUserMutation()
        
        const navigate = useNavigate()

        const [username, setUsername] = useState('')
        const [validUsername, setValidUsername] = useState(false)
        const [usernameError, setUsernameError] = useState('')

        const [email, setEmail] = useState('')
        const [validEmail, setValidEmail] = useState(false)
        const [emailError, setEmailError] = useState('')

        const [password, setPassword] = useState('')
        const [validPassword, setValidPassword] = useState(false)
        const [passwordError, setPasswordError] = useState('')

        const [formSubmitted, setFormSubmitted] = useState(false);

        useEffect(() => {
            if (!email) {
                setValidEmail(false);
                setEmailError('Please enter an email');
            } else if (!isEmailValid(email)) {
                setValidEmail(false);
                setEmailError('Please enter a valid email');
            } else {
                setValidEmail(true);
                setEmailError('');
            }
        }, [email, formSubmitted]);

        useEffect(() => {
            if (!username) {
                setValidUsername(false);
                setUsernameError('Please enter a username');
            } else if (username && !isUsernameValid(username)) {
                setValidUsername(false);
                setUsernameError('Please enter a valid username');
            } else {
                setValidUsername(true);
                setUsernameError('');
            }
        }, [username, formSubmitted]);

        useEffect(() => {
            if (!password) {
                setValidPassword(false);
                setPasswordError('Please enter a password');
            } else if (!isPasswordValid(password)) {
                setValidPassword(false);
                setPasswordError('Please enter a valid password');
            } else {
                setValidPassword(true);
                setPasswordError('');
            }
        }, [password, formSubmitted]);

        useEffect(() => {
            if (isSuccess) {
                setUsername('')
                setEmail('')
                setPassword('')
                navigate('/Login')
            }
        }, [isSuccess, navigate])

        useEffect(() => {
            if (isError && "status" in error && error.status === 409) {
                const errData = (error as FetchBaseQueryError).data as ErrorRes
                const errorMessage = errData?.message || "Duplicate Username or Password";
                setUsernameError(errorMessage);
            }
        }, [isError, error]);
        

        const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
            setUsernameError('')
            setFormSubmitted(false)
        }

        const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
            setEmailError('')
            setFormSubmitted(false)
        }

        const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
            setPasswordError('')
            setFormSubmitted(false)
        }

        const canSave = validUsername && validEmail && validPassword && !isLoading;

        const onSaveUserClicked = async (e: React.FormEvent) => {
            e.preventDefault()

            setFormSubmitted(true)

            if (canSave) {
                await addNewUser({ username, email, password })
            }

        }

        const validUserClass = !validUsername ? 'form__input--incomplete' : ''
        const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
        const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

        return (
            <form className="w-[65%] flex flex-col" onSubmit={onSaveUserClicked}>
                    <div className="relative flex flex-col w-full space-y-1">
                        <span className="text-gray-600">Username</span>
                        <input
                            className={`text-xl focus:outline-none text-black pl-4 w-full h-11 bg-transparent border-gray-400 border-2 focus:outline-none ${validUserClass && usernameError && formSubmitted ? 'border-red-400 border-2' : ''}`}
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={username}
                            onChange={onUsernameChanged}
                        />
                        {usernameError && formSubmitted &&  (
                            <div className="absolute top-full text-red-400">
                                {usernameError}
                            </div>
                        )}
                    </div>
                   

                    <div className="relative flex flex-col w-full space-y-1 my-8">
                        <span className="text-gray-600">Email</span>
                        <input
                            className={`text-xl focus:outline-none text-black pl-4 w-full h-11 bg-transparent border-gray-400 border-2 focus:outline-none ${validEmailClass && emailError && formSubmitted ? 'border-red-400 border-2' : ''}`}
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={onEmailChanged}
                        />
                        {emailError && formSubmitted && (
                            <div className="absolute top-full text-red-400">
                                {emailError}
                            </div>
                        )}     
                    </div>

                    <div className="relative flex flex-col w-full space-y-1 mb-12">
                        <span className="text-gray-600">Password</span>
                        <input 
                            className={`text-xl focus:outline-none text-black pl-4 w-full h-11 bg-transparent border-gray-400 border-2 focus:outline-none ${validPwdClass && passwordError && formSubmitted ? 'border-red-400 border-2' : ''}`}
                            id="password"
                            name="password"
                            type="text"
                            value={password}
                            onChange={onPasswordChanged}
                        />
                        <span className="text-gray-600">At least 2 characters</span>   
                        {passwordError && formSubmitted && (
                            <div className="absolute top-full text-red-400">
                                {passwordError}
                            </div>
                        )}
                    </div>
                    
                    <div className="relative flex justify-center">
                        <button className="flex justify-center items-center bg-goldenrod w-full h-[50px] rounded-2xl">
                            <span>Create Account</span>
                        </button>
                    </div>
                </form>
        )
    }

    export default AccountCreationForm