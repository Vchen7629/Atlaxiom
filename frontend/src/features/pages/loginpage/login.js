import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/header"
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../auth/authSlice"
import { useLoginMutation } from "../../auth/authApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons"


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
            if (errRef.current) {
                errRef.current.focus();
            }
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
            <main className="flex items-center justify-center relative xs:h-[86vh] xl:h-[82vh] bg-metal bg-metal-size bg-metal-position">
                <form className="relative pt-16 bg-blackone xs:w-[70%] xl:w-[40%] 2xl:w-[30%] flex flex-col items-center rounded-3xl" onSubmit={handleSubmit} noValidate>
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
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                type="text"
                                autoComplete="off"
                                required
                            />
                            {usernameError && (
                                <div className="w-1/2 ml-14 h-8 mt-1 text-xl text-red-600">{usernameError}</div>
                            )}
                        </div>
                        <div className="mb-8 w-full h-20 flex flex-col items-center">
                            <input
                                className={`w-[93%] h-[50px] bg-blackone shadow-custom text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${passwordError ? 'border-2 border-red-500' : 'border-none'}`}
                                placeholder="password"
                                id="password"
                                value={password}
                                onChange={handlePwdInput}
                                type="password"
                                required
                            />
                            {passwordError && (
                                <div className="h-8 mt-1 text-xl text-red-600">{passwordError}</div>
                            )}
                        </div>
                        <div className="w-full h-36 flex flex-col items-center">
                            <button className="bg-blue-700 w-[92%] h-12 rounded-2xl">
                                <h1 className="text-[25px] text-white">Login</h1>
                            </button>
                        </div>
                        {errMsg && (
                            <p ref={errRef} aria-live="assertive" className="absolute bg-transparent p-[10px] bottom-[19%] mb-[30px] border-2 border-red-600 text-red-600 text-[18px]">
                                {errMsg}
                            </p>
                        )} 
                        <div className="flex items-center justify-evenly w-full pb-16">
                            <div className="xs:w-[21vw] xl:w-[11vw] h-[2px] bg-gray-500"></div>
                            <FontAwesomeIcon className= "text-gray-500 w-7 h-7"icon={faGear}/>
                            <div className="xs:w-[21vw] xl:w-[11vw] h-[2px] bg-gray-500"></div>
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