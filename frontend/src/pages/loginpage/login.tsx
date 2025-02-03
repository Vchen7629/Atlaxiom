import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../app/auth/authSlice.ts"
import { useLoginMutation } from "../../app/auth/authApiSlice.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { toast, Toaster } from "sonner"
import { toastErrorMessage } from "@/components/cardcollectioncomponents/types/buttontypes.ts"

interface UserAuth {
    accessToken: string;
    userId: string;
}

const LoginPage = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState<string>('')
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleSignUpClick() {
        navigate('/signup')
    }

    async function handleSubmit() {
        if (!username ||username.trim() === '') {
            setUsernameError(true);
        }

        if (!password || password.trim() === '') {
            setPasswordError(true);
        }

        const { accessToken, userId }: UserAuth = await login({ username, password }).unwrap();
        dispatch(setCredentials({ accessToken, userId, username }));
        setUsername('');
        setPassword('');
        navigate("/profile");
        return Promise.resolve();
    }
    
    function handleUserInput(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement
        setUsername(target.value)
        setUsernameError(false)
    }

    function handlePwdInput(e: React.FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement
        setPassword(target.value)
        setPasswordError(false)
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const promise = handleSubmit();
        toast.promise(promise, {
            loading: "loading...",
            success: () => "sucessfully logged in",
            error: (error: toastErrorMessage) => {
                if (error?.status === 401) {
                    return error?.data?.message || "Invalid Username or Password";
                } else if (error?.status === 400) {
                    return error?.data?.message || "Missing Username or Password";
                } else {
                    return "An unexpected error occurred";
                }
            },
        })
    }

    const content = (
        <main className="min-h-[100vh] flex flex-col justify-between">
            <Toaster richColors  expand visibleToasts={4} position="bottom-center"/>
            <Header/>
            <div className="flex relative h-[95vh] w-full bg-[hsl(var(--background1))] justify-center overflow-hidden ">
                <div className="flex items-center justify-center">
                        <form className="relative py-8 h-fit lg:max-h-[65vh] bg-[hsl(var(--header))] w-[100vw] lg:w-[50vw] xl:w-[30vw] flex flex-col items-center rounded-3xl" onSubmit={handleSubmit} noValidate>
                            <div className="flex justify-center mt-[5vh] lg:mt-[1vh]">
                                <FontAwesomeIcon className="text-[hsl(var(--background3))] w-[10vh] h-[10vh] xl:h-[6vh] xl:w-[3vw] p-4 shadow-custom rounded-[24px] bg-[hsl(var(--header))]" icon={faUser}/>
                            </div>
                            <header className="mt-[1vh] text-2xl sm:text-5xl mb-3 xl:text-4xl text-[hsl(var(--background3))] font-black">Welcome Back</header>
                            <div className="flex text-lg mb-[1vh] text-gray-500">
                                <div className="mr-2">Don&apos;t have an account yet? </div>
                                <button type="button" className="text-[hsl(var(--background3))] bg-transparent font-bold" onClick={handleSignUpClick}>
                                    Sign Up
                                </button>
                            </div>
                            <div className="relative flex flex-col items-center w-[95%]">
                                <div className="w-full h-20 flex flex-col items-center ">
                                    <input
                                        className={`w-[93%] h-[50px] bg-transparent text-[hsl(var(--text))] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:shadow-custom focus:ring-gray ${usernameError ? 'border-2 border-red-500' : 'border-2 border-gray-400'}`}
                                        placeholder="Username"
                                        id="username"
                                        ref={userRef}
                                        value={username ?? ''}
                                        onChange={handleUserInput}
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-[2vh] w-full h-20 flex flex-col items-center">
                                    <input
                                        className={`w-[93%] h-[50px] bg-transparent text-[hsl(var(--text))] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:shadow-custom focus:ring-gray ${passwordError ? 'border-2 border-red-500' : 'border-2 border-gray-400'}`}
                                        placeholder="password"
                                        id="password"
                                        value={password ?? ''}
                                        onChange={handlePwdInput}
                                        type="password"
                                        required
                                    />
                                </div>
                                <div className="w-full h-32 flex flex-col items-center ">
                                    <button className="bg-[hsl(var(--background3))] w-[92%] h-12 rounded-2xl" onClick={handleClick}>
                                        <h1 className="text-[25px] text-white">Login</h1>
                                    </button>
                                </div>
                            </div>    
                        </form>          
                </div>
            </div>
            <Footer/>
        </main>
    )

    return content
}

export default LoginPage