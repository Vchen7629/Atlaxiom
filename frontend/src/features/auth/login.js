import Footer from "../../components/footer/Footer"
import Header from "../../components/header/header"
import "./styling/Login.css"
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"


const LoginPage = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()



    useEffect(() => { //code so that username field is focused on page init
        userRef.current.focus()
    }, []) 

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()

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
            } else if (err.status === 400) {
                setErrMsg("Missing username or password")
            } else if (err.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <>
        <Header/>
            <main className="login-page-background-container">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="login-page-form-container" onSubmit={handleSubmit}>
                    <header className="Login-form-title">Login with your Account Credentials</header>
                    <div className="Login-form-body">
                        <div className="Login-emailoruser-container">
                            <input
                                className="form-emailoruser-input"
                                placeholder="Enter Email or Username"
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                type="text"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="Login-password-container">
                            <input
                                className="form-password-input"
                                placeholder="Enter Password"
                                id="password"
                                value={password}
                                onChange={handlePwdInput}
                                type="password"
                                required
                            />
                        </div>

                        <div className="Login-submit-container">
                            <button className="Login-submit-button">
                                <h1 className="Login-submit-button-text">Login</h1>
                            </button>
                        </div>

                        <label htmlFor="persist" className="login-submit-container">
                            <input 
                                type="checkbox"
                                className="login-submit-button"
                                id="persist"
                                onChange={handleToggle}
                                check={persist}
                            />
                            <h1 className="Login-submit-button-text">Trust this device</h1>
                        </label>
                    </div>
                </form>
            </main>
        <Footer/>
        </>
    )

    return content
}

export default LoginPage