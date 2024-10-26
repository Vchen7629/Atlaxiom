    import { useState, useEffect, useRef } from "react"
    import { useAddNewUserMutation } from "../../api-slices/usersApiSlice"
    import { useNavigate } from "react-router-dom"
    import "./styling/Signup.css"
    import Footer from "../../../components/footer/Footer"
    import { isUsernameValid, isPasswordValid, isEmailValid } from "../../auth/UserDataValidation"

    const AccountCreationForm = () => {

        const [addNewUser, {
            isLoading, 
            isSuccess,
            isError,
            error
        }] = useAddNewUserMutation()
        
        const navigate = useNavigate()

        const emailRef = useRef()
        const errRef = useRef()

        const [username, setUsername] = useState('')
        const [validUsername, setValidUsername] = useState(false)
        const [usernameError, setUsernameError] = useState('')

        const [email, setEmail] = useState('')
        const [validEmail, setValidEmail] = useState(false)
        const [emailError, setEmailError] = useState('')

        const [password, setPassword] = useState('')
        const [validPassword, setValidPassword] = useState(false)
        const [passwordError, setPasswordError] = useState('')

        const [errMsg, setErrMsg] = useState('')
        const [formSubmitted, setFormSubmitted] = useState(false);

        useEffect(() => { //code so that username field is focused on page init
            emailRef.current.focus()
        }, []) 


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
                setUsername('')
                setPassword('')
                navigate('/Login')
            }
        }, [isSuccess, navigate])

        useEffect(() => {
            if (isError && error?.status === 409) {
                setErrMsg("Duplicate Username or Password")
                console.log("Duplicate Username or Password")
            }
        }, [isError])
        

        const onUsernameChanged = (e) => {
            setUsername(e.target.value)
            setUsernameError('')
            setFormSubmitted(false)
            setErrMsg('')
        }

        const onEmailChanged = (e) => {
            setEmail(e.target.value)
            setEmailError('')
            setFormSubmitted(false)
            setErrMsg('')
        }

        const onPasswordChanged = (e) => {
            setPassword(e.target.value)
            setPasswordError('')
            setFormSubmitted(false)
            setErrMsg('')
        }

        const canSave = validUsername && validEmail && validPassword && !isLoading;

        const onSaveUserClicked = async (e) => {
            e.preventDefault()

            setFormSubmitted(true)

            if (canSave) {
                await addNewUser({ username, email, password })
            }

        }

        const validUserClass = !validUsername ? 'form__input--incomplete' : ''
        const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
        const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

        const content = (
            <>  
                <div>
                    <h1 className="signup-page-header">New Account Creation</h1>
                </div>
                <main className="signup-page-body-container">
                    <p ref={errRef} aria-live="assertive">{errMsg}</p>

                    <form className="form-container" onSubmit={onSaveUserClicked}>
                        <header className="form-title">Create your free DeckDatabaseOnline Account</header>
                        <div className="form-body">
                            <div className="form-body-title">Enter Your Account details</div>

                            <div className="form-email-container">
                                <input
                                    className={`form-email-input ${validEmailClass && emailError && formSubmitted ? 'error-border' : ''}`}
                                    placeholder=" "
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="off"
                                    value={email}
                                    ref={emailRef}
                                    onChange={onEmailChanged}
                                />
                                <label className="form-email-label" htmlFor="email">
                                    Enter Email
                                </label>
                                
                            </div>
                            {emailError && formSubmitted && (
                                    <div className="sign-up-error-message">
                                        {emailError}
                                    </div>
                                )}

                            <div className="form-username-container">
                                <input
                                    className={`form-username-input ${validUserClass && usernameError && formSubmitted ? 'error-border' : ''}`}
                                    placeholder=" "
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="off"
                                    value={username}
                                    onChange={onUsernameChanged}
                                />
                                <label className="form-username-label" htmlFor="username">
                                    Enter Username
                                </label>
                            </div>
                            {usernameError && formSubmitted &&  (
                                    <div className="sign-up-error-message">
                                        {usernameError}
                                    </div>
                                )}

                            <div className="form-password-container">
                                <input 
                                    className={`form-password-inputs ${validPwdClass && passwordError && formSubmitted ? 'error-border' : ''}`}
                                    placeholder=" "
                                    id="password"
                                    name="password"
                                    type="text"
                                    value={password}
                                    onChange={onPasswordChanged}
                                />
                                <label className="form-password-label" htmlFor="password">
                                    Enter Password
                                </label>
                            </div>
                            {passwordError && formSubmitted && (
                                    <div className="sign-up-error-message">
                                        {passwordError}
                                    </div>
                                )}
                            <div className="form-save-container">
                                <button className="form-save-button">
                                    <h1 className="save-button-text">Create Account</h1>
                                </button>
                                {errMsg && (
                                    <div>
                                        <div className="sign-up-error-message-footer">
                                            {errMsg}
                                        </div>
                                    </div>
                                )}  
                            </div>
                        </div>
                    </form>
                </main>
                <Footer/>
            </>
        )

        return content
    }

    export default AccountCreationForm