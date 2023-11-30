import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "../users/usersApiSlice"
import { useNavigate } from "react-router-dom"
import "./styling/Signup.css"
import Footer from "../../components/footer/Footer"

const USER_REGEX = /^[A-z0-9!@#$%]{3,40}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{2,40}$/

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
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    
    /*Check if the username is valid compared against regex */
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    /*Check if the email is valid compared against regex */
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    /*Check if the password is valid compared against regex */
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    /*if all checks pass navigate to the users page and clear user data */
    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setUsername('')
            setPassword('')
            navigate('/Login')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    /*check to see if roles.length, username is valid, and password is valid all are true so the program can save the */
    const canSave = [validUsername, validEmail, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, email, password })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    const content = (
        <>  
            <banner>
                <h1 className="signup-page-banner">New Account Creation</h1>
            </banner>
            <body className="signup-page-body-container">
                <p className={errClass}>{error?.data?.message}</p>

                <form className="form-container" onSubmit={onSaveUserClicked}>
                    <header className="form-title">Create your free DeckDatabaseOnline Account</header>
                    <div className="form-body">
                        <div className="form-body-title">Enter Your Account details</div>

                        <div className="form-email-container">
                            <input
                                className={`form-email-input ${validEmailClass}`}
                                placeholder="Enter Email"
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="off"
                                value={email}
                                onChange={onEmailChanged}
                            />
                        </div>

                        <div className="form-username-container">
                            <input
                                className={`form-username-input ${validUserClass}`}
                                placeholder="Enter Username"
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="off"
                                value={username}
                                onChange={onUsernameChanged}
                            />
                        </div>

                        <div className="form-password-container">
                            <input 
                                className={`form-password-input ${validPwdClass}`}
                                placeholder="Enter Password"
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onPasswordChanged}
                            />
                        </div>
                        <div className="form-save-container">
                            <button
                                    className={`form-save-button ${canSave ? 'canSave' : ''}`}
                                    disabled={!canSave}
                            >
                                <h1 className="save-button-text">Create Account</h1>
                            </button>
                        </div>
                    </div>
                </form>
            </body>
            <Footer/>
        </>
    )

    return content
}

export default AccountCreationForm