import Footer from "../../../components/footer/Footer.tsx"
import Header from "../../../components/header/header.tsx"
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../auth/authSlice.ts"
import { useLoginMutation } from "../../auth/authApiSlice.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons"
import { LoginError } from "./logintypes.ts"

const LoginPage = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState<string | null>('')
    const [usernameError, setUsernameError] = useState<string | null>('');
    const [password, setPassword] = useState<string | null>('')
    const [passwordError, setPasswordError] = useState<string | null>('');
    const [errMsg, setErrMsg] = useState<string | null>('')
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignUpClick = () => {
        navigate('/signup')
    }

    useEffect(() => { //code so that username field is focused on page init
        if (userRef.current) {
            userRef.current.focus()
        }
    }, []) 

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;

        if (!username ||username.trim() === '') {
            setUsernameError('Please enter a username');
            hasError = true;
        }

        if (!password || password.trim() === '') {
            setPasswordError('Please enter a password');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const { accessToken, userId } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken, userId, username }));
            setUsername('');
            setPassword('');
            navigate("/profile");
        } catch (err: unknown) {
            const error = err as LoginError;
            if (!error.status) {
                setErrMsg("No Server Response")
            } else if (error.status === 401) {
                setErrMsg("Invalid Username or Password")
            } else {
                setErrMsg(error.data?.message || "an error has occured");
            }
        }
    }
    
    const handleUserInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setUsername(target.value)
        setUsernameError('')
    }

    const handlePwdInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setPassword(target.value)
        setPasswordError('')
    }

    const content = (
        <>
        <main className="min-h-[100vh] flex flex-col  bg-metal bg-metal-size bg-metal-position justify-between">
            <Header/>
            <div className="flex relative h-[95vh] rounded-lg w-full bg-radial-gray justify-center overflow-hidden ">
                <div className="flex items-center justify-center">
                        <form className="relative py-16 max-h-[65vh] bg-blackone w-[25vw] flex flex-col items-center rounded-3xl" onSubmit={handleSubmit} noValidate>
                            <div className="flex justify-center">
                                <FontAwesomeIcon className="text-blue-400 h-[6vh] w-[3vw] p-4 shadow-custom rounded-[24px] bg-blackone" icon={faUser}/>
                            </div>
                            <header className="mt-[1vh] mb-3 text-4xl text-white font-black">Welcome Back</header>
                            <div className="flex text-lg mb-[1vh] text-gray-500">
                                <div className="mr-2">Don't have an account yet? </div>
                                <button type="button" className="text-goldenrod font-light" onClick={handleSignUpClick}>
                                    Sign Up
                                </button>
                            </div>
                            <div className="relative flex flex-col items-center w-[85%]">
                                <div className="w-full h-20 flex flex-col items-center ">
                                    <input
                                        className={`w-[93%] h-[50px] bg-blackone shadow-custom text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:shadow-custom focus:ring-gray ${usernameError ? 'border-2 border-red-500' : 'border-none'}`}
                                        placeholder="Username"
                                        id="username"
                                        ref={userRef}
                                        value={username ?? ''}
                                        onChange={handleUserInput}
                                        type="text"
                                        autoComplete="off"
                                        required
                                    />
                                    {usernameError && (
                                        <div className="w-full text-center h-8 text-lg text-red-600">{usernameError}</div>
                                    )}
                                </div>
                                <div className="mb-[2vh] w-full h-20 flex flex-col items-center">
                                    <input
                                        className={`w-[93%] h-[50px] bg-blackone shadow-custom text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${passwordError ? 'border-2 border-red-500' : 'border-none'}`}
                                        placeholder="password"
                                        id="password"
                                        value={password ?? ''}
                                        onChange={handlePwdInput}
                                        type="password"
                                        required
                                    />
                                    {passwordError && (
                                        <div className="w-full text-center h-8 mt-1 text-lg text-red-600">{passwordError}</div>
                                    )}
                                </div>
                                <div className="w-full h-32 flex flex-col items-center ">
                                    <button className="bg-blue-700 w-[92%] mb-[2vh] h-12 rounded-2xl">
                                        <h1 className="text-[25px] text-white">Login</h1>
                                    </button>
                                    {errMsg && (
                                        <p aria-live="assertive" className="w-[70%] text-center h-12 text-lg p-2 border-2 border-red-600 text-red-600">
                                            {errMsg}
                                        </p>
                                    )} 
                                </div>
                                <div className="flex items-center justify-between w-[95%] ">
                                    <div className="xs:w-[21vw] xl:w-[9vw] h-[2px] bg-gray-500"></div>
                                    <FontAwesomeIcon className= "text-gray-500 w-7 h-7"icon={faGear}/>
                                    <div className="xs:w-[21vw] xl:w-[9vw] h-[2px] bg-gray-500"></div>
                                </div>
                            </div>    
                        </form>          
                </div>
            </div>
            <Footer/>
        </main>
        </>
    )

    return content
}

export default LoginPage