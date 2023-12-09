import Footer from "../../components/footer/Footer"
import Header from "../../components/header/header"
import "./styling/Login.css"
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"


const LoginPage = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()



    useEffect(() => { //code so that username field is focused on page init
        userRef.current.focus()
    }, []) 

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;

        if (username.trim() === '') {
            setUsernameError('Please enter a username');
            hasError = true;
        }

        if (password.trim() === '') {
            setPasswordError('Please enter a password');
            hasError = true;
        }

        if (hasError) {
            // Don't proceed with the form submission if there are errors
            return;
        }

        try {
            const { accessToken, userId } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken, userId }));
            setUsername('');
            setPassword('');
            navigate("/profile");
        } catch (err) {
            console.error('Login Error:', err);
            if (!err.status) {
                setErrMsg("No Server Response")
            } else if (err.status === 401) {
                setErrMsg("Invalid Username or Password")
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }
    
     const handleUserInput = (e) => {
        setUsername(e.target.value);
        setUsernameError('');
    }

    const handlePwdInput = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    }

    const errClass = errMsg ? "errmsg" : "offscreen"

    const content = (
        <>
        <Header/>
            <main className="login-page-background-container">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="login-page-form-container" onSubmit={handleSubmit} noValidate>
                    <header className="Login-form-title">Login with your Account Credentials</header>
                    <div className="Login-form-body">
                        <div className="Login-emailoruser-container">
                            <input
                                className={`form-emailoruser-input ${usernameError ? 'error-border' : ''}`}
                                placeholder="Enter Email or Username"
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                type="text"
                                autoComplete="off"
                                required
                            />
                            {usernameError && (
                                <div className="error-message">
                                    {usernameError}
                                </div>
                            )}
                        </div>

                        <div className="Login-password-container">
                            <input
                                className={`form-password-input ${passwordError ? 'error-border' : ''}`}
                                placeholder="Enter Password"
                                id="password"
                                value={password}
                                onChange={handlePwdInput}
                                type="password"
                                required
                            />
                            {passwordError && (
                                <div className="error-message">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                        <div className="Login-submit-container">
                            <button className="Login-submit-button">
                                <h1 className="Login-submit-button-text">Login</h1>
                            </button>
                            {errMsg && (
                                <div>
                                    <div className="error-message-container">
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

export default LoginPage