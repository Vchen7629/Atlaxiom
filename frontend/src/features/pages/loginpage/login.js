import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/header"
import "./styling/Login.css"
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../auth/authSlice"
import { useLoginMutation } from "../../auth/authApiSlice"
<<<<<<< HEAD
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons"
>>>>>>> 14ef751 (testing)


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
        setUsername(e.target.value)
        setUsernameError('')
    }

    const handlePwdInput = (e) => {
        setPassword(e.target.value)
        setPasswordError('')
    }

    const content = (
        <>
        <Header/>
            <main className="login-page-background-container">
                <p ref={errRef} aria-live="assertive">{errMsg}</p>
<<<<<<< HEAD

                <form className="login-page-form-container" onSubmit={handleSubmit} noValidate>
                    <header className="Login-form-title">Login with your Account Credentials</header>
                    <div className="Login-form-body">
                        <div className="Login-username-container">
                            <input
                                className={`login-username-input ${usernameError ? 'error-border' : ''}`}
                                placeholder=" "
=======
                <form className="absolute pt-16 bg-blackone w-[25%] h-[55%] flex flex-col items-center rounded-3xl" onSubmit={handleSubmit} noValidate>
                    <div>
                        <FontAwesomeIcon className="text-gray-600 h-20 w-20 p-4 shadow-custom rounded-[24px] bg-blackone" icon={faUser}/>
                    </div>
                    <header className="mt-6 mb-3 text-4xl text-white font-black">Welcome Back</header>
                    <div className="text-xl mb-12 text-gray-500">Don't have an account yet? Sign Up</div>
                    <div className="relative flex flex-col items-center w-[85%]">
                        <div className="mb-1 w-full h-20 flex flex-col items-center">
                            <input
                                className={`w-[93%] h-[50px] bg-blackone shadow-custom text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:shadow-custom focus:ring-gray ${usernameError ? 'border-2 border-red-500' : 'border-none'}`}
                                placeholder="Username"
>>>>>>> 14ef751 (testing)
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                type="text"
                                autoComplete="off"
                                required
                            />
<<<<<<< HEAD
                            <label className="login-username-label" htmlFor="username">
                                Enter Username
                            </label>
                        </div>
                        {usernameError && (
                                <div className="error-message">
                                    {usernameError}
                                </div>
                            )}

                        <div className="Login-password-container">
                            <input
                                className={`login-password-input ${passwordError ? 'error-border' : ''}`}
                                placeholder=" "
=======
                            {usernameError && (
                                <div className="w-1/2 h-8 mt-1 text-xl text-red-600">{usernameError}</div>
                            )}
                        </div>
                        <div className="mb-8 w-full h-20 flex flex-col items-center">
                            <input
                                className={`w-[93%] h-[50px] bg-blackone shadow-custom text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${passwordError ? 'border-2 border-red-500' : 'border-none'}`}
                                placeholder="password"
>>>>>>> 14ef751 (testing)
                                id="password"
                                value={password}
                                onChange={handlePwdInput}
                                type="password"
                                required
                            />
<<<<<<< HEAD
                            <label className="login-password-label" htmlFor="password">
                                Enter Password
                            </label>
                        </div>
                        {passwordError && (
                                <div className="error-message">
                                    {passwordError}
                                </div>
                            )}
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
=======
                            {passwordError && (
                                <div className="w-1/2 h-8 mt-1 text-xl text-red-600">{passwordError}</div>
                            )}
                        </div>
                        <div className="mb-9 w-full h-28 flex flex-col items-center">
                            <button className="bg-blue-700 w-[92%] h-12 rounded-2xl">
                                <h1 className="text-[25px] text-white">Login</h1>
                            </button>
                            {errMsg && (
                                <div className="bg-transparent p-[10px] mt-[30px] border-2 border-red-600 text-red-600 text-[18px]">
                                    {errMsg}
                                </div>
                            )}  
                        </div>
                        <div className="flex items-center justify-evenly w-full">
                            <div className="w-[9vw] h-[2px] bg-gray-500">hi</div>
                            <FontAwesomeIcon className= "text-gold w-7 h-7"icon={faGear}/>
                            <div className="w-[9vw] h-[2px] bg-gray-500">hi</div>
                        </div>
>>>>>>> 14ef751 (testing)
                    </div>    
                </form>          
            </main>
        <Footer/>
        </>
    )

    return content
}

export default LoginPage